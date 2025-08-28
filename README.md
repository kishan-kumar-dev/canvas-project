
# Canvas Starter - Beginner Step-by-Step Guide

This archive contains a **frontend** (React + TypeScript + Konva + React Flow) and a tiny **backend** (Node.js + Express) for testing API integration.

## What you'll find
- `package.json` (frontend)
- `src/` - frontend source code
- `backend/` - small sample Express server with `/shapes` endpoints
- `README.md` (this file)

---

## Step-by-step: Getting started (zero knowledge)

### 1) Download & extract ZIP
Download the zip and extract to a folder, e.g. `canvas-starter-full`.

### 2) Install Node.js (required)
- Go to https://nodejs.org and install the **LTS** version (recommended: 18.x or 20.x).
- After install, open terminal / Command Prompt and run:
  ```bash
  node -v
  npm -v
  ```
  You should see versions printed.

### 3) Start the backend (optional but recommended for full integration)
Open a terminal, navigate to the backend folder and start the server:
```bash
cd canvas-starter-full/backend
npm install
npm start
```
This runs a server on `http://localhost:4000` with endpoints `GET /shapes` and `POST /shapes`.

### 4) Start the frontend
Open another terminal and run:
```bash
cd canvas-starter-full
npm install
npm run dev
```
Vite will start the dev server (default `http://localhost:5173`). Open that URL in your browser.

### 5) Connect frontend to backend (optional)
Create a file `.env` at the project root with:
```
VITE_API_BASE=http://localhost:4000
```
Restart the dev server if running. Now the Load/Save buttons will call your local backend.

### 6) Run tests
From the project root:
```bash
npm test
```
This runs the included Vitest tests.

### 7) Build for production (optional)
```bash
npm run build
npm run preview
```
This generates a production build and runs a local preview server.

---

## If something breaks (common fixes)
- **Dependency install fails**: delete `node_modules` and `package-lock.json`, then `npm install` again.
- **Port is in use**: change port in `vite.config.ts` or run `npm run dev -- --port 5174`.
- **CORS errors**: ensure the backend uses CORS (the sample backend includes it).
- **Node version issues**: install Node LTS (recommended) or use nvm to manage versions.

---

## Learn by editing
- `src/components/CanvasEditor.tsx` → canvas behavior, shapes, toolbar.
- `src/components/FlowEditor.tsx` → node/graph behavior.
- `src/lib/api.ts` → learn how frontend calls an API.

If you'd like, I can guide you live through each terminal command step-by-step or create a screencast. Tell me which OS you use (Windows / macOS / Linux) and I’ll give exact commands for your environment.
