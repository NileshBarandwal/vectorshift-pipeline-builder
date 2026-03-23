// submit.js — fixed bottom bar, pipeline submit, and results modal

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { SUBMIT_BAR_HEIGHT } from './App';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const [hovering,  setHovering]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [modal,     setModal]     = useState(null); // null | { result } | { error }

  const handleSubmit = async () => {
    setLoading(true);
    setModal(null);
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      setModal({ result: data });
    } catch (err) {
      setModal({ error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Fixed bottom bar ──────────────────────────────────────────────── */}
      <div style={{ ...barStyle, height: SUBMIT_BAR_HEIGHT }}>
        <button
          type="button"
          disabled={loading}
          style={btnStyle(hovering, loading)}
          onClick={handleSubmit}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {loading ? 'Analysing…' : 'Run Pipeline'}
        </button>
      </div>

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      {modal && (
        <div style={overlayStyle} onClick={() => setModal(null)}>
          {/* stopPropagation prevents clicking inside the card from closing it */}
          <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
            {modal.error ? (
              <ErrorContent />
            ) : (
              <ResultContent result={modal.result} />
            )}
            <button style={closeBtnStyle} onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const ResultContent = ({ result }) => (
  <>
    <h2 style={modalTitleStyle}>Pipeline Analysis</h2>
    <div style={rowsStyle}>
      <StatRow label="Nodes" value={result.num_nodes} />
      <StatRow label="Edges" value={result.num_edges} />
      <StatRow
        label="Is DAG"
        value={result.is_dag ? '✅ Yes' : '❌ No'}
      />
    </div>
  </>
);

const ErrorContent = () => (
  <>
    <h2 style={{ ...modalTitleStyle, color: '#f87171' }}>Error</h2>
    <p style={errorTextStyle}>
      Failed to analyse pipeline. Is the backend running?
    </p>
  </>
);

const StatRow = ({ label, value }) => (
  <div style={statRowStyle}>
    <span style={statLabelStyle}>{label}</span>
    <span style={statValueStyle}>{value}</span>
  </div>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const barStyle = {
  position:   'fixed',
  bottom:     0,
  left:       0,
  right:      0,
  zIndex:     100,
  display:    'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1e2130',
  borderTop:  '1px solid #2d3650',
  boxShadow:  '0 -2px 12px rgba(0,0,0,0.4)',
};

const btnStyle = (hovered, loading) => ({
  padding:    '10px 32px',
  borderRadius: 999,
  border:     'none',
  cursor:     loading ? 'not-allowed' : 'pointer',
  fontSize:   14,
  fontWeight: 600,
  letterSpacing: '0.03em',
  color:      '#ffffff',
  opacity:    loading ? 0.65 : 1,
  background: hovered && !loading
    ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  boxShadow: hovered && !loading
    ? '0 6px 20px rgba(99,102,241,0.55)'
    : '0 3px 10px rgba(99,102,241,0.35)',
  transform:  hovered && !loading ? 'scale(1.04)' : 'scale(1)',
  transition: 'background 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease, opacity 0.15s ease',
  fontFamily: 'inherit',
});

const overlayStyle = {
  position:   'fixed',
  inset:      0,
  zIndex:     200,
  display:    'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.65)',
  backdropFilter: 'blur(4px)',
};

const cardStyle = {
  background:   '#1e2130',
  border:       '1px solid #334155',
  borderRadius: 16,
  padding:      '32px 36px',
  minWidth:     300,
  boxShadow:    '0 24px 60px rgba(0,0,0,0.6)',
  display:      'flex',
  flexDirection: 'column',
  gap:          20,
  fontFamily:   'Inter, system-ui, sans-serif',
};

const modalTitleStyle = {
  margin:     0,
  fontSize:   18,
  fontWeight: 700,
  color:      '#f1f5f9',
  letterSpacing: '-0.01em',
};

const rowsStyle = {
  display:       'flex',
  flexDirection: 'column',
  gap:           10,
};

const statRowStyle = {
  display:        'flex',
  justifyContent: 'space-between',
  alignItems:     'center',
  padding:        '8px 12px',
  background:     '#0f1117',
  borderRadius:   8,
  border:         '1px solid #2d3650',
};

const statLabelStyle = {
  fontSize:   13,
  color:      '#94a3b8',
  fontWeight: 500,
};

const statValueStyle = {
  fontSize:   14,
  color:      '#f1f5f9',
  fontWeight: 700,
};

const errorTextStyle = {
  fontSize: 13,
  color:    '#94a3b8',
  margin:   0,
  lineHeight: 1.6,
};

const closeBtnStyle = {
  alignSelf:    'flex-end',
  padding:      '8px 22px',
  borderRadius: 999,
  border:       '1px solid #334155',
  background:   'transparent',
  color:        '#94a3b8',
  fontSize:     13,
  fontWeight:   600,
  cursor:       'pointer',
  fontFamily:   'inherit',
  transition:   'border-color 0.15s, color 0.15s',
};
