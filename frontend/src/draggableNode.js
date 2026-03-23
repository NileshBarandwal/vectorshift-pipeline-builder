// draggableNode.js — pill-shaped draggable chip for the toolbar

import { useState } from 'react';

export const DraggableNode = ({ type, label, color = '#4a5568' }) => {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    setDragging(true);
  };

  const onDragEnd = () => setDragging(false);

  return (
    <div
      className={type}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={chipStyle(color, hovered, dragging)}
    >
      <span style={chipTextStyle}>{label}</span>
    </div>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const chipStyle = (color, hovered, dragging) => ({
  cursor: dragging ? 'grabbing' : 'grab',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 14px',
  borderRadius: 999,           // pill shape
  background: hovered
    ? color                    // solid on hover
    : `${color}26`,            // 15% opacity at rest (hex alpha)
  border: `1px solid ${color}66`,
  color: hovered ? '#ffffff' : color,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.02em',
  userSelect: 'none',
  transition: 'background 0.15s ease, color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease',
  transform: hovered && !dragging ? 'translateY(-1px)' : 'none',
  boxShadow: hovered ? `0 4px 12px ${color}55` : 'none',
  whiteSpace: 'nowrap',
});

const chipTextStyle = {
  pointerEvents: 'none', // prevent text from interfering with drag
};
