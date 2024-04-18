import Home from "../../components/Dashboard";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchUserData(); // Fetch initial data
  }, []);

  const fetchUserData = async () => {
    try {
      const end = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${end}/allEmployee`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      const data = response.data.data.map((row, index) => ({
        id: index + 1,
        delId: row._id,
        image: row.image,
        ...row,
      }));

      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    {
      field: "avatar",
      headerName: "Image",
      width: 130,
      renderCell: (params) => (
        <Avatar
          alt="Avatar"
          src={`http://localhost:8005/upload/images/${params.row.image}`}
        />
      ),
    },

    { field: "name", headerName: "Name", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobile", headerName: "Mobile", width: 130 },

    {
      field: "view",
      headerName: "View",
      width: 100,
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/view/${params.row.id}`} // Assuming there's a view route
          aria-label="view"
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Home />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div
          style={{
            height: 500,
            width: "70%",
            marginLeft: "200px",
            marginRight: "50px",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
}
