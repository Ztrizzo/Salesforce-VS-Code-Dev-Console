import * as React from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import "./styles.css";
import { OrgSelector, IAppProps as orgSelectorProps, IOrg } from './components/orgSelector';
import { Tabset } from './components/Tabset';
import { Tab, TabProps } from './components/Tab';
import { QueryEditor } from './pages/QueryEditor';
import { Spinner } from './components/Spinner';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [orgList, setOrgList] = React.useState<IOrg[]>([]);
  const [targetOrg, setTargetOrg] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openingTargetOrg, setOpeningTargetOrg] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getCredentials = async () => {
      const credentials = await messageHandler.request<string>('GET_DATA');
      const orgs :IOrg[] = [];
      console.log(credentials);
      for (const org of JSON.parse(credentials)) {
        const orgInt :IOrg = {
          orgId: org.orgId,
          username: org.username,
          alias: org.alias
        };
        orgs.push(orgInt);
      }
      setOrgList(orgs);
      setTargetOrg(orgs[0].username)
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

  const openTargetOrg = async () => {
    try{

      setOpeningTargetOrg(true);

      messageHandler.request<string>('OPEN_ORG', {
        targetOrg
      });
      //Pause for 3 seconds;
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch(error: any){
      setError(error);
      console.error(error);
    } finally{
      setOpeningTargetOrg(false);
    }
  }

  return (
    <div className='app'>
      {loading ? <Spinner/> : null}
      <h1>Salesforce VS Code Dev Console</h1>
      <div className="org-selector-container">
        <OrgSelector 
          orgList={orgList}
          handleTargetOrgChange={handleTargetOrgChange} 
        />
        <button onClick={openTargetOrg} className={openingTargetOrg ? 'disabled' : ""}>
          {openingTargetOrg ? 'Opening' : "Open this Org"}
        </button>
      </div>
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