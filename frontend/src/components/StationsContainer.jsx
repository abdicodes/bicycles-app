import React from 'react'
import {
  Box,
  Paper,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableRow,
  TablePagination,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
const StationsContainer = ({
  stations,
  count,
  page,
  rows,
  handleChangePage,
  handleChangeRow,
}) => {
  const navigate = useNavigate()
  const navigationHandler = (e) => {
    const id = e.target.id
    navigate(`/stations/${id}`)
  }
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Capacity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell onClick={navigationHandler} id={row.id}>
                  {row.name}
                </TableCell>
                <TableCell onClick={navigationHandler} id={row.id}>
                  {row.osoite}
                </TableCell>
                <TableCell onClick={navigationHandler} id={row.id}>
                  {row.kaupunki}
                </TableCell>
                <TableCell onClick={navigationHandler} id={row.id}>
                  {row.capacity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={count}
        rowsPerPage={rows}
        page={page}
        onPageChange={(e, page) => handleChangePage(page)}
        onRowsPerPageChange={handleChangeRow}
      />
    </Box>
  )
}
export default StationsContainer
