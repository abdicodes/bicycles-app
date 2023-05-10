import { number, string, object } from 'yup'

export const newStationSchema = object().shape({
  id: number().required('id is required!'),

  nimi: string().required('Name in Finnish is required!'),

  namn: string().required('Name in Swedish is required!'),

  name: string().required('Name in English is required!'),
  osoite: string()
    .required('Address is required!')
    .min(5, 'Address is too short!'),
  adress: string()
    .required('Address is required!')
    .min(5, 'Address is too short!'),
  kaupunki: string()
    .oneOf(
      ['helsinki', 'espoo', 'Helsinki', 'Espoo'],
      'City can be only Helsinki or Espoo'
    )
    .required('City field is required'),
  stad: string()
    .oneOf(
      ['Helsingfors', 'Esbo', 'helsingfors', 'esbo'],
      'City can be only Helsingfors or Esbo'
    )
    .required('City field is required'),
  x: number().required('longtitude is required!'),
  y: number().required('latitude is required!'),
  capacity: number().required('number of slots is required!'),
})

const regex =
  /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4} (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/

export const newTripSchema = object().shape({
  departure: string()
    .required('Departure time required!')
    .matches(
      regex,
      'Please enter the date and time in correct format DD-MM-YYYY hh:mm'
    ),

  return: string()
    .required('Return time is required!')
    .matches(
      regex,
      'Please enter the date and time in correct format DD-MM-YYYY hh:mm'
    ),

  distance: number()
    .required('Distance of trip is required!')
    .min(10, 'Only add your trip if it lasted at least 10 meters'),

  duration: number()
    .required('Duration of trip is required!')
    .min(10, 'Add your trip only if it lasted at least 10 seconds'),

  departureId: number().required('Departure station ID is required!'),
  returnId: number().required('Return Station ID is required!'),
})
