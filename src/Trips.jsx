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
  const [sort, setSort] = useState('departure DESC')

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
    setPage(0)
  }

  const handleSort = (field) => {
    if (sort === `${field} ASC`) {
      setSort(`${field} DESC`)
      setPage(0)
    } else {
      setSort(`${field} ASC`)
      setPage(0)
    }
  }
  useEffect(() => {
    console.log(page)
    const fetchStations = () => {
      axios
        .get(`http://localhost:5000/api/trips`, {
          params: { page, search, sort },
        })
        .then(({ data }) => {
          console.log(data)
          setTrips(data.items)
          setTotalPages(data.totalPages)
          setPage(data.currentPage)
        })
    }

    fetchStations()
  }, [page, search, sort])

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <h1>Trips</h1>
      {trips && (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('departureStation name')}>
                Departure station name
              </th>
              <th onClick={() => handleSort('returnStation name')}>
                Return station name
              </th>
              <th onClick={() => handleSort('departure')}>Departure time</th>
              <th onClick={() => handleSort('return')}>Return time</th>
              <th onClick={() => handleSort('distance')}>Distance</th>
              <th onClick={() => handleSort('duration')}>Time</th>
            </tr>
          </thead>
          <tbody>
            {trips &&
              trips.map((trip) => (
                <tr key={trip.id} onClick={() => console.log('you clicked me')}>
                  <td>{trip.departureStation.name}</td>
                  <td>{trip.returnStation.name}</td>
                  <td>{dateConverter(trip.departure)}</td>
                  <td>{dateConverter(trip.return)}</td>
                  <td>{trip.distance}</td>
                  <td>{trip.duration}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div>
        <button onClick={handlePrevious}>previous</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  )
}

export default TripList
