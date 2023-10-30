import * as React from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import 'react-data-grid/lib/styles.css';
import { QueryGrid } from '../components/QueryGrid';

export interface QueryEditorProps {
  targetOrg :string
}
  
export const QueryEditor: React.FunctionComponent<QueryEditorProps> = ({ targetOrg }) => {
  const [query, setQuery] = React.useState('SELECT Id, Name FROM Contact');
  const [queryCsvResult, setQueryCsvResult] = React.useState<string>('');

  const handleQueryChange = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event :React.MouseEvent<HTMLButtonElement>) => {
    const queryResult = await messageHandler.request<string>('QUERY', {
      targetOrg: targetOrg,
      query: query
    });
    setQueryCsvResult(queryResult);
  };

  return (
    <section className="page-container">
      <h1>Enter SOQL Query</h1>
      <textarea
        value={query}
        onChange={handleQueryChange}
      ></textarea>

      <button
        onClick={handleSubmit}
      >Execute</button>
      <h1>Query Result</h1>
      <QueryGrid csvString={queryCsvResult}/>
    </section>
  );
};
