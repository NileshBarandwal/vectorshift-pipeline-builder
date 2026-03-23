// outputNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Output"
      headerColor="#ec4899"
      inputs={[{ id: 'value' }]}
      outputs={[]}
    >
      <label style={labelStyle}>
        Name
        <input style={inputStyle} type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label style={labelStyle}>
        Type
        <select style={inputStyle} value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};

const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 11, color: '#475569', gap: 2 };
const inputStyle = { fontSize: 12, padding: '3px 6px', borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc' };
