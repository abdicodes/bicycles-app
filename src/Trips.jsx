import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import { dateConverter } from '../utils/dateConverter'

const TripList = () => {
  console.log('hello')
  const [trips, setTrips] = useState([])
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
        .get(`http://localhost:5000/api/trips`, {
          params: { page, search },
        })
        .then(({ data }) => {
          console.log(data)
          setTrips(data.items)
          setTotalPages(data.totalPages)
          setPage(data.currentPage)
        })
    }

    fetchStations()
  }, [page, search])

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <h1>Trips</h1>
      {trips.length > 0 && (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              from: {dateConverter(trip.departure)} - until:{' '}
              {dateConverter(trip.return)} - {trip.distance} -{trip.duration}
              {trip.departureStation.name} - {trip.returnStation.name}
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

export default TripList
