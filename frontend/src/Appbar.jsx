import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Toolbar, AppBar, Box } from '@mui/material'

export default function Appbar() {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => navigate('/stations')} color="inherit">
            Stations
          </Button>
          <Button onClick={() => navigate('/trips')} color="inherit">
            Trips
          </Button>
          <Button onClick={() => navigate('/add-station')} color="inherit">
            Add station
          </Button>
          <Button onClick={() => navigate('/add-trip')} color="inherit">
            Add trip
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
