import React from 'react'
import StationList from './components/Stations'
import TripList from './components/Trips'
import SingleStation from './components/SingleStation'
import { Routes, Route } from 'react-router-dom'
import NewStation from './components/NewStation'
import Appbar from './Appbar'
import NewTrip from './components/NewTrip'

const App = () => {
  return (
    <div>
      <>
        <Appbar />
        <Routes>
          <Route path="/satations" element={<StationList />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/stations/:id" element={<SingleStation />} />
          <Route path="/add-station" element={<NewStation />} />
          <Route path="/add-trip" element={<NewTrip />} />
          <Route path="*" element={<StationList />} />
        </Routes>
      </>
    </div>
  )
}

export default App
