import { test, expect } from '@grafana/plugin-e2e';

test('should display error when Node and Edge queries are missing', async ({
  gotoPanelEditPage,
  readProvisionedDashboard,
}) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  const panelEditPage = await gotoPanelEditPage({ dashboard, id: '2' });
  await expect(panelEditPage.panel.locator).toContainText("Add two queries named 'Node' and 'Edge'.");
});

test('should render flow canvas when valid Node and Edge data is provided', async ({
  gotoPanelEditPage,
  readProvisionedDashboard,
  page,
}) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  const panelEditPage = await gotoPanelEditPage({ dashboard, id: '1' });
  await expect(panelEditPage.panel.locator).toBeVisible();
  await expect(page.locator('.react-flow__node').first()).toBeVisible();
});

test('should render correct number of nodes', async ({
  gotoPanelEditPage,
  readProvisionedDashboard,
  page,
}) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  const panelEditPage = await gotoPanelEditPage({ dashboard, id: '1' });
  await expect(panelEditPage.panel.locator).toBeVisible();
  await expect(page.locator('.react-flow__node')).toHaveCount(2);
});

test('should render correct number of edges', async ({
  gotoPanelEditPage,
  readProvisionedDashboard,
  page,
}) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  const panelEditPage = await gotoPanelEditPage({ dashboard, id: '1' });
  await expect(panelEditPage.panel.locator).toBeVisible();
  await expect(page.locator('.react-flow__edge')).toHaveCount(1);
});
