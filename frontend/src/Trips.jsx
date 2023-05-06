import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { SearchBarMomoized } from './SearchBar'
import TripsContainer from './TripsContainer'
import { useDebouncedCallback } from 'use-debounce'
import { CircularProgress, Box } from '@mui/material/'
const TripList = () => {
  const [trips, setTrips] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('departure DESC')
  const [rows, setRows] = useState(5)
  const [loading, setLoading] = useState(true)

  const handlePage = (page) => {
    setPage(page)
    setLoading(true)
  }

  const sortDispatcher = (value) => {
    setSort(value)
  }
  const handleRows = (e) => {
    console.log('rows:')
    console.log(e.target.value)
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
    console.log(page)
    const fetchTrips = () => {
      axios
        .get(`http://localhost:5000/api/trips`, {
          params: { page, search, sort, rows },
        })
        .then(({ data }) => {
          console.log(data)
          setTrips(data.items)
          setTotalPages(data.totalPages)
          setPage(data.currentPage)
          setLoading(false)
        })
    }

    fetchTrips()
  }, [page, search, sort, rows])

  return (
    <Box>
      <SearchBarMomoized
        initialValue={search}
        onChangeText={memoizedOnChangeText}
        value={search}
      />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 20 }}>
          <CircularProgress />
        </Box>
      )}
      {totalPages && !loading && (
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
    </Box>
  )
}

export default TripList
