/**
 * Fetches all production stages and sub-stages from the "Stages" sheet.
 * @return {Object} An object containing main stages and their sub-stages, or an empty object if no data is found.
 */
function getProductionStages() {
  try {
    const sheet = SpreadsheetApp.openById(getSpreadsheetId()).getSheetByName('Stages');
    if (!sheet) {
      throw new Error('The "Stages" sheet is missing.');
    }

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) { // No data beyond the header
      Logger.log('No stages found in the "Stages" sheet.');
      return { stages: {}, order: [] };
    }

    const data = sheet.getRange(2, 1, lastRow - 1, 2).getValues(); // Skip header row
    const stages = {};
    const order = [];

    data.forEach((row, index) => {
      const mainStage = row[0]?.trim(); // Trim whitespace and handle undefined
      const subStage = row[1]?.trim();

      if (!mainStage || !subStage) {
        Logger.log(`Skipping invalid row ${index + 2}: ${JSON.stringify(row)}`);
        return;
      }

      if (!stages[mainStage]) {
        stages[mainStage] = [];
        order.push(mainStage);
      }

      stages[mainStage].push(subStage);
    });

    return { stages, order };

  } catch (error) {
    Logger.log(`Error in getProductionStages: ${error.message}`);
    return { stages: {}, order: [] }; // Return empty structure in case of error
  }
}
