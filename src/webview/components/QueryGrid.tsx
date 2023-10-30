import * as React from 'react';
import 'react-data-grid/lib/styles.css';

let DataGrid :any;
import('react-data-grid').then(module => {
  DataGrid = module.default || module;
});


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

export interface QueryGridProps {
  csvString :string;
}

function parseCSV(csvString: string): any {
  let stringWithoutQuotes :string = csvString.replaceAll('"', '');
  stringWithoutQuotes = stringWithoutQuotes.replaceAll('\\n', '\n');

  const lines :string[] = stringWithoutQuotes.split('\n');

  if (lines.length === 0) return { columns: [], rows: [] };

  // Parse the headers to create the columns
  const headers = lines[0].split(',');
  const columns: Column[] = headers.map(headerName => ({ key: headerName, name: headerName }));

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

export const QueryGrid: React.FunctionComponent<QueryGridProps> = ({ csvString } :QueryGridProps) => {
  //Data grid is using dynamic import and may not be loaded
  if(DataGrid === undefined) return null;
  
  const parsedCsv = parseCSV(csvString);
  const rows :Row[] = parsedCsv.rows;
  const columns :Column[] = parsedCsv.columns;

  return (
    <>
      <DataGrid columns={columns} rows={rows}/>
    </>
  );
};
