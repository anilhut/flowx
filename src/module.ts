import { PanelPlugin } from '@grafana/data';
import { PanelOptions } from './types';
import { FlowxPanel } from './components';
//import path from 'path';
//import { config } from 'process';

/* Panel Plugin */
export const plugin = new PanelPlugin<PanelOptions>(FlowxPanel).setPanelOptions((builder) => {
  return builder
    .addColorPicker({
      category: ['Background Settings'],
      path: 'backgroundColor',
      name: 'Background Color',
      defaultValue: '#ffffff',
    })
    .addSelect({
      category: ['Background Settings'],
      path: 'backgroundType',
      name: 'Background Type',
      settings: {
        options: [
          { value: 'None', label: 'None' },
          { value: 'Dots', label: 'Dots' },
          { value: 'Cross', label: 'Cross' },
          { value: 'Lines', label: 'Lines' },
        ],
      },
      defaultValue: 'None',
    })
    .addSliderInput({
      category: ['Background Settings'],
      path: 'backgroundGap',
      name: 'Type Gap',
      settings: {
        min: 1,
        max: 50,
        step: 1,
      },
      defaultValue: 28,
      showIf: (config) => config.backgroundType !== 'None',
    })
    .addSliderInput({
      category: ['Background Settings'],
      path: 'backgroundSize',
      name: 'Type Size',
      settings: {
        min: 1,
        max: 10,
        step: 1,
      },
      defaultValue: 1,
      showIf: (config) => !['None', 'Lines'].includes(config.backgroundType),
    })
    .addColorPicker({
      category: ['Background Settings'],
      path: 'backgroundTypeColor',
      name: 'Type Color',
      defaultValue: '#000000',
      showIf: (config) => config.backgroundType !== 'None',
    })

    .addSelect({
      category: ['Layout Settings'],
      path: 'layoutDirection',
      name: 'Layout Direction',
      settings: {
        options: [
          { value: 'TB', label: 'Top to Bottom' },
          { value: 'LR', label: 'Left to Right' },
        ],
      },
      defaultValue: 'TB',
    })
    .addBooleanSwitch({
      category: ['Layout Settings'],
      path: 'showLayoutOptions',
      name: 'Show Layout Options',
      defaultValue: true,
    })
    .addBooleanSwitch({
      category: ['Layout Settings'],
      path: 'showMiniMap',
      name: 'Show Mini Map',
      defaultValue: true,
    })
    .addBooleanSwitch({
      category: ['Layout Settings'],
      path: 'showControls',
      name: 'Show Controls',
      defaultValue: true,
    })
    .addBooleanSwitch({
      category: ['Layout Settings'],
      path: 'hideAttribution',
      name: 'Hide Attribution (Pro)',
      description:
        'Please only hide the attribution if you are subscribed to React Flow Pro: https://reactflow.dev/pro',
      defaultValue: false,
    })
    .addSliderInput({
      category: ['Layout Settings'],
      path: 'maxZoom',
      name: 'Maximum Zoom',
      settings: {
        min: 1,
        max: 10,
        step: 1,
      },
      defaultValue: 4,
    })
    .addSliderInput({
      category: ['Layout Settings'],
      path: 'minZoom',
      name: 'Minimum Zoom',
      settings: {
        min: 0.1,
        max: 1,
        step: 0.1,
      },
      defaultValue: 0.1,
    })

    .addBooleanSwitch({
      category: ['Node Settings'],
      path: 'isDraggable',
      name: 'Draggable Nodes',
      defaultValue: false,
    })
    .addBooleanSwitch({
      category: ['Node Settings'],
      path: 'fitViewOnCollapse',
      name: 'Fit View on Collapse/Expand',
      description: 'Automatically fit the view when a node is collapsed or expanded.',
      defaultValue: false,
    })
    .addBooleanSwitch({
      category: ['Node Settings'],
      path: 'showPopup',
      name: 'Show Popup',
      description: 'This option must be turned on to use Node or Value URLs.',
      defaultValue: false,
    })
    .addNumberInput({
      category: ['Node Settings'],
      path: 'initialDepth',
      name: 'Initial Depth',
      description: 'Number of levels visible on load. 0 = all open. 1 = only roots, 2 = roots + children, etc.',
      settings: {
        min: 0,
        placeholder: '0',
      },
      defaultValue: 0,
    })

    .addBooleanSwitch({
      category: ['Edge Settings'],
      path: 'edgeAnimation',
      name: 'Edge Animation',
      defaultValue: true,
    })
    .addSelect({
      category: ['Edge Settings'],
      path: 'edgeType',
      name: 'Edge Type',
      settings: {
        options: [
          { value: 'default', label: 'Default' },
          { value: 'straight', label: 'Straight' },
          { value: 'step', label: 'Step' },
          { value: 'smoothstep', label: 'Smoothstep' },
          { value: 'simplebezier', label: 'Simplebezier' },
        ],
      },
      defaultValue: 'default',
    })
    .addSliderInput({
      category: ['Edge Settings'],
      path: 'edgeStroke',
      name: 'Edge Stroke',
      settings: {
        min: 1,
        max: 10,
        step: 1,
      },
      defaultValue: 1,
    })
    .addColorPicker({
      category: ['Edge Settings'],
      path: 'edgeColor',
      name: 'Edge Color',
      defaultValue: '#000000',
    })

    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeId',
      name: 'ID',
      description: "Leave empty to use default column name: 'id'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeType',
      name: 'Type',
      description: "Leave empty to use default column name: 'type'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeTitle',
      name: 'Title',
      description: "Leave empty to use default column name: 'title'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeColorCondition',
      name: 'Color Condition',
      description: "Leave empty to use default column name: 'color_condition'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeUrl',
      name: 'URL',
      description: "Leave empty to use default column name: 'url'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeUrlLabel',
      name: 'URL Label',
      description: "Leave empty to use default column name: 'url_label'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue1Header',
      name: 'Value 1 Header',
      description: "Leave empty to use default column name: 'value1_header'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue1Data',
      name: 'Value 1 Data',
      description: "Leave empty to use default column name: 'value1_data'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue1Url',
      name: 'Value 1 URL',
      description: "Leave empty to use default column name: 'value1_url'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue2Header',
      name: 'Value 2 Header',
      description: "Leave empty to use default column name: 'value2_header'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue2Data',
      name: 'Value 2 Data',
      description: "Leave empty to use default column name: 'value2_data'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue2Url',
      name: 'Value 2 URL',
      description: "Leave empty to use default column name: 'value2_url'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue3Header',
      name: 'Value 3 Header',
      description: "Leave empty to use default column name: 'value3_header'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue3Data',
      name: 'Value 3 Data',
      description: "Leave empty to use default column name: 'value3_data'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue3Url',
      name: 'Value 3 URL',
      description: "Leave empty to use default column name: 'value3_url'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue4Header',
      name: 'Value 4 Header',
      description: "Leave empty to use default column name: 'value4_header'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue4Data',
      name: 'Value 4 Data',
      description: "Leave empty to use default column name: 'value4_data'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue4Url',
      name: 'Value 4 URL',
      description: "Leave empty to use default column name: 'value4_url'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue5Header',
      name: 'Value 5 Header',
      description: "Leave empty to use default column name: 'value5_header'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue5Data',
      name: 'Value 5 Data',
      description: "Leave empty to use default column name: 'value5_data'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue5Url',
      name: 'Value 5 URL',
      description: "Leave empty to use default column name: 'value5_url'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue6Header',
      name: 'Value 6 Header',
      description: "Leave empty to use default column name: 'value6_header'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue6Data',
      name: 'Value 6 Data',
      description: "Leave empty to use default column name: 'value6_data'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Node Field Mapping'],
      path: 'fieldMapping.nodeValue6Url',
      name: 'Value 6 URL',
      description: "Leave empty to use default column name: 'value6_url'",
      defaultValue: '',
    })

    .addTextInput({
      category: ['Edge Field Mapping'],
      path: 'fieldMapping.edgeId',
      name: 'ID',
      description: "Leave empty to use default column name: 'id'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Edge Field Mapping'],
      path: 'fieldMapping.edgeSource',
      name: 'Source',
      description: "Leave empty to use default column name: 'source'",
      defaultValue: '',
    })
    .addTextInput({
      category: ['Edge Field Mapping'],
      path: 'fieldMapping.edgeTarget',
      name: 'Target',
      description: "Leave empty to use default column name: 'target'",
      defaultValue: '',
    });
});
