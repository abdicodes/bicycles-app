import React, { useState } from 'react'
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
  TableSortLabel,
} from '@mui/material'
import { toKm, toMinutes } from '../utils/conversions'

const TripsContainer = ({
  trips,
  count,
  page,
  rows,
  handleChangePage,
  handleChangeRow,
  sortDispatcher,
}) => {
  const [order, setOrder] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [sort, setSort] = useState('')

  const handleSort = (field) => {
    if (sort === `${field} ASC`) {
      setSort(`${field} DESC`)
      setOrder('desc')
      setOrderBy(field)
      sortDispatcher(`${field} DESC`)
    } else {
      setSort(`${field} ASC`)
      setOrder('asc')
      setOrderBy(field)
      sortDispatcher(`${field} ASC`)
    }
  }
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'departureStation name'}
                  direction={
                    orderBy === 'departureStation name' ? order : 'asc'
                  }
                  onClick={() => handleSort('departureStation name')}
                >
                  Depature station
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'returnStation name'}
                  direction={orderBy === 'returnStation name' ? order : 'asc'}
                  onClick={() => handleSort('returnStation name')}
                >
                  Return station
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'distance'}
                  direction={orderBy === 'distance' ? order : 'asc'}
                  onClick={() => handleSort('distance')}
                >
                  Covered distance&nbsp;(km)
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'duration'}
                  direction={orderBy === 'duration' ? order : 'asc'}
                  onClick={() => handleSort('duration')}
                >
                  Trip duration&nbsp;(minutes)
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.departureStation.name}
                </TableCell>
                <TableCell align="right">{row.returnStation.name}</TableCell>
                <TableCell align="right">{toKm(row.distance)}</TableCell>
                <TableCell align="right">{toMinutes(row.duration)}</TableCell>
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
export default TripsContainer
