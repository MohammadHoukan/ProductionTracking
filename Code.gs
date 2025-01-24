/**
 * Entry point for the web application.
 * @return {HtmlOutput} The rendered HTML page.
 */
function doGet() {
  const template = HtmlService.createTemplateFromFile('app');
  template.stages = getProductionStages(); // Load stages from Stages.gs
  template.items = fetchOrders(); // Load order data from Data.gs

  return template
    .evaluate()
    .setTitle('Production Tracking System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
