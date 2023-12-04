import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Row = { [key: string]: React.ReactNode };

type Props = {
  rows: Row[];
  columns: GridColDef[];
  loading?: boolean;
};

export function BasicTable({ rows, columns, loading }: Props) {
  return (
    <div style={{ height: 500 }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
