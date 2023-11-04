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

interface Parsed
{
  rows: Row[];
  columns: Column[];
}

export interface QueryGridProps {
  jsonResult :string;
}

function parseJSON(jsonResult: any): any {
  const rows = jsonResult.result.records.map((record: any) => {
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
}

function removeQuotes(str: string) {
  if (str.length > 1 && str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, -1);
  }
  return str;
}


export const QueryGrid: React.FunctionComponent<QueryGridProps> = ({ jsonResult } :QueryGridProps) => {
  //Data grid is using dynamic import and may not be loaded
  if(DataGrid === undefined || !jsonResult) return null;

  const parsed
   = parseJSON(jsonResult);
  if(!parsed
    ){
    return null;
  }
  const rows :Row[] = parsed
  .rows;
  const columns :Column[] = parsed
  .columns;

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
