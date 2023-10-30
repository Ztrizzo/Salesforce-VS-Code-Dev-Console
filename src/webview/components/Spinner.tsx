import * as React from 'react';
import { CSSProperties } from 'react';

export interface SpinnerProps {
}

const styles: CSSProperties = {
  position: "fixed",
  backgroundColor: "#ffffffa1",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1
};

export const Spinner: React.FunctionComponent<SpinnerProps> = ({ }) => {
  return (
    <div style={styles}>
      <div className="loader"></div>
    </div>
  );
};
