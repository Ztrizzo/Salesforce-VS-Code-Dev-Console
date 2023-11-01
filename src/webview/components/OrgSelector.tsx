import * as React from 'react';
import Select from 'react-select';
import { ActionMeta } from 'react-select';
import { PropsValue } from 'react-select';

const inputBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--vscode-input-background');
const focusedColor = '#00427c';

export interface IOrg {
  orgId: string;
  username: string;
  alias: string;
}

export interface IAppProps {
  orgList :IOrg[];
  handleTargetOrgChange :Function 
}

interface Option {
  value?: string;
  label?: string;
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: inputBackgroundColor,
    color: 'white',
  }),
  menu: (base: any, state: any) => ({
    ...base,
    color: 'white',
    background: inputBackgroundColor,
  }),
  menuList: (base: any, state: any) => ({
    ...base,
    background: inputBackgroundColor,
    color: 'white'
  }),
  singleValue: (base: any, state: any) => ({
    ...base,
    color: 'white'
  }),
  option: (base: any, state: any) => {
    if(state.isSelected || state.isFocused || state.isClicked){
      return {
        ...base,
        backgroundColor: focusedColor
      };
    }
    return { 
      ...base,
      '&:hover': {
        backgroundColor: focusedColor
      }
    };
  }
};

export const OrgSelector: React.FunctionComponent<IAppProps> = ({ orgList, handleTargetOrgChange } :IAppProps) => {
  const [currentOrg, setCurrentOrg] = React.useState<PropsValue<Option>>();

  const handleChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {

    setCurrentOrg(option);
    handleTargetOrgChange(option?.value);
  };

  const buildUsername = ( username: string, alias?: string ): string => {
    if(!alias || alias === 'undefined'){
      return username;
    }
    return `${alias} (${username})`;
  };

  const options = orgList.map((org, index) => {
    return {
      value: org.username,
      label: buildUsername(org.username, org.alias)
    };
  });
  return (
    <>
      <section className="select">
        <Select
          styles={customStyles}
          options={options}
          onChange={handleChange}
          value={currentOrg}
          placeholder="Please Select a Target Org..."
        ></Select>
      </section>
    </>
  );
};
