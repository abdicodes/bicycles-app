import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'

const StationList = () => {
  console.log('hello')
  const [stations, setStations] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState()
  const [search, setSearch] = useState('')

  const handlePrevious = () => {
    if (page === 0) {
      console.log('errorrr')
      alert('This is the first page')
    } else {
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (page === totalPages) {
      alert('This is the last page')
    } else {
      setPage(page + 1)
    }
  }

  const handleSearch = (value) => {
    setSearch(value)
  }
  useEffect(() => {
    console.log(page)
    const fetchStations = () => {
      axios
        .get(`http://localhost:5000/api/stations?page=${page}&search=${search}`)
        .then(({ data }) => {
          console.log(data)
          setStations(data.items)
          setTotalPages(data.totalPages)
          setPage(data.currentPage)
        })
    }

    fetchStations()
  }, [page, search])

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <h1>Stations</h1>
      {stations.length > 0 && (
        <ul>
          {stations.map((station) => (
            <li key={station.id}>
              {station.name} - {station.kaupunki} - {station.osoite} -{' '}
              {station.capacity}
            </li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={handlePrevious}>previous</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  )
}

export default StationList
