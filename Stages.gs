/**
 * Fetches all production stages and sub-stages from the "Stages" sheet.
 * Dynamically handles new or updated stages and logs skipped rows.
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
    if (lastRow < 2) { // No data beyond the header
      Logger.log(`No stages found in the "${sheetName}" sheet.`);
      return { stages: {}, order: [] };
    }

    // Fetch only necessary rows and columns (starting from row 2)
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 2); // Columns: Main Stage, Sub Stage
    const data = dataRange.getValues();

    // Initialize structures
    const stages = {};
    const order = [];

    data.forEach((row, index) => {
      const mainStage = row[0]?.trim(); // Column 1: Main Stage
      const subStage = row[1]?.trim(); // Column 2: Sub Stage

      // Skip rows with missing data
      if (!mainStage || !subStage) {
        Logger.log(`Skipping invalid row ${index + 2}: ${JSON.stringify(row)}`);
        return;
      }

      // Add main stage if it doesn't exist
      if (!stages[mainStage]) {
        stages[mainStage] = [];
        order.push(mainStage); // Maintain order of main stages
      }

      // Add sub-stage
      stages[mainStage].push(subStage);
    });

    return { stages, order };

  } catch (error) {
    Logger.log(`Error in getProductionStages: ${error.message}`);
    return { stages: {}, order: [] }; // Return empty structure on error
  }
}

function testGetProductionStages() {
  try {
    const stagesData = getProductionStages();
    Logger.log(`Stages Data: ${JSON.stringify(stagesData, null, 2)}`);
  } catch (error) {
    Logger.log(`Error testing getProductionStages: ${error.message}`);
  }
}
