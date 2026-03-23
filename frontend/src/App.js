// App.js — root layout: toolbar (fixed top) → canvas (flex-fill) → submit bar (fixed bottom)

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

// Toolbar and submit bar heights — defined once here so canvas can use them
export const TOOLBAR_HEIGHT = 64;   // px
export const SUBMIT_BAR_HEIGHT = 64; // px

function App() {
  return (
    <div style={appStyle}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  background: '#0f1117',
  overflow: 'hidden',
};

export default App;
