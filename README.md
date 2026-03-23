# VectorShift Pipeline Builder

A visual AI pipeline builder built as part of the VectorShift frontend technical assessment. Drag, connect, and configure nodes on an interactive canvas, then validate the pipeline structure against a FastAPI backend.

## Tech Stack

- **Frontend:** React, ReactFlow, Zustand
- **Backend:** FastAPI, Python, Pydantic
- **Styling:** Plain CSS + inline styles (no UI library)

## Features

### Part 1 — Node Abstraction
- `BaseNode` component centralises all card layout, handle placement, and styling — individual nodes declare only their own fields
- Handles are auto-spaced vertically using an even-distribution formula
- **9 node types:** Input, Output, LLM, Text, Filter, Prompt, Math, Note, API

### Part 2 — Dark Theme UI
- Full-screen dark canvas (`#0f1117`) with dot-grid background
- Fixed toolbar with logo and colour-coded draggable node chips
- Fixed submit bar with gradient button
- Node cards have coloured header bars matching their toolbar chip colour

### Part 3 — Text Node Enhancements
- **Auto-resize:** node width and height grow as you type, using a hidden mirror div to measure true text dimensions (min 200px wide, max 500px)
- **Dynamic variable handles:** typing `{{variableName}}` inside the text area sprouts a live input handle on the left side of the node; duplicate names show only one handle

### Part 4 — Backend Integration
- `POST /pipelines/parse` accepts the node and edge lists from the canvas
- Returns node count, edge count, and whether the pipeline is a DAG
- DAG check uses iterative DFS with three node states (unvisited → in-progress → done) to detect back-edges
- Results displayed in a styled in-app modal (not a browser alert)

## Running the Project

**Backend**
```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
# Runs on http://localhost:8000
```

**Frontend**
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

## How to Use

1. Drag nodes from the toolbar onto the canvas.
2. Connect node handles by clicking and dragging between them.
3. Edit node fields (names, prompts, filter types, etc.) directly on the card.
4. Click **Run Pipeline** to send the graph to the backend and see the analysis — node count, edge count, and DAG status.
