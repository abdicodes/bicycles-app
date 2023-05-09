import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Box, OutlinedInput, Button, Alert, Typography } from '@mui/material'

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const NewStation = () => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const formik = useFormik({
    initialValues: {
      id: '',
      nimi: '',
      namn: '',
      name: '',
      osoite: '',
      adress: '',
      kaupunki: '',
      stad: '',
      x: '',
      y: '',
      capacity: '',
    },
    onSubmit: (values) => {
      axios
        .post(`${REACT_APP_BACKEND_URL}/stations`, values)
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
          <Typography> Add a new station by filling this form</Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <OutlinedInput
              id="id"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Enter Station ID no."
              onChange={formik.handleChange}
              value={formik.values.id}
            />
            <OutlinedInput
              id="nimi"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Name FI Nimi"
              onChange={formik.handleChange}
              value={formik.values.nimi}
            />
            <OutlinedInput
              id="namn"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Name SE Namn"
              onChange={formik.handleChange}
              value={formik.values.namn}
            />
            <OutlinedInput
              id="name"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Name EN"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <OutlinedInput
              id="osoite"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Address FI"
              onChange={formik.handleChange}
              value={formik.values.osoite}
            />
            <OutlinedInput
              id="adress"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Address SE"
              onChange={formik.handleChange}
              value={formik.values.adress}
            />
            <OutlinedInput
              id="kaupunki"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="City FI (Kaupunki)"
              onChange={formik.handleChange}
              value={formik.values.kaupunki}
            />
            <OutlinedInput
              id="stad"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="City SE (Stad)"
              onChange={formik.handleChange}
              value={formik.values.stad}
            />

            <OutlinedInput
              id="x"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="GEO X-coordination longitude"
              onChange={formik.handleChange}
              value={formik.values.x}
            />
            <OutlinedInput
              id="y"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="GEO Y-coordination latitude"
              onChange={formik.handleChange}
              value={formik.values.y}
            />
            <OutlinedInput
              id="capacity"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Capacity (number of slots)."
              onChange={formik.handleChange}
              value={formik.values.capacity}
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
          <Alert severity="success">
            New station has been added successfully
          </Alert>
        )}
      </Box>
    </div>
  )
}

export default NewStation
