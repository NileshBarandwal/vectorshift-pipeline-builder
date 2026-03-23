// BaseNode.js
// Reusable wrapper for all pipeline nodes. Handles consistent layout,
// styling, and ReactFlow Handle placement so individual nodes only
// need to declare their own fields.

import { Handle, Position } from 'reactflow';

/**
 * Compute evenly-spaced percentage positions for N handles on one side.
 * With N=1 we want 50%, with N=2 we want 33% and 67%, etc.
 * Formula: position[i] = (i + 1) / (N + 1) * 100
 */
const getHandlePosition = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

/**
 * BaseNode
 *
 * Props:
 *   id        – ReactFlow node id (used to build unique handle ids)
 *   label     – text shown in the header bar
 *   headerColor – optional CSS color for the header bar (defaults to #4a5568)
 *   inputs    – array of { id: string, label?: string, style?: object }
 *   outputs   – array of { id: string, label?: string, style?: object }
 *   children  – body content rendered below the header
 *   style     – optional overrides for the outer card div
 */
export const BaseNode = ({
  id,
  label,
  headerColor = '#4a5568',
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {
  return (
    <div style={{ ...baseCardStyle, ...style }}>
      {/* Input handles – rendered on the left side */}
      {inputs.map((handle, index) => (
        <div key={handle.id}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={{
              top: getHandlePosition(index, inputs.length),
              background: '#3b82f6', // blue for inputs
              width: 10,
              height: 10,
              border: '2px solid #1d4ed8',
              ...handle.style,
            }}
          />
          {/* Optional label next to the handle */}
          {handle.label && (
            <span
              style={{
                position: 'absolute',
                left: 14,
                top: getHandlePosition(index, inputs.length),
                transform: 'translateY(-50%)',
                fontSize: 10,
                color: '#64748b',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}

      {/* Output handles – rendered on the right side */}
      {outputs.map((handle, index) => (
        <div key={handle.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            style={{
              top: getHandlePosition(index, outputs.length),
              background: '#10b981', // green for outputs
              width: 10,
              height: 10,
              border: '2px solid #059669',
              ...handle.style,
            }}
          />
          {handle.label && (
            <span
              style={{
                position: 'absolute',
                right: 14,
                top: getHandlePosition(index, outputs.length),
                transform: 'translateY(-50%)',
                fontSize: 10,
                color: '#64748b',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}

      {/* Header bar */}
      <div style={{ ...headerStyle, background: headerColor }}>
        <span style={headerTextStyle}>{label}</span>
      </div>

      {/* Body */}
      <div style={bodyStyle}>{children}</div>
    </div>
  );
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const baseCardStyle = {
  minWidth: 200,
  borderRadius: 10,
  boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
  border: '1px solid #e2e8f0',
  background: '#ffffff',
  fontFamily: 'Inter, system-ui, sans-serif',
  overflow: 'hidden',
  position: 'relative',
};

const headerStyle = {
  padding: '7px 12px',
  display: 'flex',
  alignItems: 'center',
};

const headerTextStyle = {
  color: '#ffffff',
  fontWeight: 600,
  fontSize: 13,
  letterSpacing: '0.02em',
};

const bodyStyle = {
  padding: '10px 12px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
};
