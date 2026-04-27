import { injectGlobal } from '@emotion/css';

injectGlobal`
/* ===== @xyflow/react styles ===== */
.react-flow {
  direction: ltr;
  --xy-edge-stroke-default: #b1b1b7;
  --xy-edge-stroke-width-default: 1;
  --xy-edge-stroke-selected-default: #555;
  --xy-connectionline-stroke-default: #b1b1b7;
  --xy-connectionline-stroke-width-default: 1;
  --xy-attribution-background-color-default: rgba(255, 255, 255, 0.5);
  --xy-minimap-background-color-default: #fff;
  --xy-minimap-mask-background-color-default: rgb(240, 240, 240, 0.6);
  --xy-minimap-mask-stroke-color-default: transparent;
  --xy-minimap-mask-stroke-width-default: 1;
  --xy-minimap-node-background-color-default: #e2e2e2;
  --xy-minimap-node-stroke-color-default: transparent;
  --xy-minimap-node-stroke-width-default: 2;
  --xy-background-color-default: transparent;
  --xy-background-pattern-dots-color-default: #91919a;
  --xy-background-pattern-lines-color-default: #eee;
  --xy-background-pattern-cross-color-default: #e2e2e2;
  background-color: var(--xy-background-color, var(--xy-background-color-default));
  --xy-node-color-default: inherit;
  --xy-node-border-default: 1px solid #1a192b;
  --xy-node-background-color-default: #fff;
  --xy-node-group-background-color-default: rgba(240, 240, 240, 0.25);
  --xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(0, 0, 0, 0.08);
  --xy-node-boxshadow-selected-default: 0 0 0 0.5px #1a192b;
  --xy-node-border-radius-default: 3px;
  --xy-handle-background-color-default: #1a192b;
  --xy-handle-border-color-default: #fff;
  --xy-selection-background-color-default: rgba(0, 89, 220, 0.08);
  --xy-selection-border-default: 1px dotted rgba(0, 89, 220, 0.8);
  --xy-controls-button-background-color-default: #fefefe;
  --xy-controls-button-background-color-hover-default: #f4f4f4;
  --xy-controls-button-color-default: inherit;
  --xy-controls-button-color-hover-default: inherit;
  --xy-controls-button-border-color-default: #eee;
  --xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, 0.08);
  --xy-edge-label-background-color-default: #ffffff;
  --xy-edge-label-color-default: inherit;
  --xy-resize-background-color-default: #3367d9;
}
.react-flow.dark {
  --xy-edge-stroke-default: #3e3e3e;
  --xy-edge-stroke-width-default: 1;
  --xy-edge-stroke-selected-default: #727272;
  --xy-connectionline-stroke-default: #b1b1b7;
  --xy-connectionline-stroke-width-default: 1;
  --xy-attribution-background-color-default: rgba(150, 150, 150, 0.25);
  --xy-minimap-background-color-default: #141414;
  --xy-minimap-mask-background-color-default: rgb(60, 60, 60, 0.6);
  --xy-minimap-mask-stroke-color-default: transparent;
  --xy-minimap-mask-stroke-width-default: 1;
  --xy-minimap-node-background-color-default: #2b2b2b;
  --xy-minimap-node-stroke-color-default: transparent;
  --xy-minimap-node-stroke-width-default: 2;
  --xy-background-color-default: #141414;
  --xy-background-pattern-dots-color-default: #777;
  --xy-background-pattern-lines-color-default: #777;
  --xy-background-pattern-cross-color-default: #777;
  --xy-node-color-default: #f8f8f8;
  --xy-node-border-default: 1px solid #3c3c3c;
  --xy-node-background-color-default: #1e1e1e;
  --xy-node-group-background-color-default: rgba(240, 240, 240, 0.25);
  --xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(255, 255, 255, 0.08);
  --xy-node-boxshadow-selected-default: 0 0 0 0.5px #999;
  --xy-handle-background-color-default: #bebebe;
  --xy-handle-border-color-default: #1e1e1e;
  --xy-selection-background-color-default: rgba(200, 200, 220, 0.08);
  --xy-selection-border-default: 1px dotted rgba(200, 200, 220, 0.8);
  --xy-controls-button-background-color-default: #2b2b2b;
  --xy-controls-button-background-color-hover-default: #3e3e3e;
  --xy-controls-button-color-default: #f8f8f8;
  --xy-controls-button-color-hover-default: #fff;
  --xy-controls-button-border-color-default: #5b5b5b;
  --xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, 0.08);
  --xy-edge-label-background-color-default: #141414;
  --xy-edge-label-color-default: #f8f8f8;
}
.react-flow__background {
  background-color: var(--xy-background-color, var(--xy-background-color-props, var(--xy-background-color-default)));
  pointer-events: none;
  z-index: -1;
}
.react-flow__container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.react-flow__pane { z-index: 1; }
.react-flow__pane.selection { cursor: pointer; }
.react-flow__pane.draggable { cursor: grab; }
.react-flow__pane.draggable.dragging { cursor: grabbing; }
.react-flow__viewport { transform-origin: 0 0; z-index: 2; pointer-events: none; }
.react-flow__renderer { z-index: 4; }
.react-flow__selection { z-index: 6; }
.react-flow__nodesselection-rect:focus,
.react-flow__nodesselection-rect:focus-visible { outline: none; }
.react-flow__edge-path {
  stroke: var(--xy-edge-stroke, var(--xy-edge-stroke-default));
  stroke-width: var(--xy-edge-stroke-width, var(--xy-edge-stroke-width-default));
  fill: none;
}
.react-flow__connection-path {
  stroke: var(--xy-connectionline-stroke, var(--xy-connectionline-stroke-default));
  stroke-width: var(--xy-connectionline-stroke-width, var(--xy-connectionline-stroke-width-default));
  fill: none;
}
.react-flow__edges { position: absolute; }
.react-flow__edges svg { overflow: visible; position: absolute; pointer-events: none; }
.react-flow__edge { pointer-events: visibleStroke; }
.react-flow__edge.selectable { cursor: pointer; }
.react-flow__edge.animated path { stroke-dasharray: 5; animation: dashdraw 0.5s linear infinite; }
.react-flow__edge.animated path.react-flow__edge-interaction { stroke-dasharray: none; animation: none; }
.react-flow__edge.inactive { pointer-events: none; }
.react-flow__edge.selected,
.react-flow__edge:focus,
.react-flow__edge:focus-visible { outline: none; }
.react-flow__edge.selected .react-flow__edge-path,
.react-flow__edge.selectable:focus .react-flow__edge-path,
.react-flow__edge.selectable:focus-visible .react-flow__edge-path {
  stroke: var(--xy-edge-stroke-selected, var(--xy-edge-stroke-selected-default));
}
.react-flow__edge-textwrapper { pointer-events: all; }
.react-flow__edge .react-flow__edge-text { pointer-events: none; user-select: none; }
.react-flow__connection { pointer-events: none; }
.react-flow__connection .animated { stroke-dasharray: 5; animation: dashdraw 0.5s linear infinite; }
svg.react-flow__connectionline { z-index: 1001; overflow: visible; position: absolute; }
.react-flow__nodes { pointer-events: none; transform-origin: 0 0; }
.react-flow__node {
  position: absolute;
  user-select: none;
  pointer-events: all;
  transform-origin: 0 0;
  box-sizing: border-box;
  cursor: default;
}
.react-flow__node.selectable { cursor: pointer; }
.react-flow__node.draggable { cursor: grab; pointer-events: all; }
.react-flow__node.draggable.dragging { cursor: grabbing; }
.react-flow__nodesselection { z-index: 3; transform-origin: left top; pointer-events: none; }
.react-flow__nodesselection-rect { position: absolute; pointer-events: all; cursor: grab; }
.react-flow__handle {
  position: absolute;
  pointer-events: none;
  min-width: 5px;
  min-height: 5px;
  width: 6px;
  height: 6px;
  background-color: var(--xy-handle-background-color, var(--xy-handle-background-color-default));
  border: 1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));
  border-radius: 100%;
}
.react-flow__handle.connectingfrom { pointer-events: all; }
.react-flow__handle.connectionindicator { pointer-events: all; cursor: crosshair; }
.react-flow__handle-bottom { top: auto; left: 50%; bottom: 0; transform: translate(-50%, 50%); }
.react-flow__handle-top { top: 0; left: 50%; transform: translate(-50%, -50%); }
.react-flow__handle-left { top: 50%; left: 0; transform: translate(-50%, -50%); }
.react-flow__handle-right { top: 50%; right: 0; transform: translate(50%, -50%); }
.react-flow__edgeupdater { cursor: move; pointer-events: all; }
.react-flow__panel { position: absolute; z-index: 5; margin: 15px; }
.react-flow__panel.top { top: 0; }
.react-flow__panel.bottom { bottom: 0; }
.react-flow__panel.left { left: 0; }
.react-flow__panel.right { right: 0; }
.react-flow__panel.center { left: 50%; transform: translateX(-50%); }
.react-flow__attribution { font-size: 10px; background: var(--xy-attribution-background-color, var(--xy-attribution-background-color-default)); padding: 2px 3px; margin: 0; }
.react-flow__attribution a { text-decoration: none; color: #999; }
@keyframes dashdraw { from { stroke-dashoffset: 10; } }
.react-flow__edgelabel-renderer { position: absolute; width: 100%; height: 100%; pointer-events: none; user-select: none; left: 0; top: 0; }
.react-flow__viewport-portal { position: absolute; width: 100%; height: 100%; left: 0; top: 0; user-select: none; }
.react-flow__minimap { background: var(--xy-minimap-background-color-props, var(--xy-minimap-background-color, var(--xy-minimap-background-color-default))); }
.react-flow__minimap-svg { display: block; }
.react-flow__minimap-mask {
  fill: var(--xy-minimap-mask-background-color-props, var(--xy-minimap-mask-background-color, var(--xy-minimap-mask-background-color-default)));
  stroke: var(--xy-minimap-mask-stroke-color-props, var(--xy-minimap-mask-stroke-color, var(--xy-minimap-mask-stroke-color-default)));
  stroke-width: var(--xy-minimap-mask-stroke-width-props, var(--xy-minimap-mask-stroke-width, var(--xy-minimap-mask-stroke-width-default)));
}
.react-flow__minimap-node {
  fill: var(--xy-minimap-node-background-color-props, var(--xy-minimap-node-background-color, var(--xy-minimap-node-background-color-default)));
  stroke: var(--xy-minimap-node-stroke-color-props, var(--xy-minimap-node-stroke-color, var(--xy-minimap-node-stroke-color-default)));
  stroke-width: var(--xy-minimap-node-stroke-width-props, var(--xy-minimap-node-stroke-width, var(--xy-minimap-node-stroke-width-default)));
}
.react-flow__background-pattern.dots { fill: var(--xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-dots-color-default))); }
.react-flow__background-pattern.lines { stroke: var(--xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-lines-color-default))); }
.react-flow__background-pattern.cross { stroke: var(--xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-cross-color-default))); }
.react-flow__controls { display: flex; flex-direction: column; box-shadow: var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default)); }
.react-flow__controls.horizontal { flex-direction: row; }
.react-flow__controls-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  width: 26px;
  padding: 4px;
  border: none;
  background: var(--xy-controls-button-background-color, var(--xy-controls-button-background-color-default));
  border-bottom: 1px solid var(--xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)));
  color: var(--xy-controls-button-color-props, var(--xy-controls-button-color, var(--xy-controls-button-color-default)));
  cursor: pointer;
  user-select: none;
}
.react-flow__controls-button svg { width: 100%; max-width: 12px; max-height: 12px; fill: currentColor; }
.react-flow__edge.updating .react-flow__edge-path { stroke: #777; }
.react-flow__edge-text { font-size: 10px; }
.react-flow__node.selectable:focus,
.react-flow__node.selectable:focus-visible { outline: none; }
.react-flow__node-input,
.react-flow__node-default,
.react-flow__node-output,
.react-flow__node-group {
  padding: 10px;
  border-radius: var(--xy-node-border-radius, var(--xy-node-border-radius-default));
  width: 150px;
  font-size: 12px;
  color: var(--xy-node-color, var(--xy-node-color-default));
  text-align: center;
  border: var(--xy-node-border, var(--xy-node-border-default));
  background-color: var(--xy-node-background-color, var(--xy-node-background-color-default));
}
.react-flow__node-input.selectable:hover,
.react-flow__node-default.selectable:hover,
.react-flow__node-output.selectable:hover,
.react-flow__node-group.selectable:hover { box-shadow: var(--xy-node-boxshadow-hover, var(--xy-node-boxshadow-hover-default)); }
.react-flow__node-group { background-color: var(--xy-node-group-background-color, var(--xy-node-group-background-color-default)); }
.react-flow__nodesselection-rect,
.react-flow__selection {
  background: var(--xy-selection-background-color, var(--xy-selection-background-color-default));
  border: var(--xy-selection-border, var(--xy-selection-border-default));
}
.react-flow__nodesselection-rect:focus,
.react-flow__nodesselection-rect:focus-visible,
.react-flow__selection:focus,
.react-flow__selection:focus-visible { outline: none; }
.react-flow__controls-button:hover {
  background: var(--xy-controls-button-background-color-hover-props, var(--xy-controls-button-background-color-hover, var(--xy-controls-button-background-color-hover-default)));
  color: var(--xy-controls-button-color-hover-props, var(--xy-controls-button-color-hover, var(--xy-controls-button-color-hover-default)));
}
.react-flow__controls-button:disabled { pointer-events: none; }
.react-flow__controls-button:disabled svg { fill-opacity: 0.4; }
.react-flow__controls-button:last-child { border-bottom: none; }
.react-flow__resize-control { position: absolute; }
.react-flow__resize-control.left, .react-flow__resize-control.right { cursor: ew-resize; }
.react-flow__resize-control.top, .react-flow__resize-control.bottom { cursor: ns-resize; }
.react-flow__resize-control.top.left, .react-flow__resize-control.bottom.right { cursor: nwse-resize; }
.react-flow__resize-control.bottom.left, .react-flow__resize-control.top.right { cursor: nesw-resize; }
.react-flow__resize-control.handle {
  width: 4px;
  height: 4px;
  border: 1px solid #fff;
  border-radius: 1px;
  background-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default));
  transform: translate(-50%, -50%);
}
.react-flow__resize-control.handle.left { left: 0; top: 50%; }
.react-flow__resize-control.handle.right { left: 100%; top: 50%; }
.react-flow__resize-control.handle.top { left: 50%; top: 0; }
.react-flow__resize-control.handle.bottom { left: 50%; top: 100%; }
.react-flow__resize-control.handle.top.left { left: 0; }
.react-flow__resize-control.handle.bottom.left { left: 0; }
.react-flow__resize-control.handle.top.right { left: 100%; }
.react-flow__resize-control.handle.bottom.right { left: 100%; }
.react-flow__resize-control.line { border-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default)); border-width: 0; border-style: solid; }
.react-flow__resize-control.line.left, .react-flow__resize-control.line.right { width: 1px; transform: translate(-50%, 0); top: 0; height: 100%; }
.react-flow__resize-control.line.left { left: 0; border-left-width: 1px; }
.react-flow__resize-control.line.right { left: 100%; border-right-width: 1px; }
.react-flow__resize-control.line.top, .react-flow__resize-control.line.bottom { height: 1px; transform: translate(0, -50%); left: 0; width: 100%; }
.react-flow__resize-control.line.top { top: 0; border-top-width: 1px; }
.react-flow__resize-control.line.bottom { border-bottom-width: 1px; top: 100%; }
.react-flow__edge-textbg { fill: var(--xy-edge-label-background-color, var(--xy-edge-label-background-color-default)); }
.react-flow__edge-text { fill: var(--xy-edge-label-color, var(--xy-edge-label-color-default)); }

/* ===== FlowX custom node styles ===== */
:root {
  --anil-flowx-whiteNode: #ffffff;
  --anil-flowx-redNode: #f2495c;
  --anil-flowx-orangeNode: #ff9830;
  --anil-flowx-yellowNode: #fade2a;
  --anil-flowx-greenNode: #73bf69;
  --anil-flowx-blueNode: #5794f2;
  --anil-flowx-grayNode: #ebebeb;
}
.anil-flowx-panelContainer {
  width: 100%;
  height: 100%;
  color: black;
  position: relative;
  overflow: hidden;
}
.anil-flowx-nodeCustomContainer {
  border: 1px solid black;
  text-align: center;
  border-radius: 5px;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  width: 240px;
  height: 242px;
}
.anil-flowx-collapseBtn {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #888;
  background: #ffffff;
  color: #444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
  padding: 0;
  line-height: 1;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.anil-flowx-collapseBtn:hover { background: #f0f0f0; border-color: #555; }
.anil-flowx-nodeCustomValues { height: 100%; display: flex; flex-direction: column; }
.anil-flowx-nodeCustomTitle {
  background-color: #ebebeb;
  border-bottom: 1px solid black;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  padding: 0px 5px;
}
.anil-flowx-nodeCustomData { height: calc(100% - 30px); display: flex; flex-direction: column; padding: 5px 0px; margin: auto 0px; }
.anil-flowx-nodeCustomData > div { display: flex; justify-content: center; align-items: center; flex-grow: 1; padding: 0px 5px; }
.anil-flowx-nodeCustomData > div > b { overflow: hidden; text-wrap: nowrap; text-overflow: ellipsis; }
.anil-flowx-nodeTypeTitle { width: 240px !important; height: 50px !important; }
.anil-flowx-nodeCustomTitleTitle { background-color: #ebebeb; height: 50px; line-height: 50px; overflow: hidden; text-wrap: nowrap; text-overflow: ellipsis; padding: 0px 5px; }
.anil-flowx-nodeTypeOne { width: 240px !important; height: 98px !important; }
.anil-flowx-nodeTypeTwo { width: 240px !important; height: 146px !important; }
.anil-flowx-nodeTypeThree { width: 240px !important; height: 194px !important; }
.anil-flowx-nodeTypeFour { width: 240px !important; height: 242px !important; }
.anil-flowx-nodeTypeFive { width: 240px !important; height: 290px !important; }
.anil-flowx-nodeTypeSix { width: 240px !important; height: 338px !important; }
.anil-flowx-nodeTypeCircle { width: 100px !important; height: 100px !important; border: 1px solid black; border-radius: 50%; }
.anil-flowx-nodeTypeDiamondContainer { width: 100px !important; height: 100px !important; display: flex; justify-content: center; align-items: center; }
.anil-flowx-nodeTypeDiamond { width: 72px; height: 72px; border: 1px solid black; transform: rotate(45deg); }
.anil-flowx-nodePopup {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
}
.anil-flowx-nodePopupInside {
  margin: 10px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  padding: 10px;
}
.anil-flowx-nodePopupInside > div { overflow: hidden; text-wrap: nowrap; text-overflow: ellipsis; }
.anil-flowx-nodePopupInside > a { overflow: hidden; text-wrap: nowrap; text-overflow: ellipsis; }
.anil-flowx-nodePopupTitle {
  background-color: var(--anil-flowx-grayNode);
  border: 1px solid black;
  border-radius: 5px;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0px 5px;
}
.anil-flowx-nodeBgDefault { background-color: var(--anil-flowx-whiteNode); color: black; }
.anil-flowx-nodeBgRed { background-color: var(--anil-flowx-redNode); }
.anil-flowx-nodeBgOrange { background-color: var(--anil-flowx-orangeNode); }
.anil-flowx-nodeBgYellow { background-color: var(--anil-flowx-yellowNode); }
.anil-flowx-nodeBgGreen { background-color: var(--anil-flowx-greenNode); }
.anil-flowx-nodeBgBlue { background-color: var(--anil-flowx-blueNode); }
.anil-flowx-nodeBgGray { background-color: var(--anil-flowx-grayNode); }
.anil-flowx-nodeBgRedBlink { animation: anil-flowx-redBlink 0.2s infinite; }
.anil-flowx-nodeBgOrangeBlink { animation: anil-flowx-orangeBlink 0.2s infinite; }
.anil-flowx-nodeBgYellowBlink { animation: anil-flowx-yellowBlink 0.2s infinite; }
.anil-flowx-nodeBgGreenBlink { animation: anil-flowx-greenBlink 0.2s infinite; }
.anil-flowx-nodeBgBlueBlink { animation: anil-flowx-blueBlink 0.2s infinite; }
.anil-flowx-nodeBgGrayBlink { animation: anil-flowx-grayBlink 0.2s infinite; }
@keyframes anil-flowx-redBlink {
  0%, 49% { background-color: var(--anil-flowx-whiteNode); }
  50%, 100% { background-color: var(--anil-flowx-redNode); }
}
@keyframes anil-flowx-orangeBlink {
  0%, 49% { background-color: var(--anil-flowx-whiteNode); }
  50%, 100% { background-color: var(--anil-flowx-orangeNode); }
}
@keyframes anil-flowx-yellowBlink {
  0%, 49% { background-color: var(--anil-flowx-whiteNode); }
  50%, 100% { background-color: var(--anil-flowx-yellowNode); }
}
@keyframes anil-flowx-greenBlink {
  0%, 49% { background-color: var(--anil-flowx-whiteNode); }
  50%, 100% { background-color: var(--anil-flowx-greenNode); }
}
@keyframes anil-flowx-blueBlink {
  0%, 49% { background-color: var(--anil-flowx-whiteNode); }
  50%, 100% { background-color: var(--anil-flowx-blueNode); }
}
@keyframes anil-flowx-grayBlink {
  0%, 49% { background-color: var(--anil-flowx-whiteNode); }
  50%, 100% { background-color: var(--anil-flowx-grayNode); }
}
.anil-flowx-nodeButton {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: #000000;
  cursor: pointer;
  margin: auto;
  padding: 5px 10px;
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: 100%;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}
.anil-flowx-nodeButton:hover,
.anil-flowx-nodeButton:focus { border-color: rgba(0, 0, 0, 0.15); box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px; }
.anil-flowx-nodeButton:active { background-color: #f0f0f1; border-color: rgba(0, 0, 0, 0.15); box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px; }
`;
