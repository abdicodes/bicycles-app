import React, { useState, useEffect } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from '@mui/material'

const Filters = ({ handleFilter }) => {
  const [filter, setFilter] = useState(null)
  useEffect(() => {
    handleFilter(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <FormControl sx={{ pr: 5 }}>
        <FormLabel id="departure-city">Departure city</FormLabel>
        <RadioGroup
          defaultValue=""
          name="radio-buttons-group"
          onChange={(e) =>
            setFilter({ ...filter, departureCity: e.target.value })
          }
        >
          <FormControlLabel value="" control={<Radio />} label="All" />
          <FormControlLabel
            value="Helsinki"
            control={<Radio />}
            label="Helsinki"
          />
          <FormControlLabel value="Espoo" control={<Radio />} label="Espoo" />
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ pr: 5 }}>
        <FormLabel id="return-station">Return Station</FormLabel>
        <RadioGroup
          defaultValue=""
          name="radio-buttons-group"
          onChange={(e) => setFilter({ ...filter, returnCity: e.target.value })}
        >
          <FormControlLabel value="" control={<Radio />} label="All" />
          <FormControlLabel
            value="Helsinki"
            control={<Radio />}
            label="Helsinki"
          />
          <FormControlLabel value="Espoo" control={<Radio />} label="Espoo" />
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ pr: 5 }}>
        <FormLabel id="duration">Duration</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
          onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
        >
          <FormControlLabel value="" control={<Radio />} label="all" />
          <FormControlLabel
            value="short"
            control={<Radio />}
            label="Short: (~0-10 Minutes) "
          />
          <FormControlLabel
            value="long"
            control={<Radio />}
            label="Long: (more than 10 Minutes)"
          />
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ pr: 5 }}>
        <FormLabel id="distance">Distance</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
          onChange={(e) => setFilter({ ...filter, distance: e.target.value })}
        >
          <FormControlLabel value="" control={<Radio />} label="all" />
          <FormControlLabel
            value="short"
            control={<Radio />}
            label="Short: (~0-10 km) "
          />
          <FormControlLabel
            value="long"
            control={<Radio />}
            label="Long: (more than 10 km)"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default Filters
