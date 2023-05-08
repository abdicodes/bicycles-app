import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Box, OutlinedInput, Button, Alert, Typography } from '@mui/material'

const NewTrip = () => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const formik = useFormik({
    initialValues: {
      departure: '',
      return: '',
      departureId: '',
      returnId: '',
      distance: '',
      duration: '',
    },
    onSubmit: (values) => {
      axios
        .post(`http://localhost:5000/api/trips/`, values)
        .then(() => {
          setSuccessMessage(true)
          setTimeout(() => {
            setSuccessMessage(false)
          }, 5000)
        })
        .catch((e) => {
          setErrorMessage(true)
          setTimeout(() => {
            setErrorMessage(false)
          }, 5000)
        })
    },
  })
  return (
    <div>
      <Box sx={{ display: 'grid', justifyContent: ' center' }}>
        <Box sx={{ m: 5 }}>
          <Typography> Add a new trip by filling this form</Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <OutlinedInput
              id="departure"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Departure DD-MM-YYYY HH:MM"
              onChange={formik.handleChange}
              value={formik.values.departure}
            />
            <OutlinedInput
              id="return"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Return DD-MM-YYYY HH:MM"
              onChange={formik.handleChange}
              value={formik.values.return}
            />
            <OutlinedInput
              id="departureId"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Departure Station ID"
              onChange={formik.handleChange}
              value={formik.values.departureId}
            />
            <OutlinedInput
              id="returnId"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Return Station ID"
              onChange={formik.handleChange}
              value={formik.values.returnId}
            />
            <OutlinedInput
              id="distance"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Distance (in meters)"
              onChange={formik.handleChange}
              value={formik.values.distance}
            />
            <OutlinedInput
              id="duration"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Duration (in seconds"
              onChange={formik.handleChange}
              value={formik.values.duration}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: ' center' }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ m: 1, marginX: 1, width: '25vh' }}
            >
              Submit
            </Button>
            <Button
              type="reset"
              size="large"
              variant="outlined"
              sx={{ m: 1, marginX: 1, width: '25vh' }}
              onClick={formik.handleReset}
            >
              Reset form
            </Button>
          </Box>
        </form>
        {errorMessage && (
          <Alert severity="error">
            Something went wrong make sure you filled all fields correctly!
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success">New Trip has been added successfully</Alert>
        )}
      </Box>
    </div>
  )
}

export default NewTrip
