import * as React from 'react';
import { Tab, TabProps } from './Tab';

interface TabSetProps {
  children: React.ReactNode;
}

export const Tabset: React.FunctionComponent<TabSetProps> = ({ children } :TabSetProps) => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const childrenArray = React.Children.toArray(children);

  const handleClick = (index :number) => {
    setSelectedTab(index);
  }

  return (
    <>
      <div className="tabset">
        {childrenArray.map((child, index) => {
          //Only elements with a label property should be sent to this component
          if(!React.isValidElement<{label: string}>(child)) { 
            throw new Error("Expected a component of type 'tab' to be sent to Tabset component");
          }
          return (
            <div 
              key={index}
              className={selectedTab === index ? 'selected' : ''}
              onClick={() => handleClick(index)}
              >
              {child.props.label}
            </div>
          )
        })}

      </div>
    
      {childrenArray[selectedTab]}
    </>
  );
};
