# FlowX

The FlowX Grafana panel enables the rendering of interactive flowcharts derived from directed graph data, consisting of nodes and edges. FlowX supports a variety of node types, each designed for specific use cases. Grafana provides a Node Graph panel for visualizing directed graph data, but its visualization capabilities are quite limited. To address the need for more advanced and rich visualizations of directed graphs, this panel has been developed. It leverages ReactFlow and DagreJS to deliver enhanced visualization features.

## Installation

Installing plugin on Grafana Cloud / Local Grafana - https://grafana.com/docs/grafana/latest/plugins/installation/

## Configuration

To use the FlowX panel, 2 different queries called "Node" and "Edge" must be added.
The "Node" query is for determining the boxes, circles and diamonds we will draw.
The "Edge" query is for determining the relationship between the nodes we draw.
The expected columns in Node and Edge queries are as shared below.
All data to come to the columns are optional (yes, including IDs, if an empty row comes, an empty node with no relationship will be drawn.)
**The expected data type is string for all columns.**

## Node

The following table describes expected columns of the Node query:

| Columns         | Supported Values                                                                                                                | Description                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              |                                                                                                                                 | Unique identifier of the Node. Each Node to be drawn must have a unique ID. These ID's will be used in the Source or Target fields in the "Edge" query. |
| type            | `title` `one` `two` `three` `four` `circle` `diamond`                                                                           | Determines the type of Node. The Node is drawn according to this data. However, if the popup is active, all values will appear there. Default: `four`   |
| title           |                                                                                                                                 | Title of the Node.                                                                                                                                      |
| value1_header   |                                                                                                                                 | The header that will come for the first value of the node.                                                                                              |
| value1_data     |                                                                                                                                 | The data that will come for the first value of the node.                                                                                                |
| value1_url      |                                                                                                                                 | The URL that will come for the first value of the node. "Show Popup" must be on to use.                                                                 |
| value2_header   |                                                                                                                                 | The header that will come for the second value of the node.                                                                                             |
| value2_data     |                                                                                                                                 | The data that will come for the second value of the node.                                                                                               |
| value2_url      |                                                                                                                                 | The URL that will come for the second value of the node. "Show Popup" must be on to use.                                                                |
| value3_header   |                                                                                                                                 | The header that will come for the third value of the node.                                                                                              |
| value3_data     |                                                                                                                                 | The data that will come for the third value of the node.                                                                                                |
| value3_url      |                                                                                                                                 | The URL that will come for the third value of the node. "Show Popup" must be on to use.                                                                 |
| value4_header   |                                                                                                                                 | The header that will come for the fourth value of the node.                                                                                             |
| value4_data     |                                                                                                                                 | The data that will come for the fourth value of the node.                                                                                               |
| value4_url      |                                                                                                                                 | The URL that will come for the fourth value of the node. "Show Popup" must be on to use.                                                                |
| color_condition | `red` `red_blink` `orange` `orange_blink` `yellow` `yellow_blink` `green` `green_blink` `blue` `blue_blink` `gray` `gray_blink` | Field that determines the background color of the node. Blink ones flash. Default: _null_                                                               |
| url             |                                                                                                                                 | Field that can be used for the node's own URL. "Show Popup" must be on to use.                                                                          |
| url_label       |                                                                                                                                 | The label that will replace the node's own URL.                                                                                                         |

## Edge

The following table describes expected columns of the Edge query:

| Columns | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| id      | Unique identifier of the Edge. Each Edge to be drawn must have a unique ID. |
| source  | Source Node ID                                                              |
| target  | Target Node ID                                                              |

<br/>

#### Supported Types of Node

| type    | Description                                                                                                                                                                                                                                   |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _null_  | Default, node type will be set as 'four'.                                                                                                                                                                                                     |
| title   | Node showing only `title` column. But if "Show Popup" option is on, other title, data, url columns will be shown in popup.                                                                                                                    |
| one     | Node showing `value1_header`, `value1_data` columns. But if "Show Popup" option is on, other title, data, url columns will be shown in popup.                                                                                                 |
| two     | Node showing `value1_header`, `value1_data`, `value2_header`, `value2_data` columns. But if "Show Popup" option is on, other title, data, url columns will be shown in popup.                                                                 |
| three   | Node showing `value1_header`, `value1_data`, `value2_header`, `value2_data`, `value3_header`, `value3_data` columns. But if "Show Popup" option is on, other title, data, url columns will be shown in popup.                                 |
| four    | Node showing `value1_header`, `value1_data`, `value2_header`, `value2_data`, `value3_header`, `value3_data`, `value4_header`, `value4_data` columns. But if "Show Popup" option is on, other title, data, url columns will be shown in popup. |
| circle  | A node with circle shape that does not display columns. But if "Show Popup" option is on, other title, data, url columns will be shown in popup.                                                                                              |
| diamond | A node with diamond shape that does not display columns. But if "Show Popup" option is on, other title, data, url columns will be shown in popup.                                                                                             |

<br/>

#### Supported Colors of Node

| color_condition | Description                           |
| --------------- | ------------------------------------- |
| _null_          | Default, paints the background white. |
| red             | Paints the background #f2495c.        |
| red_blink       | Blinks between #f2495c and white.     |
| orange          | Paints the background #ff9830.        |
| orange_blink    | Blinks between #ff9830 and white.     |
| yellow          | Paints the background #fade2a.        |
| yellow_blink    | Blinks between #fade2a and white.     |
| green           | Paints the background #73bf69.        |
| green_blink     | Blinks between #73bf69 and white.     |
| blue            | Paints the background #5794f2.        |
| blue_blink      | Blinks between #5794f2 and white.     |
| gray            | Paints the background #ebebeb.        |
| gray_blink      | Blinks between #ebebeb and white.     |

## FlowX Panel Options

The following table describes FlowX panel options:

| Category            | Option                 | Values                                                  | Default         | Description                                                                                         |
| ------------------- | ---------------------- | ------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------- |
| Background Settings | Background Color       | Grafana Color Palette                                   | `#ffffff`       |                                                                                                     |
| Background Settings | Background Type        | `None` `Dots` `Cross` `Lines`                           | `None`          |                                                                                                     |
| Background Settings | Type Gap               | 1 >= `Type Gap` <= 50                                   | `28`            |                                                                                                     |
| Background Settings | Type Size              | 1 >= `Type Size` <= 10                                  | `1`             |                                                                                                     |
| Background Settings | Type Color             | Grafana Color Palette                                   | `#000000`       |                                                                                                     |
| Layout Settings     | Layout Direction       | `Top to Bottom` `Left to Right`                         | `Top to Bottom` |                                                                                                     |
| Layout Settings     | Show Layout Options    | `on` `off`                                              | `on`            |                                                                                                     |
| Layout Settings     | Show Mini Map          | `on` `off`                                              | `on`            |                                                                                                     |
| Layout Settings     | Show Controls          | `on` `off`                                              | `on`            |                                                                                                     |
| Layout Settings     | Hide Attribution (Pro) | `on` `off`                                              | `off`           | Please only hide the attribution if you are subscribed to React Flow Pro: https://reactflow.dev/pro |
| Layout Settings     | Maximum Zoom           | 1 >= `Maximum Zoom` <= 10                               | `4`             |                                                                                                     |
| Layout Settings     | Minimum Zoom           | 0.1 >= `Minimum Zoom` <= 1                              | `0.1`           |                                                                                                     |
| Node Settings       | Draggable Nodes        | `on` `off`                                              | `off`           |                                                                                                     |
| Node Settings       | Show Popup             | `on` `off`                                              | `off`           | This option must be turned on to use Node or Value URLs.                                            |
| Edge Settings       | Edge Animation         | `on` `off`                                              | `on`            |                                                                                                     |
| Edge Settings       | Edge Type              | `Default` `Straight` `Step` `Smoothstep` `Simplebezier` | `Default`       |                                                                                                     |
| Edge Settings       | Edge Stroke            | 1 >= `Edge Stroke` <= 10                                | `1`             |                                                                                                     |
| Edge Settings       | Edge Color             | Grafana Color Palette                                   | `#000000`       |                                                                                                     |

## Contact

Write on [Linkedin](https://www.linkedin.com/in/anilhut/)

## Credits and References

1. [ReactFlow](https://reactflow.dev/)
2. [DagreJS](https://github.com/dagrejs/dagre)
3. [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
4. [Grafana documentation](https://grafana.com/docs/)
5. [Grafana Tutorials](https://grafana.com/tutorials/)
6. [Grafana UI Library](https://developers.grafana.com/ui)
