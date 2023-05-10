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
