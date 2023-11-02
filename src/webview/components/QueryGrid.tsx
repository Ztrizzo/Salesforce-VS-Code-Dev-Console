import * as React from 'react';
import 'react-data-grid/lib/styles.css';
import { parse, ParseResult } from 'papaparse';

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

function parseCSV(csvString: any): any {
  const rows = csvString.result.records.map((record: any) => {
    delete record.attributes;
    for(const property in record){
      if(typeof record[property] === 'object'){
        record[property] = JSON.stringify(record[property]);
      }
    }
    return record;
  });

  const columns = Object.keys(rows[0]).map(property => {
    return {
      key: property,
      name: property
    }
  });

  return { columns, rows };

  // if(!parsedCSV.data?.length){
  //   return null;
  // }

  // // // Parse the headers to create the columns
  // const headers: any = parsedCSV.data[0];
  // const columns: Column[] = headers.map((headerName: string) => ({ key: headerName, name: headerName }));

  // // // Parse the remaining lines to create the rows
  // const rows: Row[] = parsedCSV.data.slice(1).map((line: any, index: any) => {
  //   const row: Row = { id: index } as Row;
  //   headers.forEach((header :any, i :any) => {
  //     row[header] = line[i];
  //   });
  //   return row;
  // });
  // const result :ParsedCsv = { columns, rows };
  // return result;
}

function removeQuotes(str: string) {
  if (str.length > 1 && str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, -1);
  }
  return str;
}


export const QueryGrid: React.FunctionComponent<QueryGridProps> = ({ csvString } :QueryGridProps) => {
  //Data grid is using dynamic import and may not be loaded
  if(DataGrid === undefined || !csvString) return null;

  const parsedCsv = parseCSV(csvString);
  if(!parsedCsv){
    return null;
  }
  const rows :Row[] = parsedCsv.rows;
  const columns :Column[] = parsedCsv.columns;

  return (
    <>
      <DataGrid 
        defaultColumnOptions={{
          sortable: true,
          resizable: true
        }}
        columns={columns} 
        rows={rows}
      />
    </>
  );
};
