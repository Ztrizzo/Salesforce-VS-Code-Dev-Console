import * as React from 'react';

export interface TabProps {
  children: React.ReactNode;
  label: string;
}

export const Tab: React.FunctionComponent<TabProps> = ({ children }) => {
  return (
    <>{children}</>
  );
};
