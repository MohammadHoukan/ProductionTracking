# Factory Production Tracking System

An inclusive solution using **Google Apps Script** and **Google Sheets** to streamline factory floor operations. By employing an intuitive drag-and-drop interface and visual cues, this system empowers workers of varying technical skill levels to track and update production orders in real time.  

---

## Table of Contents
1. [Project Goal](#1-project-goal)  
2. [Overview](#2-overview)  
3. [Features](#3-features)  
4. [Technology Stack](#4-technology-stack)  
5. [Prerequisites](#5-prerequisites)  
6. [System Architecture](#6-system-architecture)  
7. [Setup & Deployment](#7-setup--deployment)  
8. [Usage Instructions](#8-usage-instructions)  
9. [Customization](#9-customization)  
10. [Known Limitations](#10-known-limitations)  
11. [Contributing](#11-contributing)  
12. [License](#12-license)  
13. [Contact](#13-contact)

---

## 1. Project Goal

Many production tracking systems assume a significant degree of computer fluency, leaving non-technical workers struggling with advanced software. This project was born to **bridge that gap** by:

- **Reducing Complexity**: An intuitive web interface where orders can simply be dragged between stages, eliminating the need for complicated menus.  
- **Enhancing Visibility**: Workers see clear, color-coded cues for deadlines, and icons that represent different item types or processes.  
- **Ensuring Accessibility**: By hosting through Google Apps Script, the system is browser-based, removing installation hurdles and simplifying updates.

Ultimately, this system aims to **democratize** production tracking, enabling team members at every skill level to collaborate effectively and reduce bottlenecks on the factory floor.

---

## 2. Overview

The Factory Production Tracking System integrates tightly with Google Sheets, acting as both a **database** (for storing order details) and a **real-time data source** (automatically updating the web interface). Users can:

- Visualize orders and move them through custom production stages.  
- Search for specific items or view large sets of orders, emphasizing those with urgent deadlines.  
- Print out status reports for review, meetings, or archival purposes.

This design is flexible and can be easily adapted to various production workflows, making it suitable for small-scale factories, specialized workshops, or larger operations seeking a lightweight tracking solution.

---

## 3. Features

1. **Drag-and-Drop Interface**  
   - Allows direct manipulation of orders across stages or sub-stages.  
   - Instant status updates are written back to Google Sheets.

2. **Visual Alerts**  
   - Color-coded date bubbles to indicate urgency or upcoming deadlines.  
   - Descriptive icons (e.g., doors, kitchen items) to help workers quickly identify order types.

3. **Search & Filter**  
   - Users can type a keyword or order number in a search bar.  
   - Matching items become highlighted; others become dimmed for clarity.

4. **Dynamic Stage Management**  
   - Reads main stages and sub-stages from a dedicated sheet (`Stages`) to accommodate changes with minimal code edits.

5. **Automated Reporting**  
   - Generates a printable table of production status and dates, useful for daily or weekly progress reviews.

---

## 4. Technology Stack

- **Google Apps Script (Server-Side Logic)**  
  - The script orchestrates data retrieval, updates, and the generation of the web interface.  
- **HTML, CSS, JavaScript (Frontend)**  
  - Served through Google Apps Script’s `HtmlService`, providing a familiar and straightforward environment for end-users.  
- **Google Sheets**  
  - Holds order data, production stages, and sub-stage definitions.  
  - Serves as the real-time backend database.

---

## 5. Prerequisites

1. **Google Account**  
   - Required to create and manage the Google Sheet and the Apps Script project.  
2. **Familiarity with Google Sheets**  
   - Basic knowledge of tabular data entry and sharing permissions.  
3. **Correctly Structured Spreadsheet**  
   - Columns for key data such as Work Order, Purchase Order, Description, Date Received, Delivery Date, etc.  
4. **Appropriate Permissions**  
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

1. **Create/Copy the Spreadsheet**  
   - Either import an existing template or replicate the structure provided.  
2. **Open Apps Script**  
   - In the Google Sheets interface, go to **Extensions > Apps Script**.  
   - Insert the `.gs` files (server-side) and the HTML, CSS, and JavaScript code.  
3. **Configure Constants**  
   - In your script, replace placeholder values like `SPREADSHEET_ID` with your actual spreadsheet ID.  
   - Adjust column indices if your sheet layout differs from the default assumption.  
4. **Deploy**  
   - From the Apps Script editor, click **Deploy > New deployment**.  
   - Choose **Web app**, set appropriate access rights, then copy the deployment URL for end-user access.  
5. **Test the App**  
   - Open the deployment link, confirm that the production orders load correctly, and check that dragging any item updates the Google Sheet.

---

## 8. Usage Instructions

1. **Access the Web Link**  
   - Share the deployment URL with factory team members, or place it on a shared workstation.  
2. **Order Manipulation**  
   - Each production stage is displayed in a separate box.  
   - Drag an order to a new stage to reflect its progress. The system automatically updates the spreadsheet.  
3. **Search Bar**  
   - Enter a PO number, WO number, or keyword from the description. Items that match are highlighted; all others appear dimmed.  
4. **Reporting**  
   - Use the **Print** button to open a printable page summarizing relevant orders, which can then be printed or saved.

---

## 9. Customization

- **Stages and Sub-Stages**  
  - Modify rows in the `Stages` sheet to introduce new phases or rename existing ones.  
- **Icons**  
  - Extend the `getIconForDescription()` function to display additional emojis or icons.  
- **Date Thresholds**  
  - Adjust color-coding (e.g., red for items within 3 days of the deadline, yellow for within 14 days, etc.) in the script to match your workflow.  
- **Data Columns**  
  - If new columns are added to the main sheet, update the associated indexing in the script.

---

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
- 
Should you encounter any issues or have suggestions for improvement, please open a GitHub issue or contact us directly.

---

### *Final Notes*

This system was specifically designed with **ease of use** in mind, ensuring that **all workers—regardless of technical skill—can successfully track and update production orders** in a timely manner. By incorporating drag-and-drop capabilities, color-coded deadlines, and quick search functions, the platform aims to **reduce bottlenecks, minimize errors, and improve overall operational efficiency** on the factory floor.
