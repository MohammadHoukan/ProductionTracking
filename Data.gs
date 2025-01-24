/**
 * Fetches all production orders and their statuses from the "Orders" sheet.
 * @return {Array} An array of order objects.
 * @example
 * [
 *   { id: '12345', description: 'Wardrobe', dateReceived: '01-01-2025', deliveryDate: '15-01-2025', status: 'Cutting', comments: 'Urgent' },
 *   { id: '67890', description: 'Table', dateReceived: '02-01-2025', deliveryDate: '20-01-2025', status: 'Assembling', comments: 'Check quality' }
 * ]
 */
function fetchOrders() {
  try {
    const spreadsheetId = getSpreadsheetId();
    const sheetName = 'Orders';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`The "${sheetName}" sheet was not found in the spreadsheet.`);
    }

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      Logger.log(`No orders found in the "${sheetName}" sheet.`);
      return [];
    }

    // Fetch data (assuming columns: ID, Description, Date Received, Delivery Date, Status, Comments)
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 6);
    const data = dataRange.getValues();

    // Constants for column indices (1-based)
    const ID_COL = 0;
    const DESC_COL = 1;
    const DATE_RECEIVED_COL = 2;
    const DELIVERY_DATE_COL = 3;
    const STATUS_COL = 4;
    const COMMENTS_COL = 5;

    const orders = [];

    data.forEach((row, index) => {
      const id = row[ID_COL]?.toString().trim();
      const description = row[DESC_COL]?.trim();
      const dateReceived = parseDate(row[DATE_RECEIVED_COL]);
      const deliveryDate = parseDate(row[DELIVERY_DATE_COL]);
      const status = row[STATUS_COL] || 'Unassigned';
      const comments = row[COMMENTS_COL] || 'No Comments';

      if (!id || !description) {
        Logger.log(`Skipping invalid row ${index + 2}: Missing ID or Description`);
        return; // Skip invalid rows
      }

      orders.push({
        id,
        description,
        dateReceived,
        deliveryDate,
        status,
        comments,
      });
    });

    return orders;

  } catch (error) {
    Logger.log(`Error in fetchOrders: ${error.message}`);
    return [];
  }
}

/**
 * Updates the production status of an order in the "Orders" sheet.
 * @param {string} itemId - The ID of the item to update.
 * @param {string} newStatus - The new status for the item.
 */
function updateOrderStatus(itemId, newStatus) {
  try {
    const spreadsheetId = getSpreadsheetId();
    const sheetName = 'Orders';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`The "${sheetName}" sheet was not found in the spreadsheet.`);
    }

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      Logger.log(`No orders found in the "${sheetName}" sheet.`);
      return;
    }

    // Fetch data
    const data = sheet.getRange(2, 1, lastRow - 1).getValues(); // Skip header row
    const STATUS_COL = 5; // Column for status (1-based index)

    // Find the row index of the item by ID
    const rowIndex = data.findIndex(row => row[0]?.toString().trim() === itemId.toString().trim());
    if (rowIndex !== -1) {
      sheet.getRange(rowIndex + 2, STATUS_COL).setValue(newStatus); // +2 to account for 1-based indexing and header row
      Logger.log(`Updated Row ${rowIndex + 2} to Status: ${newStatus}`);
    } else {
      Logger.log(`Item ID "${itemId}" not found in the "${sheetName}" sheet.`);
    }
  } catch (error) {
    Logger.log(`Error in updateOrderStatus: ${error.message}`);
  }
}

/**
 * Test function to log fetched orders for debugging.
 */
function testFetchOrders() {
  try {
    const orders = fetchOrders();
    if (orders.length === 0) {
      Logger.log('No orders retrieved.');
    } else {
      Logger.log(`Fetched ${orders.length} orders:`);
      Logger.log(JSON.stringify(orders, null, 2)); // Pretty-print orders
    }
  } catch (error) {
    Logger.log(`Error in testFetchOrders: ${error.message}`);
  }
}

/**
 * Test function to update an order's status for debugging.
 * @param {string} testItemId - The ID of the item to test.
 * @param {string} newStatus - The new status for the test.
 */
function testUpdateOrderStatus(testItemId, newStatus) {
  try {
    updateOrderStatus(testItemId, newStatus);
    Logger.log(`Test update successful for item "${testItemId}" to status "${newStatus}".`);
  } catch (error) {
    Logger.log(`Error in testUpdateOrderStatus: ${error.message}`);
  }
}
