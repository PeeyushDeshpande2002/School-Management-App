import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";

const GenericTable = ({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //background: "linear-gradient(to bottom, #5f2c82, #49a09d)",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 3, maxWidth: "90%", width: "100%", borderRadius: 2 }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
        >
          {title}
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#5f2c82" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{ color: "#ffffff", fontWeight: "bold" }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f3f3f3" } }}
                  hover
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{ cursor: "pointer" }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {/* {row[column.field]} */}
                      {Array.isArray(row[column.field])
                        ? row[column.field].join(", ") // For arrays
                        : typeof row[column.field] === "object"
                        ? JSON.stringify(row[column.field]) // For objects
                        : row[column.field] || "-"}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(row);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default GenericTable;
