export interface FieldMapping {
  nodeId?: string;
  nodeType?: string;
  nodeTitle?: string;
  nodeColorCondition?: string;
  nodeUrl?: string;
  nodeUrlLabel?: string;
  nodeValue1Header?: string;
  nodeValue1Data?: string;
  nodeValue1Url?: string;
  nodeValue2Header?: string;
  nodeValue2Data?: string;
  nodeValue2Url?: string;
  nodeValue3Header?: string;
  nodeValue3Data?: string;
  nodeValue3Url?: string;
  nodeValue4Header?: string;
  nodeValue4Data?: string;
  nodeValue4Url?: string;
  nodeValue5Header?: string;
  nodeValue5Data?: string;
  nodeValue5Url?: string;
  nodeValue6Header?: string;
  nodeValue6Data?: string;
  nodeValue6Url?: string;
  edgeId?: string;
  edgeSource?: string;
  edgeTarget?: string;
}

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
  fitViewOnCollapse: boolean;

  edgeAnimation: boolean;
  edgeType: string;
  edgeStroke: number;
  edgeColor: string;

  initialDepth: number;

  fieldMapping: FieldMapping;
}
