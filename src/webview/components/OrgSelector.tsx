import * as React from 'react';

export interface IOrg {
  orgId: string;
  username: string;
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

  return (
    <>
      <select onChange={(handleChange)}>
        {orgList.map((org, index) => (
          <option key={org.username + index} value={org.username}>{org.username}</option>
        ))}
      </select>
    </>
  );
};
