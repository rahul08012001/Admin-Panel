

import Dashboard from "../../components/Dashboard";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Avatar, Switch } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function DataTable() {
  const [rows, setRows] = useState([]);
//   const [checked, setChecked] = useState(true);

  useEffect(() => {
    fetchUserData();
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
        ...row,
      }));

      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddUserClick = async () => {
    fetchUserData();
  };

  const handleStatus = async (e, delId, currentStatus) => {
    e.preventDefault();
console.log("delId",delId);
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      const response = await axios.post(`http://localhost:8005/updateStatus/${delId}`, {
        delId,
        status: newStatus,
      });

      if (response.data) {
        const updatedRows = rows.map(row =>
          row.delId === delId ? { ...row, status: newStatus } : row
        );
        setRows(updatedRows);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.error : error.message);
    }
  };

  const handleDelete = async (delId) => {
    try {
      const url = `http://localhost:8005/deleteEmployee/${delId}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 200) {
        setRows(rows.filter((row) => row.delId !== delId));
        fetchUserData();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
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
   
    { field: "role", headerName: "Role", width: 130 },
  
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.delId)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            component={Link}
            to={`/updateEmployee/${params.row.delId}`}
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 100,
    //   renderCell: (params) => (
    //     <Switch
    //       checked={params.row.status === 'active'}
    //       onChange={(e) => handleStatus(e, params.row.delId, params.row.status)}
    //       inputProps={{ 'aria-label': 'controlled' }}
    //     />
    //   ),
    // },
  ];

  return (
    <>
      <Dashboard />
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: 10,
            }}
          >
            <label htmlFor="Add User">
              <Button
                variant="contained"
                onClick={handleAddUserClick}
                component={Link}
                to="/Employee"
              >
                Add Role
              </Button>
            </label>
          </div>

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
