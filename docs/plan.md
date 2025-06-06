# Vue Shopping List App with Google Sheets Backend - Implementation Plan

## ✅ Phase 1: Setup & Planning

### Task 1.1: Project Initialization
- Scaffold a Vue 3 app using Vite or Vue CLI.
- Install dependencies: `vue-router`, `pinia`, `axios`, `googleapis` (if needed in backend).
- Set up basic folder structure:
  - `components/`
  - `views/`
  - `store/`
  - `services/`
  - `utils/`

### Task 1.2: Google Sheets Setup
- Create a Google Sheet with sections like `Fruits`, `Dairy`, etc.
- Format: Columns for `Category`, `Item`, `Bought`, `Date`.
- Share the sheet and get the Sheet ID.
- Enable Google Sheets API from Google Cloud Console.

---

## ✅ Phase 2: Authentication

### Task 2.1: Set up Google Identity Services (GIS)
- Configure OAuth consent screen and get a **Client ID**.
- Integrate Google Sign-In in Vue (frontend) using GIS JavaScript SDK.
- Allow `https://www.googleapis.com/auth/spreadsheets` scope.

### Task 2.2: Manage Sign-In State
- Store user info and auth token (access token) using Pinia or localStorage.
- Show Sign-In/Sign-Out buttons conditionally.

---

## ✅ Phase 3: Google Sheets Integration (Backend or Client)

### Option A: Using Google Sheets directly from frontend (client-side)
- Use `gapi.client.sheets.spreadsheets.*` endpoints.
- Ensure CORS is handled properly (may have limitations).

### Option B: Using backend proxy (recommended for scalability)
- Create a simple Node.js/Express backend:
  - Auth using OAuth2 or Service Account.
  - Create API routes:
    - `GET /list` – fetch items
    - `POST /update` – mark item bought/missing
    - `POST /add` – add new item
- Secure backend with token verification.

---

## ✅ Phase 4: UI Development in Vue

### Task 4.1: Build Base Components
- `ListSection.vue` – renders grouped items (e.g. Fruits).
- `ShoppingItem.vue` – shows item with checkbox.
- `FilterBar.vue` – handles All / Only Missing / Only Bought.
- `SearchBar.vue`
- `FloatingButton.vue`

### Task 4.2: View & State Logic
- `HomeView.vue`:
  - Fetch data from Sheets on mount.
  - Apply filters based on button selection.
  - Use Pinia to manage global state (items, filters, auth).

### Task 4.3: Item Interaction
- Toggle checkboxes → update "Bought" state → update Google Sheet.
- Update counts dynamically (e.g., `2/5` in Fruits).

### Task 4.4: Add New Item
- Handle FAB button press → show modal → add item to correct category and update sheet.

---

## ✅ Phase 5: Extra Features (Post-MVP)

### Task 5.1: Add History Tab
- Track dates and past shopping sessions.

### Task 5.2: Settings Tab
- Theme toggle, user info, sign-out.

### Task 5.3: Offline support (optional)
- Store latest list in localStorage and sync when online.

---

## ✅ Phase 6: Deployment

### Task 6.1: Frontend
- Deploy on Vercel, Netlify, or Firebase Hosting.

### Task 6.2: Backend (if used)
- Deploy backend on Render, Railway, or Google Cloud Run.
- Secure API with auth middleware.

---

Would you like a sample Google Sheet template or code snippets next?