// ApiNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [endpoint, setEndpoint] = useState(data?.endpoint || '');

  const handleChange = (e) => {
    setEndpoint(e.target.value);
    updateNodeField(id, 'endpoint', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="API"
      headerColor="#06b6d4"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <label style={labelStyle}>
        Endpoint URL
        <input
          style={inputStyle}
          type="text"
          value={endpoint}
          onChange={handleChange}
          placeholder="https://api.example.com/..."
        />
      </label>
    </BaseNode>
  );
};

const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 11, color: '#475569', gap: 2 };
const inputStyle = { fontSize: 12, padding: '3px 6px', borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc', width: '100%', boxSizing: 'border-box' };
