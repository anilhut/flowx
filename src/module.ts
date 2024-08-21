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
      path: 'showPopup',
      name: 'Show Popup',
      description: 'This option must be turned on to use Node or Value URLs.',
      defaultValue: false,
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
    });
});
