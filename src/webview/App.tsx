import * as React from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import "./styles.css";
import { OrgSelector, IAppProps as orgSelectorProps, IOrg } from './components/orgSelector';
import { Tabset } from './components/Tabset';
import { Tab, TabProps } from './components/Tab';
import { QueryEditor } from './pages/QueryEditor';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [orgList, setOrgList] = React.useState<IOrg[]>([]);
  const [targetOrg, setTargetOrg] = React.useState<string>("");

  React.useEffect(() => {
    const getCredentials = async () => {
      const credentials = await messageHandler.request<string>('GET_DATA');
      const orgs :IOrg[] = [];
      for (const org of JSON.parse(credentials)) {
        const orgInt :IOrg = {
          orgId: org.orgId,
          username: org.username
        };
        orgs.push(orgInt);
      }
      setOrgList(orgs);
    };
    getCredentials();
  }, []);

  // const sendMessage = () => {
  //   messageHandler.send('POST_DATA', { msg: 'Hello from the webview' });
  // };

  // const requestData = () => {
  //   messageHandler.request<string>('GET_DATA').then((msg) => {
  //     setMessage(msg);
  //   });
  // };

  // const requestWithErrorData = () => {
  //   messageHandler.request<string>('GET_DATA_ERROR')
  //   .then((msg) => {
  //     setMessage(msg);
  //   })
  //   .catch((err) => {
  //     setError(err);
  //   });
  // };

  const handleTargetOrgChange = (newTargetOrg :string) => {
    setTargetOrg(newTargetOrg);
  }

  return (
    <div className='app'>
      <h1>Salesforce VS Code Dev Console</h1>
      <OrgSelector 
        orgList={orgList}
        handleTargetOrgChange={handleTargetOrgChange} 
      />

      Current Selected Org: {targetOrg}

      <Tabset>
        <Tab label='Query'>
          <QueryEditor targetOrg={targetOrg}/>
        </Tab>
        <Tab label='Tab 2'>Contents of Tab 2</Tab>
        <Tab label='Tab 3'>Contents of Tab 3</Tab>
      </Tabset>

      {message && <p><strong>Message from the extension</strong>: {message}</p>}

      {error && <p className='app__error'><strong>ERROR</strong>: {error}</p>}
    </div>
  );
};