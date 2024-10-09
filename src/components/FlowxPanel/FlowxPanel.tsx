import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Node,
  Edge,
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
  circle: TypeCircle,
  diamond: TypeDiamond,
};

export const FlowxPanel: React.FC<Props> = ({ options, data, fieldConfig, id }) => {
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
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
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

  const handleNodes = () => {
    const seriesNode = data.series.filter((series) => series.refId?.toLowerCase() === 'node')[0].fields;
    const rowCountOfNode = seriesNode[0].values.length;
    const nodes: Node[] = [];

    // Create needed objects for Nodes.
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

    // Add data and id to nodes.
    seriesNode.forEach((columnObj) => {
      columnObj.values.forEach((row, index) => {
        // @ts-ignore
        if (columnObj.name === 'id') {
          nodes[index][columnObj.name] = row || `nullIDHandle${index}`;
        } else {
          nodes[index].data[columnObj.name] = row;
        }

        if (columnObj.name === 'color_condition') {
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
        if (columnObj.name === 'type') {
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

    // Create needed objects for Edges.
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

    // Add data to edges.
    seriesEdge.forEach((columnObj) => {
      columnObj.values.forEach((row, index) => {
        // @ts-ignore
        edges[index][columnObj.name] = row || `null${columnObj.name}Handle${index}`;
      });
    });

    return edges;
  };

  //////////////// DATA TRANSFORMATION //////////////////
  ///////////////////////////////////////////////////////

  useEffect(() => {
    if (data && data.series && data.series.length !== 0) {
      setShouldLayout(true);
    }
  }, [data.series]);

  useEffect(() => {
    if (shouldLayout && data && data.state === LoadingState.Done && data.series.length !== 0) {
      setNodes([]);
      setEdges([]);

      let tempNodes = handleNodes();
      let tempEdges = handleEdges();

      const layoutedElements = getLayoutedElements(tempNodes, tempEdges, userLayoutDirection);

      setNodes(layoutedElements.nodes);
      setEdges(layoutedElements.edges);

      setShouldLayout(false);
    }
  }, [shouldLayout, data]);

  const onLayout = (direction: string) => {
    setUserLayoutDirection(direction);
    setShouldLayout(true);
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
          onNodesChange={onNodesChange}
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
            <Panel position="top-right">
              <button
                className="anil-flowx-nodeButton"
                onClick={() => {
                  onLayout('TB');
                }}
              >
                Top to Bottom
              </button>
              <button
                className="anil-flowx-nodeButton"
                onClick={() => {
                  onLayout('LR');
                }}
              >
                Left to Right
              </button>
            </Panel>
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
