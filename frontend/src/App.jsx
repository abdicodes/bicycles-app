import React from 'react'
import StationList from './Stations'
import TripList from './Trips'
import Map from './Map'
import SingleStation from './SingleStation'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const coord = {
    latitude: 60.2523255258372,
    longitude: 25.0091215694658,
  }
  return (
    <div>
      <>
        <Routes>
          <Route path="/" element={<StationList />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/stations/:id" element={<SingleStation />} />
        </Routes>
      </>
      {/* <div>
        <Map coords={coord} display_name="hello" />
      </div> */}
    </div>
  )
}

export default App
