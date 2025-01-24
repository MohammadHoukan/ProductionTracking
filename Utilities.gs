/**
 * Formats a date into a readable string.
 * @param {Date|string|null} date - The date to format.
 * @return {string} The formatted date (dd-MM-yyyy) or an empty string if invalid.
 */
function formatDate(date) {
  if (!date) return ''; // Handle null or undefined
  try {
    const formattedDate = Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'dd-MM-yyyy');
    return formattedDate;
  } catch (error) {
    Logger.log(`Error formatting date: ${date}`);
    return 'Invalid Date';
  }
}

/**
 * Retrieves the stored Spreadsheet ID from PropertiesService.
 * @return {string} The Spreadsheet ID.
 * @throws {Error} If the Spreadsheet ID is not set.
 */
function getSpreadsheetId() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) {
    throw new Error('Spreadsheet ID is not set in PropertiesService. Use setSpreadsheetId() to configure it.');
  }
  return spreadsheetId;
}

/**
 * Sets the Spreadsheet ID in PropertiesService.
 * This is a one-time setup function that must be run manually.
 * @param {string} spreadsheetId - The ID of the spreadsheet to set.
 * @throws {Error} If the spreadsheetId is empty or invalid.
 */
function setSpreadsheetId(spreadsheetId) {
  if (!spreadsheetId) {
    throw new Error('Spreadsheet ID cannot be empty.');
  }
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('SPREADSHEET_ID', spreadsheetId);
  Logger.log(`Spreadsheet ID has been set to: ${spreadsheetId}`);
}

/**
 * Logs the currently stored Spreadsheet ID for debugging purposes.
 */
function logStoredSpreadsheetId() {
  try {
    const spreadsheetId = getSpreadsheetId();
    Logger.log(`Stored Spreadsheet ID: ${spreadsheetId}`);
  } catch (error) {
    Logger.log(`Error logging Spreadsheet ID: ${error.message}`);
  }
}

/**
 * Parses various date formats into a standard format (dd-MM-yyyy).
 * Handles both string and Date objects.
 * @param {string|Date|null} dateString - The date string or Date object to parse.
 * @return {string} The formatted date (dd-MM-yyyy) or 'Invalid Date' if parsing fails.
 */
function parseDate(dateString) {
  if (!dateString) return 'Invalid Date'; // Handle null or empty input

  try {
    // If already a Date object
    if (Object.prototype.toString.call(dateString) === '[object Date]') {
      return Utilities.formatDate(dateString, Session.getScriptTimeZone(), 'dd-MM-yyyy');
    }

    // If a valid string date
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
      return Utilities.formatDate(parsedDate, Session.getScriptTimeZone(), 'dd-MM-yyyy');
    }

    // Handle specific formats like "dd/MM/yyyy"
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are zero-based
      const year = parseInt(parts[2], 10);
      const reconstructedDate = new Date(year, month, day);
      if (!isNaN(reconstructedDate.getTime())) {
        return Utilities.formatDate(reconstructedDate, Session.getScriptTimeZone(), 'dd-MM-yyyy');
      }
    }
  } catch (error) {
    Logger.log(`Error parsing date: ${dateString}`);
  }

  return 'Invalid Date';
}
