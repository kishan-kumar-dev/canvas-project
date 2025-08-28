
```markdown
# Canvas Project - Full Stack Starter

This project includes a **frontend** (React + TypeScript + Konva + React Flow) and a **backend** (Node.js + Express) to create a canvas editor and flow editor with persistent storage support.

---

## Project Structure

```

canvas-project/
├─ frontend/
│   ├─ src/
│   │   └─ components/
│   ├─ package.json
│   └─ vite.config.ts
├─ backend/
│   ├─ server.js
│   └─ package.json
├─ .gitignore
└─ README.md

````

---

## Getting Started (Step-by-Step)

### 1️⃣ Download & Extract
Download the project zip and extract to a folder, e.g., `canvas-project`.

---

### 2️⃣ Install Node.js
- Install Node.js LTS from [https://nodejs.org](https://nodejs.org).  
- Verify installation:

```bash
node -v
npm -v
````

---

### 3️⃣ Start Backend (Optional)

Open a terminal:

```bash
cd canvas-project/backend
npm install
npm start
```

* Runs on `http://localhost:4000`
* Endpoints:

  * `GET /shapes` → fetch shapes
  * `POST /shapes` → save shapes

---

### 4️⃣ Start Frontend

Open another terminal:

```bash
cd canvas-project/frontend
npm install
npm run dev
```

* Dev server: `http://localhost:5173`
* Frontend works with mock API or real backend.

---

### 5️⃣ Connect Frontend to Backend

* Create `.env` in `frontend/`:

```
VITE_API_BASE=http://localhost:4000
```

* Restart frontend server.
* Load/Save buttons now use backend.

---

### 6️⃣ Run Tests

```bash
npm test
```

* Runs Vitest for frontend.

---

### 7️⃣ Build for Production

```bash
npm run build
npm run preview
```

* Creates production build and local preview server.

---

## Deployment

### Frontend (Vercel)

* Import GitHub repo → select `frontend/` folder
* Build & deploy
* Set environment variable `VITE_API_BASE` → backend URL

### Backend (Render)

* Import GitHub repo → Root Directory = `backend`
* Build: `npm install`
* Start: `npm start`
* Render provides live URL → update `VITE_API_BASE` in frontend

---

## Troubleshooting

* **npm install fails** → delete `node_modules` & `package-lock.json` → `npm install`
* **Port in use** → change port in `vite.config.ts` or `server.js`
* **CORS errors** → backend includes CORS middleware
* **Node version issues** → use LTS version or `nvm`

---

## Learn by Editing

* `frontend/src/components/CanvasEditor.tsx` → Canvas behavior
* `frontend/src/components/FlowEditor.tsx` → Flow editor
* `frontend/src/lib/api.ts` → API calls
* `backend/server.js` → API endpoints and storage logic

---

## Tips

* Select shape → press **Delete** to remove
* Scroll → zoom canvas
* Drag → move canvas or shapes
* Shapes persist in backend (if deployed) or localStorage (mock API)

---

