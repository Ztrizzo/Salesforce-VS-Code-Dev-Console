import * as React from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import 'react-data-grid/lib/styles.css';
import { QueryGrid } from '../components/QueryGrid';
import { Spinner } from '../components/Spinner';
import { TextArea } from '../components/TextArea';

export interface QueryEditorProps {
  targetOrg :string
}
  
export const QueryEditor: React.FunctionComponent<QueryEditorProps> = ({ targetOrg }) => {
  const [query, setQuery] = React.useState('SELECT Id, Name FROM Contact');
  const [queryCsvResult, setQueryCsvResult] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const handleQueryChange = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event :React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    let queryResult;
    try{
      queryResult = await messageHandler.request<string>('QUERY', {
        targetOrg: targetOrg,
        query: query
      });

      setQueryCsvResult(queryResult);
      setError(undefined);
    } catch(error :any){
      console.error(error);
      setError(error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <section className="page-container">
      {loading ? <Spinner/> : null}
      <h1>Enter SOQL Query</h1>
      <TextArea
        value={query}
        onChange={handleQueryChange}
      ></TextArea>
      <button
        style={{alignSelf: 'end'}}
        onClick={handleSubmit}
      >Execute</button>

      {
        error
        ? <div className="error-box">{error}</div>
        : null
      }

      <h1>Query Result</h1>
      <QueryGrid csvString={queryCsvResult}/>
    </section>
  );
};
