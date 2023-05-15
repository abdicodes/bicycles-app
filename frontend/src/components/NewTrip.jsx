import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Box, OutlinedInput, Button, Alert, Typography } from '@mui/material'
import { newTripSchema } from '../utils/validationSchemas'

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const NewTrip = () => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const formik = useFormik({
    validationSchema: newTripSchema,
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
        .post(`${REACT_APP_BACKEND_URL}/trips`, values)
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
    <Box>
      <Box sx={{ ml: 5, mt: 2, mb: 2 }}>
        <Typography> Add a new trip by filling this form</Typography>
      </Box>
      <Box sx={{ width: '80vh', ml: 2 }}>
        {formik.touched.departure && formik.errors.departure && (
          <Alert severity="error" sx={{ m: 1 }}>
            {formik.errors.departure}
          </Alert>
        )}
        {formik.touched.return && formik.errors.return && (
          <Alert severity="error" sx={{ m: 1 }}>
            {formik.errors.return}
          </Alert>
        )}
        {formik.touched.departureId && formik.errors.departureId && (
          <Alert severity="error" sx={{ m: 1 }}>
            {formik.errors.departureId}
          </Alert>
        )}
        {formik.touched.returnId && formik.errors.returnId && (
          <Alert severity="error" sx={{ m: 1 }}>
            {formik.errors.returnId}
          </Alert>
        )}
        {formik.touched.duration && formik.errors.duration && (
          <Alert severity="error" sx={{ m: 1 }}>
            {formik.errors.duration}
          </Alert>
        )}
        {formik.touched.distance && formik.errors.distance && (
          <Alert severity="error" sx={{ m: 1 }}>
            {formik.errors.distance}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ m: 1 }}>
            Something went wrong make sure you filled all fields correctly!
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ m: 1 }}>
            New Trip has been added successfully
          </Alert>
        )}
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <OutlinedInput
            id="departure"
            sx={{ m: 1, marginX: 2, width: '40vh' }}
            placeholder="Departure DD-MM-YYYY hh:mm"
            onChange={formik.handleChange}
            value={formik.values.departure}
            error={formik.touched.departure && formik.errors.departure}
            onBlur={formik.handleBlur}
          />
          <OutlinedInput
            id="return"
            sx={{ m: 1, marginX: 2, width: '40vh' }}
            placeholder="Return DD-MM-YYYY hh:mm"
            onChange={formik.handleChange}
            value={formik.values.return}
            error={formik.touched.return && formik.errors.return}
            onBlur={formik.handleBlur}
          />
          <OutlinedInput
            id="departureId"
            sx={{ m: 1, marginX: 2, width: '40vh' }}
            placeholder="Departure Station ID"
            onChange={formik.handleChange}
            value={formik.values.departureId}
            error={formik.touched.departureId && formik.errors.departureId}
            onBlur={formik.handleBlur}
          />
          <OutlinedInput
            id="returnId"
            sx={{ m: 1, marginX: 2, width: '40vh' }}
            placeholder="Return Station ID"
            onChange={formik.handleChange}
            value={formik.values.returnId}
            error={formik.touched.returnId && formik.errors.returnId}
            onBlur={formik.handleBlur}
          />
          <OutlinedInput
            id="distance"
            sx={{ m: 1, marginX: 2, width: '40vh' }}
            placeholder="Distance (in meters)"
            onChange={formik.handleChange}
            value={formik.values.distance}
            error={formik.touched.distance && formik.errors.distance}
            onBlur={formik.handleBlur}
          />
          <OutlinedInput
            id="duration"
            sx={{ m: 1, marginX: 2, width: '40vh' }}
            placeholder="Duration (in seconds"
            onChange={formik.handleChange}
            value={formik.values.duration}
            error={formik.touched.duration && formik.errors.duration}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: ' center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ m: 1, marginX: 1, width: '25vh' }}
            disabled={!formik.isValid || !formik.dirty}
          >
            Submit
          </Button>
          <Button
            type="reset"
            size="large"
            variant="outlined"
            sx={{ m: 1, marginX: 1, width: '25vh' }}
            onClick={formik.handleReset}
            disabled={!formik.dirty}
          >
            Reset form
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default NewTrip
