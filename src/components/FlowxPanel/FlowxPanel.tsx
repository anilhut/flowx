import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MiniMap,
  Controls,
  Node,
  Edge,
  NodeChange,
  Position,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import { LoadingState, PanelProps } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';
import { PanelOptions } from 'types';
import { PanelDataErrorView } from '@grafana/runtime';
import '@xyflow/react/dist/style.css';
import './custom_nodes/style_nodes.css';

import TypeTitle from './custom_nodes/TypeTitle';
import TypeOne from './custom_nodes/TypeOne';
import TypeTwo from './custom_nodes/TypeTwo';
import TypeThree from './custom_nodes/TypeThree';
import TypeFour from './custom_nodes/TypeFour';
import TypeFive from './custom_nodes/TypeFive';
import TypeSix from './custom_nodes/TypeSix';
import TypeCircle from './custom_nodes/TypeCircle';
import TypeDiamond from './custom_nodes/TypeDiamond';

import NodePopup from './custom_nodes/NodePopup';

interface Props extends PanelProps<PanelOptions> {}

const nodeTypes = {
  title: TypeTitle,
  one: TypeOne,
  two: TypeTwo,
  three: TypeThree,
  four: TypeFour,
  five: TypeFive,
  six: TypeSix,
  circle: TypeCircle,
  diamond: TypeDiamond,
};

// --- Graph helpers ---

const buildChildrenMap = (nodes: Node[], edges: Edge[]): Map<string, string[]> => {
  const map = new Map<string, string[]>();
  nodes.forEach((n) => map.set(n.id, []));
  edges.forEach((e) => {
    const children = map.get(e.source);
    if (children && !children.includes(e.target)) {
      children.push(e.target);
    }
  });
  return map;
};

const getInDegree = (nodes: Node[], edges: Edge[]): Map<string, number> => {
  const map = new Map<string, number>();
  nodes.forEach((n) => map.set(n.id, 0));
  edges.forEach((e) => map.set(e.target, (map.get(e.target) ?? 0) + 1));
  return map;
};

const getAllDescendants = (nodeId: string, childrenMap: Map<string, string[]>): Set<string> => {
  const result = new Set<string>();
  // Include nodeId in visited from the start to guard against cycles back to the root
  const visited = new Set<string>([nodeId]);
  const queue = [...(childrenMap.get(nodeId) ?? [])];
  for (const child of queue) {
    result.add(child);
    visited.add(child);
  }
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const child of childrenMap.get(current) ?? []) {
      if (!visited.has(child)) {
        visited.add(child);
        result.add(child);
        queue.push(child);
      }
    }
  }
  return result;
};

// BFS from roots: a node is visible only if it's reachable without passing through a collapsed node.
// This correctly handles cycles and multiple-parent scenarios.
const computeVisibleIds = (
  allNodes: Node[],
  allEdges: Edge[],
  collapsedNodes: Set<string>,
  childrenMap: Map<string, string[]>
): Set<string> => {
  const inDeg = getInDegree(allNodes, allEdges);
  const roots = allNodes.filter((n) => (inDeg.get(n.id) ?? 0) === 0).map((n) => n.id);
  const visible = new Set<string>();
  const queue = [...roots];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visible.has(current)) {
      continue;
    }
    visible.add(current);
    if (!collapsedNodes.has(current)) {
      for (const child of childrenMap.get(current) ?? []) {
        if (!visible.has(child)) {
          queue.push(child);
        }
      }
    }
  }
  return visible;
};

const initCollapsedNodes = (
  nodes: Node[],
  childrenMap: Map<string, string[]>,
  inDegree: Map<string, number>,
  initialDepth: number
): Set<string> => {
  if (initialDepth === 0) {
    return new Set();
  }

  const nodeDepth = new Map<string, number>();
  const roots = nodes.filter((n) => (inDegree.get(n.id) ?? 0) === 0).map((n) => n.id);
  const queue: Array<{ id: string; depth: number }> = roots.map((id) => ({ id, depth: 1 }));

  while (queue.length > 0) {
    const { id, depth } = queue.shift()!;
    if (nodeDepth.has(id)) {
      continue;
    }
    nodeDepth.set(id, depth);
    for (const child of childrenMap.get(id) ?? []) {
      queue.push({ id: child, depth: depth + 1 });
    }
  }

  const collapsed = new Set<string>();
  for (const [nodeId, depth] of nodeDepth) {
    if (depth === initialDepth && (childrenMap.get(nodeId) ?? []).length > 0) {
      collapsed.add(nodeId);
    }
  }
  return collapsed;
};

// --- Layout ---

const FlowxPanelInner: React.FC<Props> = ({ options, data, fieldConfig, id }) => {
  const { fitView } = useReactFlow();
  const pendingFitView = useRef(false);
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: node.width, height: node.height });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes: Node[] = nodes.map((node) => {
      const nodeWidth = node.width ?? 10;
      const nodeHeight = node.height ?? 10;
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode: Node = {
        ...node,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  if (
    data.series.filter((series) => series.refId?.toLowerCase() === 'node').length === 0 ||
    data.series.filter((series) => series.refId?.toLowerCase() === 'edge').length === 0
  ) {
    return (
      <PanelDataErrorView
        fieldConfig={fieldConfig}
        panelId={id}
        data={data}
        needsStringField
        message="Add two queries named 'Node' and 'Edge'."
      />
    );
  }

  const theme = useTheme2();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Refs for full (unfiltered) data
  const allNodesRef = useRef<Node[]>([]);
  const allEdgesRef = useRef<Edge[]>([]);
  const childrenMapRef = useRef<Map<string, string[]>>(new Map());
  const isInitializedRef = useRef(false);
  const userPositionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  const isUserToggleRef = useRef(false);

  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());

  const [backgroundColor, setBackgroundColor] = useState(theme.visualization.getColorByName(options.backgroundColor));
  const [backgroundType, setBackgroundType] = useState(options.backgroundType);
  const [backgroundSize, setBackgroundSize] = useState(options.backgroundSize);
  const [backgroundGap, setBackgroundGap] = useState(options.backgroundGap);
  const [backgroundTypeColor, setBackgroundTypeColor] = useState(
    theme.visualization.getColorByName(options.backgroundTypeColor)
  );

  const [layoutDirection, setLayoutDirection] = useState(options.layoutDirection);
  const [showLayoutOptions, setShowLayoutOptions] = useState(options.showLayoutOptions);
  const [showMiniMap, setShowMiniMap] = useState(options.showMiniMap);
  const [showControls, setShowControls] = useState(options.showControls);
  const [hideAttribution, setHideAttribution] = useState(options.hideAttribution);
  const [maxZoom, setMaxZoom] = useState(options.maxZoom);
  const [minZoom, setMinZoom] = useState(options.minZoom);

  const [isDraggable, setIsDraggable] = useState(options.isDraggable);
  const [showPopup, setShowPopup] = useState(options.showPopup);

  const [egdeAnimation, setEdgeAnimation] = useState(options.edgeAnimation);
  const [egdeType, setEdgeType] = useState(options.edgeType);
  const [edgeStroke, setEdgeStroke] = useState(options.edgeStroke);
  const [edgeColor, setEdgeColor] = useState(theme.visualization.getColorByName(options.edgeColor));

  const [userLayoutDirection, setUserLayoutDirection] = useState(layoutDirection);
  const [isNodeClicked, setIsNodeClicked] = useState(false);
  const [clickedNode, setClickedNode] = useState<Node | null>(null);

  const [shouldLayout, setShouldLayout] = useState(false);

  useEffect(() => {
    setBackgroundColor(theme.visualization.getColorByName(options.backgroundColor));
    setBackgroundType(options.backgroundType);
    setBackgroundSize(options.backgroundSize);
    setBackgroundGap(options.backgroundGap);
    setBackgroundTypeColor(theme.visualization.getColorByName(options.backgroundTypeColor));

    setLayoutDirection(options.layoutDirection);
    setShowLayoutOptions(options.showLayoutOptions);
    setShowMiniMap(options.showMiniMap);
    setShowControls(options.showControls);
    setHideAttribution(options.hideAttribution);
    setMaxZoom(options.maxZoom);
    setMinZoom(options.minZoom);

    setIsDraggable(options.isDraggable);
    setShowPopup(options.showPopup);
    setUserLayoutDirection(options.layoutDirection);
    setEdgeAnimation(options.edgeAnimation);
    setEdgeType(options.edgeType);
    setEdgeStroke(options.edgeStroke);
    setEdgeColor(theme.visualization.getColorByName(options.edgeColor));

    setShouldLayout(true);
  }, [options, theme]);

  ///////////////////////////////////////////////////////
  //////////////// DATA TRANSFORMATION //////////////////

  const fm = options.fieldMapping || {};
  const col = {
    nodeId: fm.nodeId?.trim() || 'id',
    nodeType: fm.nodeType?.trim() || 'type',
    nodeTitle: fm.nodeTitle?.trim() || 'title',
    nodeColorCondition: fm.nodeColorCondition?.trim() || 'color_condition',
    nodeUrl: fm.nodeUrl?.trim() || 'url',
    nodeUrlLabel: fm.nodeUrlLabel?.trim() || 'url_label',
    nodeValue1Header: fm.nodeValue1Header?.trim() || 'value1_header',
    nodeValue1Data: fm.nodeValue1Data?.trim() || 'value1_data',
    nodeValue1Url: fm.nodeValue1Url?.trim() || 'value1_url',
    nodeValue2Header: fm.nodeValue2Header?.trim() || 'value2_header',
    nodeValue2Data: fm.nodeValue2Data?.trim() || 'value2_data',
    nodeValue2Url: fm.nodeValue2Url?.trim() || 'value2_url',
    nodeValue3Header: fm.nodeValue3Header?.trim() || 'value3_header',
    nodeValue3Data: fm.nodeValue3Data?.trim() || 'value3_data',
    nodeValue3Url: fm.nodeValue3Url?.trim() || 'value3_url',
    nodeValue4Header: fm.nodeValue4Header?.trim() || 'value4_header',
    nodeValue4Data: fm.nodeValue4Data?.trim() || 'value4_data',
    nodeValue4Url: fm.nodeValue4Url?.trim() || 'value4_url',
    nodeValue5Header: fm.nodeValue5Header?.trim() || 'value5_header',
    nodeValue5Data: fm.nodeValue5Data?.trim() || 'value5_data',
    nodeValue5Url: fm.nodeValue5Url?.trim() || 'value5_url',
    nodeValue6Header: fm.nodeValue6Header?.trim() || 'value6_header',
    nodeValue6Data: fm.nodeValue6Data?.trim() || 'value6_data',
    nodeValue6Url: fm.nodeValue6Url?.trim() || 'value6_url',
    edgeId: fm.edgeId?.trim() || 'id',
    edgeSource: fm.edgeSource?.trim() || 'source',
    edgeTarget: fm.edgeTarget?.trim() || 'target',
  };

  const nodeColToInternal: Record<string, string> = {
    [col.nodeId]: 'id',
    [col.nodeType]: 'type',
    [col.nodeTitle]: 'title',
    [col.nodeColorCondition]: 'color_condition',
    [col.nodeUrl]: 'url',
    [col.nodeUrlLabel]: 'url_label',
    [col.nodeValue1Header]: 'value1_header',
    [col.nodeValue1Data]: 'value1_data',
    [col.nodeValue1Url]: 'value1_url',
    [col.nodeValue2Header]: 'value2_header',
    [col.nodeValue2Data]: 'value2_data',
    [col.nodeValue2Url]: 'value2_url',
    [col.nodeValue3Header]: 'value3_header',
    [col.nodeValue3Data]: 'value3_data',
    [col.nodeValue3Url]: 'value3_url',
    [col.nodeValue4Header]: 'value4_header',
    [col.nodeValue4Data]: 'value4_data',
    [col.nodeValue4Url]: 'value4_url',
    [col.nodeValue5Header]: 'value5_header',
    [col.nodeValue5Data]: 'value5_data',
    [col.nodeValue5Url]: 'value5_url',
    [col.nodeValue6Header]: 'value6_header',
    [col.nodeValue6Data]: 'value6_data',
    [col.nodeValue6Url]: 'value6_url',
  };

  const edgeColToInternal: Record<string, string> = {
    [col.edgeId]: 'id',
    [col.edgeSource]: 'source',
    [col.edgeTarget]: 'target',
  };

  const handleNodes = () => {
    const seriesNode = data.series.filter((series) => series.refId?.toLowerCase() === 'node')[0].fields;
    const rowCountOfNode = seriesNode[0].values.length;
    const nodes: Node[] = [];

    for (let i = 0; i < rowCountOfNode; i++) {
      let n = {
        id: `nullIDHandle${i}`,
        data: {
          bgColorCondition: 'anil-flowx-nodeBgDefault',
        },
        position: { x: 0, y: 0 },
        type: 'type_four',
        width: 240,
        height: 242,
      };
      nodes.push(n);
    }

    seriesNode.forEach((columnObj) => {
      const internalName = nodeColToInternal[columnObj.name] ?? columnObj.name;

      columnObj.values.forEach((row, index) => {
        if (internalName === 'id') {
          // @ts-ignore
          nodes[index]['id'] = row || `nullIDHandle${index}`;
        } else {
          nodes[index].data[internalName] = row;
        }

        if (internalName === 'color_condition') {
          switch (row) {
            case 'red':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgRed';
              break;
            case 'red_blink':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgRedBlink';
              break;
            case 'orange':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgOrange';
              break;
            case 'orange_blink':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgOrangeBlink';
              break;
            case 'yellow':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgYellow';
              break;
            case 'yellow_blink':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgYellowBlink';
              break;
            case 'green':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgGreen';
              break;
            case 'green_blink':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgGreenBlink';
              break;
            case 'blue':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgBlue';
              break;
            case 'blue_blink':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgBlueBlink';
              break;
            case 'gray':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgGray';
              break;
            case 'gray_blink':
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgGrayBlink';
              break;
            default:
              nodes[index].data.bgColorCondition = 'anil-flowx-nodeBgDefault';
          }
        }
        if (internalName === 'type') {
          switch (row) {
            case 'title':
              nodes[index].type = 'title';
              nodes[index].width = 240;
              nodes[index].height = 50;
              break;
            case 'one':
              nodes[index].type = 'one';
              nodes[index].width = 240;
              nodes[index].height = 98;
              break;
            case 'two':
              nodes[index].type = 'two';
              nodes[index].width = 240;
              nodes[index].height = 146;
              break;
            case 'three':
              nodes[index].type = 'three';
              nodes[index].width = 240;
              nodes[index].height = 194;
              break;
            case 'four':
              nodes[index].type = 'four';
              nodes[index].width = 240;
              nodes[index].height = 242;
              break;
            case 'five':
              nodes[index].type = 'five';
              nodes[index].width = 240;
              nodes[index].height = 290;
              break;
            case 'six':
              nodes[index].type = 'six';
              nodes[index].width = 240;
              nodes[index].height = 338;
              break;
            case 'circle':
              nodes[index].type = 'circle';
              nodes[index].width = 100;
              nodes[index].height = 100;
              break;
            case 'diamond':
              nodes[index].type = 'diamond';
              nodes[index].width = 100;
              nodes[index].height = 100;
              break;
            default:
              nodes[index].type = 'four';
              nodes[index].width = 240;
              nodes[index].height = 242;
          }
        }
      });
    });

    return nodes;
  };

  const handleEdges = () => {
    const seriesEdge = data.series.filter((series) => series.refId?.toLowerCase() === 'edge')[0].fields;
    const rowCountOfEdge = seriesEdge[0].values.length;
    const edges: Edge[] = [];

    for (let i = 0; i < rowCountOfEdge; i++) {
      let e = {
        id: `nullIDHandle${i}`,
        source: `nullSourceHandle${i}`,
        target: `nullTargetHandle${i}`,
        type: egdeType,
        animated: egdeAnimation,
        style: {
          strokeWidth: edgeStroke,
          stroke: edgeColor,
        },
      };
      edges.push(e);
    }

    seriesEdge.forEach((columnObj) => {
      const internalName = edgeColToInternal[columnObj.name] ?? columnObj.name;
      columnObj.values.forEach((row, index) => {
        // @ts-ignore
        edges[index][internalName] = row || `null${internalName}Handle${index}`;
      });
    });

    return edges;
  };

  //////////////// DATA TRANSFORMATION //////////////////
  ///////////////////////////////////////////////////////

  // Collapse toggle: expand shows only direct children, collapse hides subtree.
  // Intentionally does NOT trigger shouldLayout — the collapsedNodes effect handles re-layout.
  const onToggleCollapse = useCallback((nodeId: string) => {
    isUserToggleRef.current = true;
    setCollapsedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
        for (const child of childrenMapRef.current.get(nodeId) ?? []) {
          if ((childrenMapRef.current.get(child) ?? []).length > 0) {
            // Don't auto-collapse a child that is an ancestor of nodeId (cycle guard).
            // If child's descendants include nodeId, collapsing it would hide nodeId itself.
            const childDesc = getAllDescendants(child, childrenMapRef.current);
            if (!childDesc.has(nodeId)) {
              next.add(child);
            }
          }
        }
      } else {
        next.add(nodeId);
        for (const d of getAllDescendants(nodeId, childrenMapRef.current)) {
          next.delete(d);
        }
      }
      return next;
    });
  }, []);

  // Central layout function — reads from refs so it's always up to date.
  const applyLayout = useCallback(
    (collapsed: Set<string>, direction: string) => {
      if (allNodesRef.current.length === 0) {
        return;
      }

      // BFS reachability: node is visible only if reachable via open (non-collapsed) paths.
      const visibleIds = computeVisibleIds(
        allNodesRef.current,
        allEdgesRef.current,
        collapsed,
        childrenMapRef.current
      );

      const visibleNodes = allNodesRef.current
        .filter((n) => visibleIds.has(n.id))
        .map((n) => ({
          ...n,
          data: {
            ...n.data,
            hasChildren: (childrenMapRef.current.get(n.id) ?? []).length > 0,
            isCollapsed: collapsed.has(n.id),
            onToggleCollapse: () => onToggleCollapse(n.id),
          },
        }));

      // Only draw edges from non-collapsed visible sources to visible targets.
      // This means if A2 has two parents (A and AA) and A is collapsed,
      // only the edge AA→A2 is drawn.
      const visibleEdges = allEdgesRef.current.filter(
        (e) => visibleIds.has(e.source) && !collapsed.has(e.source) && visibleIds.has(e.target)
      );

      const layouted = getLayoutedElements(visibleNodes, visibleEdges, direction);
      const finalNodes = layouted.nodes.map((n) => {
        const saved = userPositionsRef.current.get(n.id);
        return saved ? { ...n, position: saved } : n;
      });
      setNodes(finalNodes);
      setEdges(layouted.edges);
    },
    [onToggleCollapse]
  );

  // Full data reprocess: runs when data series changes.
  useEffect(() => {
    if (data?.state !== LoadingState.Done || !data?.series?.length) {
      return;
    }
    setNodes([]);
    setEdges([]);

    const rawNodes = handleNodes();
    const rawEdges = handleEdges();
    allNodesRef.current = rawNodes;
    allEdgesRef.current = rawEdges;

    const cMap = buildChildrenMap(rawNodes, rawEdges);
    const iDeg = getInDegree(rawNodes, rawEdges);
    childrenMapRef.current = cMap;

    if (!isInitializedRef.current) {
      // First load: initialize collapse state from initialDepth
      userPositionsRef.current.clear();
      const initCollapsed = initCollapsedNodes(rawNodes, cMap, iDeg, options.initialDepth ?? 0);
      setCollapsedNodes(initCollapsed);
      isInitializedRef.current = true;
    } else {
      // Subsequent refreshes: preserve user's collapse state, clean up removed node IDs
      setCollapsedNodes((prev) => {
        const newNodeIds = new Set(rawNodes.map((n) => n.id));
        const next = new Set<string>();
        for (const id of prev) {
          if (newNodeIds.has(id)) {
            next.add(id);
          }
        }
        return next;
      });
    }
    // applyLayout will fire via the collapsedNodes effect below
  }, [data.series, data.state]);

  // Re-init collapse when initialDepth option changes (without reprocessing raw data).
  useEffect(() => {
    if (allNodesRef.current.length === 0) {
      return;
    }
    const iDeg = getInDegree(allNodesRef.current, allEdgesRef.current);
    const initCollapsed = initCollapsedNodes(
      allNodesRef.current,
      childrenMapRef.current,
      iDeg,
      options.initialDepth ?? 0
    );
    setCollapsedNodes(initCollapsed);
  }, [options.initialDepth]);

  // Relayout when options (direction, edge style, etc.) change — keeps user's collapse state.
  useEffect(() => {
    if (shouldLayout && allNodesRef.current.length > 0) {
      applyLayout(collapsedNodes, userLayoutDirection);
      setShouldLayout(false);
    }
  }, [shouldLayout]);

  // Relayout whenever collapsed state changes (from toggle or from init).
  useEffect(() => {
    if (allNodesRef.current.length > 0) {
      if (options.fitViewOnCollapse && isUserToggleRef.current) {
        pendingFitView.current = true;
      }
      isUserToggleRef.current = false;
      applyLayout(collapsedNodes, userLayoutDirection);
    }
  }, [collapsedNodes]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      changes.forEach((change) => {
        if (change.type === 'position' && change.dragging === false && change.position) {
          userPositionsRef.current.set(change.id, change.position);
        }
      });
    },
    [onNodesChange]
  );

  useEffect(() => {
    if (pendingFitView.current && nodes.length > 0) {
      pendingFitView.current = false;
      // Two rAF frames: first for React DOM flush, second for ReactFlow to measure nodes
      requestAnimationFrame(() => requestAnimationFrame(() => fitView({ duration: 300 })));
    }
  }, [nodes, fitView]);

  const onLayout = (direction: string) => {
    userPositionsRef.current.clear();
    pendingFitView.current = true;
    setUserLayoutDirection(direction);
    setShouldLayout(true);
  };

  const onResetLayout = () => {
    userPositionsRef.current.clear();
    pendingFitView.current = true;
    const iDeg = getInDegree(allNodesRef.current, allEdgesRef.current);
    const initCollapsed = initCollapsedNodes(
      allNodesRef.current,
      childrenMapRef.current,
      iDeg,
      options.initialDepth ?? 0
    );
    setCollapsedNodes(initCollapsed);
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    if (showPopup) {
      setIsNodeClicked(true);
      setClickedNode(node);
    }
  };

  const onPaneClick = (event: React.MouseEvent) => {
    if (showPopup) {
      setIsNodeClicked(false);
      setClickedNode(null);
    }
  };

  return (
    <>
      <div className="anil-flowx-panelContainer" style={{ backgroundColor: backgroundColor }}>
        {isNodeClicked && clickedNode && (
          <>
            {/* @ts-ignore */}
            <NodePopup clickedNode={clickedNode} onCancelClick={onPaneClick} backgroundColor={backgroundColor} />
          </>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          proOptions={{ hideAttribution: hideAttribution }}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodesConnectable={false}
          nodesDraggable={isDraggable}
          nodeTypes={nodeTypes}
          maxZoom={maxZoom}
          minZoom={minZoom}
          deleteKeyCode={null}
        >
          {showLayoutOptions && (
            <>
              <Panel position="top-right">
                <button className="anil-flowx-nodeButton" onClick={() => onLayout('TB')}>
                  Top to Bottom
                </button>
                <button className="anil-flowx-nodeButton" style={{ marginTop: 5 }} onClick={() => onLayout('LR')}>
                  Left to Right
                </button>
              </Panel>
              <Panel position="top-left">
                <button className="anil-flowx-nodeButton" onClick={onResetLayout}>
                  Reset to Default
                </button>
              </Panel>
            </>
          )}

          {showMiniMap && <MiniMap pannable zoomable />}

          {showControls && <Controls showInteractive={false} />}

          {backgroundType !== 'None' && (
            <Background
              color={backgroundTypeColor}
              // @ts-ignore
              variant={BackgroundVariant[backgroundType]}
              size={backgroundSize}
              gap={backgroundGap}
            />
          )}
        </ReactFlow>
      </div>
    </>
  );
};

export const FlowxPanel: React.FC<Props> = (props) => (
  <ReactFlowProvider>
    <FlowxPanelInner {...props} />
  </ReactFlowProvider>
);
