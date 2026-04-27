# Changelog

## 2.0.0 (Unreleased)

### Breaking Changes

- **Minimum Grafana version updated to 11.6.11.** Grafana 10.x is no longer supported.
  This change was required to ensure React 19 compatibility ahead of Grafana 13. If you are using Grafana 10.x, please stay on version 1.0.3.

### New Features

- **Collapse / Expand Nodes:** Each node that has children now shows a collapse/expand button at its source edge. Clicking it hides or reveals the subtree beneath that node. The feature correctly handles cycles and multiple-parent scenarios using BFS reachability.
- **Initial Depth:** New `Initial Depth` panel option controls how many levels are visible when the panel first loads. `0` means all nodes are expanded; `1` shows only root nodes; `2` shows roots and their direct children, and so on.
- **Fit View on Collapse/Expand:** New panel option that automatically fits the view every time a node is collapsed or expanded.
- **Reset to Default Button:** A "Reset to Default" button is now shown in the top-left corner (alongside the layout direction buttons) that clears all manual drag positions and resets the collapse state to the configured Initial Depth.
- **State Preserved on Data Refresh:** Collapse/expand state and manually dragged node positions are now preserved across data refresh cycles. Only removed nodes are cleaned up.
- **TypeFive & TypeSix Node Types:** Two new rectangular node types (`five`, `six`) supporting 5 and 6 value rows respectively, consistent with the existing type sizing pattern.
- **Custom Field Mapping:** Added "Node Field Mapping" and "Edge Field Mapping" panel option categories. Users can now map any column name from their data source to the expected FlowX field names. All mapping fields are optional — leaving a field empty falls back to the default column name.
- **Value 5 & Value 6 in Popup:** The node popup now displays value5 and value6 fields (header, data, and URL) in addition to the existing four.

### Changes

- React 19 compatibility: externalized `react/jsx-runtime` to prevent bundling conflicts with Grafana 13+.
- Auto fit-view now triggers when clicking "Top to Bottom", "Left to Right", and "Reset to Default" buttons.

## 1.0.3

- CSS classes have been made specific.
- Root URL flag deleted.

## 1.0.0

Initial release.
