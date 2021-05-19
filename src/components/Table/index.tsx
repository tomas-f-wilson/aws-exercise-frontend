import * as React from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

type Props = {
  users: {
    id: number;
    username: string;
    email: string;
  }[];
  getValues: ({ id, email, username }: any) => void;
};

const DataTable: React.FunctionComponent<Props> = ({ users, getValues }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "User name", width: 200 },
    { field: "email", headerName: "User email", width: 200 },
    {
      field: "",
      headerName: "Edit",
      width: 150,
      renderCell: (param) => {
        return (
          <Button>
            <EditIcon />
          </Button>
        );
      },
    },
  ];
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        onCellClick={(e) => getValues(e.row)}
      />
    </div>
  );
};

export default DataTable;
