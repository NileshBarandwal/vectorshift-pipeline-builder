// FilterNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');

  const handleChange = (e) => {
    setFilterType(e.target.value);
    updateNodeField(id, 'filterType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Filter"
      headerColor="#0ea5e9"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <label style={labelStyle}>
        Filter Type
        <select style={inputStyle} value={filterType} onChange={handleChange}>
          <option value="contains">Contains</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
        </select>
      </label>
    </BaseNode>
  );
};

const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 11, color: '#475569', gap: 2 };
const inputStyle = { fontSize: 12, padding: '3px 6px', borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc' };
