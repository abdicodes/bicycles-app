import React from 'react'
import {
  Box,
  Typography,
  ListSubheader,
  ListItem,
  ListItemText,
  List,
  ListHeader,
} from '@mui/material/'

import Map from './Map'

const InfoCard = ({
  name,
  address,
  topDeparture,
  totalDeparture,
  totalReturn,
  topReturn,
  avgDeparture,
  avgReturn,
  city,
}) => {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography sx={{ fontSize: 15, padding: 2 }} gutterBottom>
        Station address: {address}, {city} <br />
        Total number of journeys starting from the station: {
          totalDeparture
        }{' '}
        <br />
        Total number of journeys ending at the station: {totalReturn} <br />
        Average distance of a journey starting from the station: {
          avgDeparture
        }{' '}
        meters
        <br />
        Average distance of a journey ending at the station: {avgReturn} meters
        <br />
        Top 5 most popular return stations for journeys starting from the
        {/* station: {topReturn}
          Top 5 most popular departure stations for journeys ending at the
          station: {topDeparture} */}
      </Typography>

      <Typography gutterBottom variant="h6" component="li">
        Top 5 most popular departure stations for journeys ending at the
        station:
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <ul>
          {topDeparture.map((item) => (
            <ListItem key={item.departure_id}>
              <ListItemText primary={item.departureStation.name} />
            </ListItem>
          ))}
        </ul>
      </List>
      <Typography gutterBottom variant="h6" component="li">
        Top 5 most popular return stations for journeys starting from the
        station
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <ul>
          {topReturn.map((item) => (
            <ListItem key={item.return_id}>
              <ListItemText primary={item.returnStation.name} />
            </ListItem>
          ))}
        </ul>
      </List>
    </>
  )
}

const SingleStationContainer = ({ stationData }) => {
  console.log(stationData)
  return (
    <Box>
      <Box sx={{ minWidth: 275 }}>
        <InfoCard variant="outlined" {...stationData}>
          {' '}
        </InfoCard>
      </Box>
      <Box>
        <Typography variant="h6">Station location</Typography>
        <Map {...stationData} />
      </Box>
    </Box>
  )
}

export default SingleStationContainer
