// textNode.js
// Auto-resize + dynamic variable handles + store sync

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const MIN_WIDTH   = 200;
const MAX_WIDTH   = 500;
const MIN_HEIGHT  = 80;
const FONT_STYLE  = '12px Inter, system-ui, sans-serif';
const PADDING_H   = 12;
const PADDING_V   = 8;

const VAR_REGEX = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;

const extractVariables = (text) => {
  const seen = new Set();
  const vars = [];
  let match;
  VAR_REGEX.lastIndex = 0;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) { seen.add(name); vars.push(name); }
  }
  return vars;
};

const handleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [text, setText] = useState(data?.text || '{{input}}');
  const [textareaWidth,  setTextareaWidth]  = useState(MIN_WIDTH - PADDING_H);
  const [textareaHeight, setTextareaHeight] = useState(MIN_HEIGHT);
  const mirrorRef = useRef(null);
  const variables = extractVariables(text);

  const handleChange = (e) => {
    setText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  useEffect(() => {
    const mirror = mirrorRef.current;
    if (!mirror) return;
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    mirror.innerHTML = escaped.replace(/\n/g, '<br/>') + '<br/>';
    const naturalW = mirror.scrollWidth;
    const naturalH = mirror.scrollHeight;
    setTextareaWidth(Math.max(MIN_WIDTH - PADDING_H, Math.min(naturalW, MAX_WIDTH - PADDING_H)));
    setTextareaHeight(Math.max(MIN_HEIGHT, naturalH));
  }, [text]);

  const cardWidth = textareaWidth + PADDING_H + 24;

  return (
    <BaseNode
      id={id}
      label="Text"
      headerColor="#f59e0b"
      inputs={[]}
      outputs={[{ id: 'output' }]}
      style={{ width: cardWidth, minWidth: MIN_WIDTH }}
    >
      {variables.map((varName, index) => (
        <div key={varName}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{ top: handleTop(index, variables.length), background: '#3b82f6', width: 10, height: 10, border: '2px solid #1d4ed8' }}
          />
          <span style={{ position: 'absolute', left: 14, top: handleTop(index, variables.length), transform: 'translateY(-50%)', fontSize: 10, color: '#64748b', pointerEvents: 'none', whiteSpace: 'nowrap', fontFamily: 'Inter, system-ui, sans-serif' }}>
            {varName}
          </span>
        </div>
      ))}
      <textarea
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => e.stopPropagation()}
        style={{ ...textareaStyle, width: textareaWidth, height: textareaHeight }}
      />
      <div
        ref={mirrorRef}
        aria-hidden="true"
        style={{ ...mirrorStyle, font: FONT_STYLE, padding: `${PADDING_V / 2}px ${PADDING_H / 2}px`, maxWidth: MAX_WIDTH - PADDING_H }}
      />
    </BaseNode>
  );
};

const textareaStyle = { font: FONT_STYLE, padding: `${PADDING_V / 2}px ${PADDING_H / 2}px`, borderRadius: 5, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc', resize: 'none', overflow: 'hidden', display: 'block', boxSizing: 'border-box', lineHeight: 1.5 };
const mirrorStyle = { position: 'fixed', top: -9999, left: -9999, visibility: 'hidden', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.5, boxSizing: 'border-box', pointerEvents: 'none' };
