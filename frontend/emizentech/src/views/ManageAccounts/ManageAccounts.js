import Dashboard from "../../components/Dashboard";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Menu, MenuItem } from "@mui/material"; // Import Menu and MenuItem
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of the menu

  const handleAddUserClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleRoleSelect = (role) => {
    // Perform actions based on selected role (Admin or Subadmin)
    console.log("Selected Role:", role);
    // You can add logic here to handle the selected role
    handleMenuClose(); // Close the menu after selection
  };

  const handleAddRow = () => {
    // Add a new row to the state
    const newRow = { id: rows.length + 1, role: "New Role", email: "new@example.com", mobile: "1234567890" };
    setRows([...rows, newRow]);
  };

  const handleDelete = (id) => {
    // Filter out the row with the specified id
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "role", headerName: "Role", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobile", headerName: "Mobile", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" component={Link} to={`/updateEmployee/${params.row.id}`}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
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
        <div style={{ height: 500, width: "70%", marginLeft: "200px", marginRight: "50px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: 10,
            }}
          >
            <label htmlFor="Add Role">
              <Button variant="contained" onClick={handleAddUserClick}>
                Add Role
              </Button>
            </label>
            {/* Menu for role selection */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleRoleSelect("Admin")}>Admin</MenuItem>
              <MenuItem onClick={() => handleRoleSelect("Subadmin")}>Subadmin</MenuItem>
            </Menu>
            <Button variant="contained" onClick={handleAddRow} style={{marginLeft: '10px'}}>
              Add Row
            </Button>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
}
