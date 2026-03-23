// inputNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Input"
      headerColor="#6366f1"
      inputs={[]}
      outputs={[{ id: 'value' }]}
    >
      <label style={labelStyle}>
        Name
        <input style={inputStyle} type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label style={labelStyle}>
        Type
        <select style={inputStyle} value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};

const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 11, color: '#475569', gap: 2 };
const inputStyle = { fontSize: 12, padding: '3px 6px', borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc' };
