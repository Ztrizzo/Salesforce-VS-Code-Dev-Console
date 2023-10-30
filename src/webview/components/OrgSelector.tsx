import * as React from 'react';

export interface IOrg {
  orgId: string;
  username: string;
  alias: string;
}

export interface IAppProps {
  orgList :IOrg[];
  handleTargetOrgChange :Function 
}

export const OrgSelector: React.FunctionComponent<IAppProps> = ({ orgList, handleTargetOrgChange } :IAppProps) => {

  const handleChange = (event :React.ChangeEvent<HTMLSelectElement>) => {
    const newOrg = event.target.value;
    handleTargetOrgChange(newOrg);
  };

  const buildUsername = ( username: string, alias?: string ): string => {
    if(!alias || alias === 'undefined'){
      return username;
    }
    return `${alias} (${username})`;
  }

  return (
    <>
      <select onChange={(handleChange)}>
        {orgList.map((org, index) => (
          <option key={index} value={org.username}>{buildUsername(org.username, org.alias)}</option>
        ))}
      </select>
    </>
  );
};
