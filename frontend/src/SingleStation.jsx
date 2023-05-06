import React, { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import SingleStationContainer from './SingleStationContainer'
import {
  Box,
  ButtonGroup,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material/'

const SingleStation = ({ ...pros }) => {
  const { id } = useMatch('/stations/:id').params
  const [data, setData] = useState()
  const [month, setMonth] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStation = () => {
      axios
        .get(`http://localhost:5000/api/stations/${id}`, {
          params: { month: month },
        })
        .then(({ data }) => {
          setLoading(false)
          setData(data)
        })
    }

    fetchStation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month])

  const handleMonth = (value) => {
    setLoading(true)
    setMonth(value)
  }

  // this object as passed as props to child components in the Container component
  const stationData = data
    ? {
        name: data.station.name,
        address: data.station.osoite,
        topDeparture: data.topDeparture,
        totalDeparture: data.totalDeparture,
        totalReturn: data.totalDeparture,
        topReturn: data.topReturn,
        avgDeparture: data.avgDeparture[0].avgDistance,
        avgReturn: data.avgReturn[0].avgDistance,
        x: data.station.x,
        y: data.station.y,
        displayName: data.station.name,
        city: data.station.kaupunki,
      }
    : null
  return (
    <Box
      sx={{
        margin: '20px',
      }}
    >
      <Typography> Filter stats by a month</Typography>
      <ButtonGroup
        aria-label="outlined primary button group"
        sx={{ marginBottom: '20px' }}
      >
        <Button onClick={() => handleMonth(5)}>May</Button>
        <Button onClick={() => handleMonth(6)}>June</Button>
        <Button onClick={() => handleMonth(7)}>July</Button>
        <Button onClick={() => handleMonth(8)}>August</Button>
        <Button onClick={() => handleMonth(null)}>All months</Button>
      </ButtonGroup>
      <Box> {loading && <CircularProgress />}</Box>

      {data && !loading && <SingleStationContainer stationData={stationData} />}
    </Box>
  )
}

export default SingleStation
