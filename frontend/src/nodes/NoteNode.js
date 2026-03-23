// NoteNode.js — utility node with no inputs or outputs
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [note, setNote] = useState(data?.note || '');

  const handleChange = (e) => {
    setNote(e.target.value);
    updateNodeField(id, 'note', e.target.value);
  };

  return (
    <BaseNode id={id} label="Note" headerColor="#a3a3a3" inputs={[]} outputs={[]}>
      <textarea
        style={textareaStyle}
        value={note}
        onChange={handleChange}
        onKeyDown={(e) => e.stopPropagation()}
        placeholder="Write a note..."
        rows={4}
      />
    </BaseNode>
  );
};

const textareaStyle = { fontSize: 12, padding: '4px 6px', borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#fffbeb', resize: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' };
