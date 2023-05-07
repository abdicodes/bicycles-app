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

const StationsContainer = ({
  stations,
  count,
  page,
  rows,
  handleChangePage,
  handleChangeRow,
}) => {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Capacity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.returnStation.name}</TableCell>
                <TableCell align="right">{row.osoite}</TableCell>
                <TableCell align="right">{row.capacity}</TableCell>
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
