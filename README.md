# 🏢 Factory Production Tracking System

An inclusive solution using **📄 Google Apps Script** and **📃 Google Sheets** to streamline factory floor operations. By employing an intuitive 🔧 drag-and-drop interface and visual cues, this system empowers workers of varying technical skill levels to track and update production orders in real time.  
use here:https://script.google.com/macros/s/AKfycbxrrHJM3ZD3aLXWcbkSysDvme5FTGVbWLN10NoltXRslgSvdZrLmQVqHBu65vtjIRChYg/exec
---

## 1. Project Goal

Many production tracking systems assume a significant degree of computer fluency, leaving non-technical workers struggling with advanced software. This project was born to **bridge that gap** by:

- **🔄 Reducing Complexity**: An intuitive web interface where orders can simply be dragged between stages, eliminating the need for complicated menus.  
- **🔒 Enhancing Visibility**: Workers see clear, 🔹 color-coded cues for deadlines, and 🎨 icons that represent different item types or processes.  
- **🔓 Ensuring Accessibility**: By hosting through Google Apps Script, the system is browser-based, removing installation hurdles and simplifying updates.

Ultimately, this system aims to **🌍 democratize** production tracking, enabling team members at every skill level to collaborate effectively and reduce bottlenecks on the factory floor.

---

## 2. Overview

The Factory Production Tracking System integrates tightly with 📃 Google Sheets, acting as both a **🔬 database** (for storing order details) and a **⌛ real-time data source** (automatically updating the web interface). Users can:

- Visualize orders and move them through custom production stages.  
- Search for specific items or view large sets of orders, emphasizing those with urgent deadlines.  
- Print out 🗃️ status reports for review, meetings, or archival purposes.

This design is flexible and can be easily adapted to various production workflows, making it suitable for small-scale factories, specialized workshops, or larger operations seeking a lightweight tracking solution.

---

## 3. Features

1. **🔧 Drag-and-Drop Interface**  
   - Allows direct manipulation of orders across stages or sub-stages.  
   - Instant status updates are written back to 📃 Google Sheets.

2. **🔹 Visual Alerts**  
   - 🟥⬆⬇ Color-coded date bubbles to indicate urgency or upcoming deadlines.  
   - Descriptive icons (e.g., 🛑 doors, 🍲 kitchen items) to help workers quickly identify order types.

3. **🔎 Search & Filter**  
   - Users can type a keyword or order number in a search bar.  
   - Matching items become highlighted; others become dimmed for clarity.

4. **🎨 Dynamic Stage Management**  
   - Reads main stages and sub-stages from a dedicated sheet (‘Stages’) to accommodate changes with minimal code edits.

5. **📃 Automated Reporting**  
   - Generates a printable table of production status and dates, useful for daily or weekly progress reviews.

---

## 4. Technology Stack

- **📄 Google Apps Script (Server-Side Logic)**  
  - The script orchestrates data retrieval, updates, and the generation of the web interface.  
- **🔦 HTML, CSS, JavaScript (Frontend)**  
  - Served through Google Apps Script’s `HtmlService`, providing a familiar and straightforward environment for end-users.  
- **📃 Google Sheets**  
  - Holds order data, production stages, and sub-stage definitions.  
  - Serves as the real-time backend database.

---

## 5. Prerequisites

1. **🔑 Google Account**  
   - Required to create and manage the Google Sheet and the Apps Script project.  
2. **📖 Familiarity with Google Sheets**  
   - Basic knowledge of tabular data entry and sharing permissions.  
3. **📓 Correctly Structured Spreadsheet**  
   - Columns for key data such as Work Order, Purchase Order, Description, Date Received, Delivery Date, etc.  
4. **🔒 Appropriate Permissions**  
   - Editor access to your spreadsheet and the ability to deploy Apps Script web apps.

---

## 6. System Architecture


```
 ┌─────────────────────┐
 │   Google Sheets     │
 │ (Order Data + Stages)  
 └─────────┬───────────┘
           │
           │ (Read/Write)
           ▼
 ┌─────────────────────┐
 │ Google Apps Script  │
 │ (Backend Logic)     │
 └─────────┬───────────┘
           │
           │ HtmlService
           ▼
 ┌─────────────────────┐
 │  Browser Interface  │
 │ (HTML/CSS/JS)       │
 └─────────────────────┘
```

1. **Data Source**: All production order details and stage definitions reside in Google Sheets.  
2. **Apps Script**: Fetches or updates data in Sheets, then renders an interactive webpage.  
3. **Web Interface**: Users drag and drop orders into different production phases or sub-stages, triggering automatic updates.
---

## 7. Setup & Deployment

### Step 1: 📃 Create or Upload the Sample Sheet

**Option 1: Download the Sample Sheet**  
- Download the sample Excel file: [Download Sample Production Sheet](#).  
- Open the file in your preferred spreadsheet application and review the data.

**Option 2: Create a New Sheet Manually**  
- Open a new Google Spreadsheet and create two tabs:  
  - `Stages`: Add the following columns:
    - Main Stage
    - Sub Stage
  - `Orders`: Add the following columns:
    - ID, Description, Date Received, Delivery Date, Status, Comments
- Populate the tabs with relevant data (you can reference the structure of the sample sheet for guidance).

**Upload the Sample Sheet to Google Sheets**  
- Open Google Drive, click **➕ New > File Upload**, and upload the sample Excel file.  
- Right-click the uploaded file and select **Open with > Google Sheets**.

### Step 2: 🔍 Retrieve the Spreadsheet ID

1. Open the Google Sheet you just created or uploaded.  
2. Look at the URL in your browser. It will look like this:  
   ```
   https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
   ```
3. Copy the long alphanumeric string between `/d/` and `/edit`. This is your **Spreadsheet ID**.

### Step 3: 🔧 Deploy the Script

1. Open the **Google Apps Script Editor**:  
   - From your Google Sheet, go to **Extensions > Apps Script**.
2. Copy the script files (`Code.gs`, `Utilities.gs`, etc.) into the Apps Script Editor.
3. Set up your Spreadsheet ID:  
   - Open the `Utilities.gs` file and locate the `setSpreadsheetId()` function.
   - Replace the placeholder ID with your actual Spreadsheet ID:
     ```javascript
     scriptProperties.setProperty('SPREADSHEET_ID', 'your_spreadsheet_id_here');
     ```
   - Run the `setSpreadsheetId()` function to store the ID.
4. Save and deploy your script:  
   - Click **Deploy > New Deployment > Web App**.  
   - Set `Execute as` to **Me** and `Who has access` to **Anyone with the link**.  
   - Copy the deployment URL for later use.

### Step 4: 🔧 Test the App

- Open the deployment link, confirm that the production orders load correctly, and check that dragging any item updates the Google Sheet.

---

## 8. Usage Instructions

1. **🌐 Access the Web Link**  
   - Share the deployment URL with factory team members, or place it on a shared workstation.  
2. **🔧 Order Manipulation**  
   - Each production stage is displayed in a separate box.  
   - Drag an order to a new stage to reflect its progress. The system automatically updates the spreadsheet.  
3. **🔎 Search Bar**  
   - Enter a PO number, WO number, or keyword from the description. Items that match are highlighted; all others appear dimmed.  
4. **📃 Reporting**  
   - Use the **Print** button to open a printable page summarizing relevant orders, which can then be printed or saved.

---

## 9. Customization

- **🎨 Stages and Sub-Stages**  
  - Modify rows in the `Stages` sheet to introduce new phases or rename existing ones.  
- **🔎 Icons**  
  - Extend the `getIconForDescription()` function to display additional emojis or icons.  
- **⏳ Date Thresholds**  
  - Adjust color-coding (e.g., 🟥 for items within 3 days of the deadline, 🟡 for within 14 days, etc.) in the script to match your workflow.  
- **📃 Data Columns**  
  - If new columns are added to the main sheet, update the associated indexing in the script.

---

## 📝 Known Limitations

- **🔹 Google Apps Script Quotas**  
  - Large-scale factories with thousands of orders may approach daily execution or time quotas.  
- **🚫 Offline Access**  
  - Requires internet connectivity to interact with Google Sheets and the script.  


## 10. Known Limitations

- **Google Apps Script Quotas**  
  - Large-scale factories with thousands of orders may approach daily execution or time quotas.  
- **Offline Access**  
  - Requires internet connectivity to interact with Google Sheets and the script.  
- **Multi-Sheet Integrations**  
  - The system, as presented, focuses on a single main data source. Future integrations (e.g., multi-site production) would require additional script logic.

---

## 11. Contributing

Contributions are welcome. Whether you’re fixing bugs, adding features, or refining documentation:

1. **Fork the Repository**  
   - Create a personal copy of the repo on GitHub.  
2. **Feature Branch**  
   - Develop your updates in a dedicated branch (e.g., `feature-drag-enhancements`).  
3. **Pull Request**  
   - Submit a pull request with a clear explanation of your changes.  
   - Follow best practices for commit messages and code style.

---

## 12. License

This project is licensed under the **GNU General Public License v3.0**.

> _Copyright (C) Mohammad Houkan._

You should have received a copy of the GNU General Public License along with this program. If not, see [GNU Licenses](https://www.gnu.org/licenses/gpl-3.0.en.html).

---

## 13. Contact

- **Maintainer**: Mohammad Houkan  
- **Email**: mh1208170@gmail.com
  

Should you encounter any issues or have suggestions for improvement, please open a GitHub issue or contact us directly.

---

### *Final Notes*

This system was specifically designed with **ease of use** in mind, ensuring that **all workers—regardless of technical skill—can successfully track and update production orders** in a timely manner. By incorporating drag-and-drop capabilities, color-coded deadlines, and quick search functions, the platform aims to **reduce bottlenecks, minimize errors, and improve overall operational efficiency** on the factory floor.

