import * as React from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import 'react-data-grid/lib/styles.css';

let DataGrid :any;
import('react-data-grid').then(module => {
  DataGrid = module.default || module;
});

export interface QueryEditorProps {
}

interface Column {
  key: string;
  name: string;
}

interface Row {
  id: number;
  [key: string]: string | number;
}

interface ParsedCsv{
  rows: Row[];
  columns: Column[];
}

  
function parseCSV(csvString: string): any {
  // const testString = `Id,Name\n003Dn00000AYEQpIAP,Rose Gonzalez\n003Dn00000AYEQqIAP,Sean Forbes\n003Dn00000AYEQrIAP,Jack Rogers\n003Dn00000AYEQsIAP,Pat Stumuller\n003Dn00000AYEQtIAP,Andy Young\n003Dn00000AYEQuIAP,Tim Barr\n003Dn00000AYEQvIAP,John Bond\n003Dn00000AYEQwIAP,Stella Pavlova\n003Dn00000AYEQxIAP,Lauren Boyle\n003Dn00000AYEQyIAP,Josh Davis\n003Dn00000AYEQzIAP,Jane Grey\n003Dn00000AYER0IAP,Arthur Song\n003Dn00000AYER1IAP,Avi Green\n003Dn00000AYER2IAP,Babara Levy\n003Dn00000AYER3IAP,Ashley James\n003Dn00000AYER4IAP,Tom Ripley\n003Dn00000AYER5IAP,Liz D'Cruz\n003Dn00000AYER6IAP,Edna Frank\n003Dn00000AYER7IAP,Siddartha Nedaerk\n003Dn00000AYER8IAP,Jake Llorrac\n003Dn00000c5AKoIAM,test test\n`;
  let stringWithoutQuotes :string = csvString.replaceAll('"', '');
  stringWithoutQuotes = stringWithoutQuotes.replaceAll('\\n', '\n');

  const lines :string[] = stringWithoutQuotes.split('\n');

  if (lines.length === 0) return { columns: [], rows: [] };

  // Parse the headers to create the columns
  const headers = lines[0].split(',');
  const columns: Column[] = headers.map(headerName => ({ key: headerName, name: headerName }));
  console.log('LINES::::', lines);
  console.log('COLUMNS::::', columns);
  console.log('CSVSTRING::::', csvString);
  // Parse the remaining lines to create the rows
  const rows: Row[] = lines.slice(1).map((line, index) => {
    const values = line.split(',').map(value => value.trim());
    const row: Row = { id: index } as Row;
    headers.forEach((header, i) => {
      row[header] = values[i];
    });
    return row;
  });
  const result :ParsedCsv = { columns, rows };
  return result;
}

export const QueryEditor: React.FunctionComponent<QueryEditorProps> = ({  }) => {
  const [query, setQuery] = React.useState('SELECT Id, Name FROM Contact');
  const [queryResult, setQueryResult] = React.useState('');
  const [rows, setRows] = React.useState<Row[]>([]);
  const [columns, setColumns] = React.useState<Column[]>([]);

  const handleQueryChange = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event :React.MouseEvent<HTMLButtonElement>) => {
    const queryResult = await messageHandler.request<string>('QUERY', {
      targetOrg: 'devhub',
      query: query
    });
    setQueryResult(queryResult);
    const parsedCsv = parseCSV(queryResult);
    setRows(parsedCsv.rows);
    setColumns(parsedCsv.columns);
  };

  if(DataGrid === undefined) return null;

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

      <div style={{padding: '30px'}}>
        {JSON.stringify(columns)}
        {'ROWS' + JSON.stringify(rows)}
        {/* <DataGrid columns={columns} rows={rows}/> */}
      </div>

      <div style={{padding: '30px'}}>
        <DataGrid columns={columns} rows={rows}/>
      </div>
    </section>
  );
};
