// PromptNode.js
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const PromptNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [prompt, setPrompt] = useState(data?.prompt || '');

  const handleChange = (e) => {
    setPrompt(e.target.value);
    updateNodeField(id, 'prompt', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Prompt"
      headerColor="#14b8a6"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <label style={labelStyle}>
        Prompt Template
        <textarea
          style={textareaStyle}
          value={prompt}
          onChange={handleChange}
          onKeyDown={(e) => e.stopPropagation()}
          placeholder="Enter prompt template..."
          rows={4}
        />
      </label>
    </BaseNode>
  );
};

const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 11, color: '#475569', gap: 2 };
const textareaStyle = { fontSize: 12, padding: '4px 6px', borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc', resize: 'none', fontFamily: 'inherit' };
