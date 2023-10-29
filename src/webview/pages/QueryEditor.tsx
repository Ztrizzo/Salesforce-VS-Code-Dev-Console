import * as React from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';

export interface QueryEditorProps {
}

export const QueryEditor: React.FunctionComponent<QueryEditorProps> = ({  }) => {
  const [query, setQuery] = React.useState('');
  const [queryResult, setQueryResult] = React.useState('');

  const handleQueryChange = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event :React.MouseEvent<HTMLButtonElement>) => {
    const queryResult = await messageHandler.request<string>('QUERY');

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

      <div style={{padding: '30px'}}>
        {queryResult}
      </div>
    </section>
  );
};
