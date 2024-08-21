/* Panel Options */

export interface PanelOptions {
  /* @type {string} */
  backgroundColor: string;
  backgroundType: string;
  backgroundGap: number;
  backgroundSize: number;
  backgroundTypeColor: string;

  layoutDirection: string;
  showLayoutOptions: boolean;
  showMiniMap: boolean;
  showControls: boolean;
  hideAttribution: boolean;
  maxZoom: number;
  minZoom: number;

  isDraggable: boolean;
  showPopup: boolean;

  edgeAnimation: boolean;
  edgeType: string;
  edgeStroke: number;
  edgeColor: string;
}
