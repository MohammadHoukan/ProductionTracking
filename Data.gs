/**
 * Fetches all production orders and their statuses from the "Orders" sheet.
 * @return {Array} An array of order objects.
 * @example
 * [
 *   { id: '12345', description: 'Wardrobe', dateReceived: '01-01-2025', deliveryDate: '15-01-2025', status: 'Cutting', comments: 'Urgent' },
 *   { id: '67890', description: 'Table', dateReceived: '02-01-2025', deliveryDate: '20-01-2025', status: 'Assembling', comments: 'Check quality' }
 * ]
 */
/**
 * Fetches all production orders and their statuses from the "Orders" sheet.
 * @return {Array} An array of order objects.
 * @example
 * [
 *   {
 *     id: '123',
 *     description: 'Wardrobe Unit',
 *     dateReceived: '01-01-2025',
 *     deliveryDate: '15-01-2025',
 *     status: 'Cutting-Cutting 1',
 *     comments: 'Urgent Order'
 *   }
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

    // Constants for column indices (0-based)
    const ID_COL = 0;
    const DESC_COL = 1;
    const DATE_RECEIVED_COL = 2;
    const DELIVERY_DATE_COL = 3;
    const STATUS_COL = 4;
    const COMMENTS_COL = 5;

    const orders = [];

    data.forEach((row, index) => {
      const id = row[ID_COL]?.toString().trim(); // Convert to string and trim whitespace
      const description = row[DESC_COL]?.trim(); // Trim whitespace
      const dateReceived = parseDate(row[DATE_RECEIVED_COL]); // Format the date
      const deliveryDate = parseDate(row[DELIVERY_DATE_COL]); // Format the date
      const status = row[STATUS_COL]?.trim() || 'Unassigned'; // Default status
      const comments = row[COMMENTS_COL]?.trim() || 'No Comments'; // Default comments

      // Skip rows with missing critical data
      if (!id || !description) {
        Logger.log(`Skipping invalid row ${index + 2}: Missing ID or Description`);
        return;
      }

      // Ensure unique IDs by appending the index (if necessary)
      const uniqueId = `${id}`;

      orders.push({
        id: uniqueId,
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
    const spreadsheetId = getSpreadsheetId(); // Retrieve the Spreadsheet ID
    const sheetName = 'Orders';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    if (!sheet) {
      throw new Error(`The "${sheetName}" sheet was not found.`);
    }

    const data = sheet.getDataRange().getValues();
    const ID_COL = 0; // Adjust if the ID column is not the first column
    const STATUS_COL = 4; // Adjust if the status column is not the fifth column

    const rowIndex = data.findIndex(row => row[ID_COL]?.toString() === itemId);
    if (rowIndex === -1) {
      throw new Error(`Item with ID "${itemId}" not found in the sheet.`);
    }

    sheet.getRange(rowIndex + 1, STATUS_COL + 1).setValue(newStatus); // Update status
    Logger.log(`Updated status for item "${itemId}" to "${newStatus}".`);
  } catch (error) {
    Logger.log(`Error in updateOrderStatus: ${error.message}`);
    throw error;
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
