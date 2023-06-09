import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { SearchBarMomoized } from '../SearchBar'
import TripsContainer from './TripsContainer'
import { useDebouncedCallback } from 'use-debounce'
import { CircularProgress, Box, Typography } from '@mui/material/'
import Filters from '../Filters'

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const TripList = () => {
  const [trips, setTrips] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('departure DESC')
  const [rows, setRows] = useState(5)
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(null)
  const [filters, setFilters] = useState({})

  const handlePage = (page) => {
    setPage(page)
    setLoading(true)
  }

  const handleFilter = (value) => {
    setFilters(value)
    setPage(0)
    setLoading(true)
  }

  const sortDispatcher = (value) => {
    setSort(value)
  }
  const handleRows = (e) => {
    setRows(e.target.value)
    setPage(0)
    setLoading(true)
  }

  const debounced = useDebouncedCallback(
    // debounce will prevent sending REST queries with every change in text
    // it will wait 1 second between changes before changing state of search and thus sending axios query
    // we used memoized to presist value between renders.
    (value) => {
      setPage(0)
      setSearch(value)
      setLoading(true)
    },
    // delay in ms
    1000
  )

  const memoizedOnChangeText = useMemo(() => debounced, [debounced])

  useEffect(() => {
    const fetchTrips = () => {
      axios
        .get(`${REACT_APP_BACKEND_URL}/trips`, {
          params: { page, search, sort, rows, ...filters },
        })
        .then(({ data }) => {
          setTrips(data.items)
          setTotalPages(data.totalPages)
          setPage(data.currentPage)
          setLoading(false)
          setTotalItems(data.totalItems)
        })
    }

    fetchTrips()
  }, [page, search, sort, rows, filters])

  return (
    <Box>
      <SearchBarMomoized
        initialValue={search}
        onChangeText={memoizedOnChangeText}
        value={search}
      />
      <Filters handleFilter={handleFilter} />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 20 }}>
          <CircularProgress />
        </Box>
      )}
      {totalPages && !loading && totalItems > 0 && (
        <TripsContainer
          page={page}
          count={totalPages}
          trips={trips}
          handleChangePage={handlePage}
          handleChangeRow={handleRows}
          rows={rows}
          sortDispatcher={sortDispatcher}
        />
      )}
      {totalItems === 0 && <Typography> No records found!</Typography>}
    </Box>
  )
}

export default TripList
