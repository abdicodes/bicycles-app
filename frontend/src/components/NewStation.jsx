import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Box, OutlinedInput, Button, Alert, Typography } from '@mui/material'
import { newStationSchema } from '../utils/validationSchemas'

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const NewStation = () => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [returnedMessage, setReturnedMessage] = useState('')

  const formik = useFormik({
    validationSchema: newStationSchema,
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
        .catch((err) => {
          setReturnedMessage(err.message)
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
        <Box
          sx={{
            width: '80vh',
            ml: 5,
          }}
        >
          {errorMessage && <Alert severity="error">{returnedMessage}</Alert>}

          {successMessage && (
            <Alert severity="success">
              New station has been added successfully
            </Alert>
          )}
          {formik.touched.id && formik.errors.id && (
            <Alert severity="error">{formik.errors.id}</Alert>
          )}
          {formik.touched.nimi && formik.errors.nimi && (
            <Alert severity="error">{formik.errors.nimi}</Alert>
          )}

          {formik.touched.namn && formik.errors.namn && (
            <Alert severity="error">{formik.errors.namn}</Alert>
          )}
          {formik.touched.name && formik.errors.name && (
            <Alert severity="error">{formik.errors.name}</Alert>
          )}
          {formik.touched.osoite && formik.errors.osoite && (
            <Alert severity="error">{formik.errors.osoite}</Alert>
          )}
          {formik.touched.adress && formik.errors.adress && (
            <Alert severity="error">{formik.errors.adress}</Alert>
          )}
          {formik.touched.kaupunki && formik.errors.kaupunki && (
            <Alert severity="error">{formik.errors.kaupunki}</Alert>
          )}
          {formik.touched.stad && formik.errors.stad && (
            <Alert severity="error">{formik.errors.stad}</Alert>
          )}
          {formik.touched.x && formik.errors.x && (
            <Alert severity="error">{formik.errors.x}</Alert>
          )}
          {formik.touched.capacity && formik.errors.capacity && (
            <Alert severity="error">{formik.errors.capacity}</Alert>
          )}
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box>
            <OutlinedInput
              id="id"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Enter Station ID no."
              onChange={formik.handleChange}
              value={formik.values.id}
              onBlur={formik.handleBlur}
              error={formik.touched.id && formik.errors.id}
            />

            <OutlinedInput
              id="nimi"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Name FI Nimi"
              onChange={formik.handleChange}
              value={formik.values.nimi}
              onBlur={formik.handleBlur}
              error={formik.touched.nimi && formik.errors.nimi}
            />

            <OutlinedInput
              id="namn"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Name SE Namn"
              onChange={formik.handleChange}
              value={formik.values.namn}
              onBlur={formik.handleBlur}
              error={formik.touched.namn && formik.errors.namn}
            />

            <OutlinedInput
              id="name"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Name EN"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
            />

            <OutlinedInput
              id="osoite"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Address FI"
              onChange={formik.handleChange}
              value={formik.values.osoite}
              onBlur={formik.handleBlur}
              error={formik.touched.osoite && formik.errors.osoite}
            />

            <OutlinedInput
              id="adress"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Address SE"
              onChange={formik.handleChange}
              value={formik.values.adress}
              onBlur={formik.handleBlur}
              error={formik.touched.adress && formik.errors.adress}
            />

            <OutlinedInput
              id="kaupunki"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="City FI (Kaupunki)"
              onChange={formik.handleChange}
              value={formik.values.kaupunki}
              onBlur={formik.handleBlur}
              error={formik.touched.kaupunki && formik.errors.kaupunki}
            />

            <OutlinedInput
              id="stad"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="City SE (Stad)"
              onChange={formik.handleChange}
              value={formik.values.stad}
              onBlur={formik.handleBlur}
              error={formik.touched.stad && formik.errors.stad}
            />

            <OutlinedInput
              id="x"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="GEO X-coordination longitude"
              onChange={formik.handleChange}
              value={formik.values.x}
              onBlur={formik.handleBlur}
              error={formik.touched.x && formik.errors.x}
            />

            <OutlinedInput
              id="y"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="GEO Y-coordination latitude"
              onChange={formik.handleChange}
              value={formik.values.y}
              onBlur={formik.handleBlur}
              error={formik.touched.y && formik.errors.y}
            />
            {formik.touched.y && formik.errors.y && (
              <Alert severity="error">{formik.errors.y}</Alert>
            )}
            <OutlinedInput
              id="capacity"
              sx={{ m: 1, marginX: 5, width: '50vh' }}
              placeholder="Capacity (number of slots)."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.capacity && formik.errors.capacity}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: ' center' }}>
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
    </div>
  )
}

export default NewStation
