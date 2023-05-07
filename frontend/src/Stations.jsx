import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useDebouncedCallback } from 'use-debounce'
import { CircularProgress, Box } from '@mui/material/'
import { SearchBarMomoized } from './SearchBar'
import StationsContainer from './StationsContainer'
// import SearchBar from './SearchBar'

const StationList = () => {
  const [stations, setStations] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState()
  const [search, setSearch] = useState('')
  const [rows, setRows] = useState(5)
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(null)

  const handlePage = (page) => {
    setPage(page)
    setLoading(true)
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
    const fetchStations = () => {
      axios
        .get(`http://localhost:5000/api/stations`, {
          params: { page, search, rows },
        })
        .then(({ data }) => {
          setStations(data.items)
          setTotalPages(data.totalPages)
          setPage(data.currentPage)
          setLoading(false)
          setTotalItems(data.totalItems)
        })
    }

    fetchStations()
  }, [page, search, rows])

  return (
    <div>
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
      {totalPages && !loading && totalItems > 0 && (
        <StationsContainer
          page={page}
          count={totalItems}
          stations={stations}
          handleChangePage={handlePage}
          handleChangeRow={handleRows}
          rows={rows}
        />
      )}
    </div>
  )
}

export default StationList
