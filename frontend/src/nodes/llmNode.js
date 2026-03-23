// llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      headerColor="#8b5cf6"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <span style={{ fontSize: 12, color: '#64748b' }}>
        Large Language Model node. Connect a system prompt and user prompt to generate a response.
      </span>
    </BaseNode>
  );
};
