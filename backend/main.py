from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI()

# Allow the React dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# ── Request model ─────────────────────────────────────────────────────────────

class PipelinePayload(BaseModel):
    nodes: list[Any]
    edges: list[Any]


# ── DAG detection ─────────────────────────────────────────────────────────────

def is_dag(nodes: list, edges: list) -> bool:
    """
    Return True if the directed graph described by `nodes` and `edges` contains
    no cycles (i.e. it is a Directed Acyclic Graph).

    Algorithm: iterative DFS with three node states —
      UNVISITED  (0) — not yet reached
      IN_PROGRESS(1) — currently on the DFS stack (cycle if we visit this again)
      DONE       (2) — fully explored, safe to skip

    An iterative approach avoids Python's recursion limit on large graphs.
    """
    UNVISITED   = 0
    IN_PROGRESS = 1
    DONE        = 2

    # Build adjacency list: node_id → list of successor node_ids
    adjacency: dict[str, list[str]] = {}

    # Initialise every node with an empty neighbour list so that isolated
    # nodes (no edges) are still visited and correctly classified as acyclic.
    for node in nodes:
        node_id = node.get("id") if isinstance(node, dict) else str(node)
        adjacency[node_id] = []

    for edge in edges:
        src = edge.get("source") if isinstance(edge, dict) else None
        tgt = edge.get("target") if isinstance(edge, dict) else None
        if src is None or tgt is None:
            continue  # skip malformed edges
        if src not in adjacency:
            adjacency[src] = []
        adjacency[src].append(tgt)

    state: dict[str, int] = {node_id: UNVISITED for node_id in adjacency}

    for start in adjacency:
        if state[start] != UNVISITED:
            continue

        # Each stack frame is (node_id, iterator_over_its_neighbours)
        # When we first push a node we mark it IN_PROGRESS; when its iterator
        # is exhausted we mark it DONE and pop it.
        stack = [(start, iter(adjacency[start]))]
        state[start] = IN_PROGRESS

        while stack:
            node_id, neighbours = stack[-1]
            try:
                neighbour = next(neighbours)
                if state.get(neighbour, UNVISITED) == IN_PROGRESS:
                    # Back-edge found → cycle exists → not a DAG
                    return False
                if state.get(neighbour, UNVISITED) == UNVISITED:
                    state[neighbour] = IN_PROGRESS
                    stack.append((neighbour, iter(adjacency.get(neighbour, []))))
            except StopIteration:
                # All neighbours explored — node is fully processed
                state[node_id] = DONE
                stack.pop()

    return True


# ── Endpoint ──────────────────────────────────────────────────────────────────

@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag = is_dag(payload.nodes, payload.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}
