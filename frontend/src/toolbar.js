// toolbar.js — fixed top bar with logo and draggable node chips

import { DraggableNode } from './draggableNode';
import { TOOLBAR_HEIGHT } from './App';

// Each entry maps a node type to its display label and the same
// headerColor used in BaseNode, so chips visually match the node cards.
const NODE_CATALOG = [
  { type: 'customInput',  label: 'Input',   color: '#6366f1' },
  { type: 'llm',          label: 'LLM',     color: '#8b5cf6' },
  { type: 'customOutput', label: 'Output',  color: '#ec4899' },
  { type: 'text',         label: 'Text',    color: '#f59e0b' },
  { type: 'filter',       label: 'Filter',  color: '#0ea5e9' },
  { type: 'prompt',       label: 'Prompt',  color: '#14b8a6' },
  { type: 'math',         label: 'Math',    color: '#f97316' },
  { type: 'note',         label: 'Note',    color: '#a3a3a3' },
  { type: 'api',          label: 'API',     color: '#06b6d4' },
];

export const PipelineToolbar = () => {
  return (
    <div style={{ ...toolbarStyle, height: TOOLBAR_HEIGHT }}>
      {/* Branding */}
      <div style={logoStyle}>
        <span style={logoAccent}>Vector</span>
        <span style={logoMain}>Shift</span>
      </div>

      {/* Divider */}
      <div style={dividerStyle} />

      {/* Node chips */}
      <div style={chipsWrapperStyle}>
        {NODE_CATALOG.map(({ type, label, color }) => (
          <DraggableNode key={type} type={type} label={label} color={color} />
        ))}
      </div>
    </div>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const toolbarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  gap: 16,
  background: '#1e2130',
  borderBottom: '1px solid #2d3650',
  boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  userSelect: 'none',
};

const logoAccent = { color: '#6366f1' };
const logoMain   = { color: '#f1f5f9' };

const dividerStyle = {
  width: 1,
  height: 32,
  background: '#2d3650',
  flexShrink: 0,
};

const chipsWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  alignItems: 'center',
  flex: 1,
};
