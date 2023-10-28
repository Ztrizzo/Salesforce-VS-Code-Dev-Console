import * as React from 'react';

export interface IOrg {
  orgId: string;
  username: string;
}

export interface IAppProps {
  orgList: IOrg[];
}

export const OrgSelector: React.FunctionComponent<IAppProps> = ({ orgList }) => {
  return (
    <>
      <select>
        {orgList.map((org) => (
          <option key={org.orgId} value={org.orgId}>{org.username}</option>
        ))}
      </select>
    </>
  );
};
