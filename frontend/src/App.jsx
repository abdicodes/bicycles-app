import React from 'react'
import StationList from './Stations'
import TripList from './Trips'
import SingleStation from './SingleStation'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <>
        <Routes>
          <Route path="/" element={<StationList />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/stations/:id" element={<SingleStation />} />
        </Routes>
      </>
    </div>
  )
}

export default App
