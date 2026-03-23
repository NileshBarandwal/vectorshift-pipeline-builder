// MathNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [operation, setOperation] = useState(data?.operation || '+');

  const handleChange = (e) => {
    setOperation(e.target.value);
    updateNodeField(id, 'operation', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Math"
      headerColor="#f97316"
      inputs={[
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
      ]}
      outputs={[{ id: 'result', label: 'result' }]}
    >
      <label style={labelStyle}>
        Operation
        <select style={inputStyle} value={operation} onChange={handleChange}>
          <option value="+">+ (Add)</option>
          <option value="-">− (Subtract)</option>
          <option value="*">× (Multiply)</option>
          <option value="/">÷ (Divide)</option>
        </select>
      </label>
    </BaseNode>
  );
};

const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 11, color: '#475569', gap: 2 };
const inputStyle = { fontSize: 12, padding: '3px 6px', borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc' };
