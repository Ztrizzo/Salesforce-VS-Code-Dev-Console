import * as React from 'react';
import { ChangeEventHandler } from 'react';

const inputBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--vscode-input-background');

const styles = {
  backgroundColor: inputBackgroundColor,
  color: 'white',
  fontSize: '16px',
  borderRadius: '5px',
  padding: '10px',
  fontFamily: "Monaco, 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace"
}

export interface TextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea: React.FunctionComponent<TextAreaProps> = ({ value, onChange }) => {
  return (
    <textarea
      style={styles}
      value={value}
      onChange={onChange} 
    ></textarea>
  );
};
