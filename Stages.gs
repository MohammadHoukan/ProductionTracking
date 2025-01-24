/**
 * Fetches all production stages and sub-stages from the "Stages" sheet.
 * @return {Object} An object containing main stages and their sub-stages.
 * @example
 * {
 *   stages: {
 *     Cutting: ['Cutting 1', 'Cutting 2'],
 *     Assembling: ['Assembly A', 'Assembly B']
 *   },
 *   order: ['Cutting', 'Assembling']
 * }
 */
function getProductionStages() {
  try {
    const spreadsheetId = getSpreadsheetId();
    const sheetName = 'Stages';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`The "${sheetName}" sheet was not found.`);
    }

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) { // Check if there's any data beyond the header
      Logger.log(`No stages found in the "${sheetName}" sheet.`);
      return { stages: {}, order: [] };
    }

    // Fetch only the necessary columns and rows (Assume 2 columns: Main Stage, Sub Stage)
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 2);
    const data = dataRange.getValues();

    // Constants for column indices (1-based indexing)
    const MAIN_STAGE_COL = 0;
    const SUB_STAGE_COL = 1;

    const stages = {};
    const order = [];

    data.forEach((row, index) => {
      const mainStage = row[MAIN_STAGE_COL]?.trim(); // Trim whitespace
      const subStage = row[SUB_STAGE_COL]?.trim();

      if (!mainStage || !subStage) {
        Logger.log(`Skipping invalid row ${index + 2}: ${JSON.stringify(row)}`);
        return; // Skip rows with missing data
      }

      // Add main stage if it doesn't exist
      if (!stages[mainStage]) {
        stages[mainStage] = [];
        order.push(mainStage); // Maintain the order of main stages
      }

      stages[mainStage].push(subStage);
    });

    return { stages, order };

  } catch (error) {
    Logger.log(`Error in getProductionStages: ${error.message}`);
    return { stages: {}, order: [] }; // Return an empty structure on error
  }
}
/**
 * Test function to log production stages for debugging.
 */
function testGetProductionStages() {
  try {
    const stagesData = getProductionStages();
    Logger.log(`Stages Data: ${JSON.stringify(stagesData, null, 2)}`);
  } catch (error) {
    Logger.log(`Error testing getProductionStages: ${error.message}`);
  }
}
