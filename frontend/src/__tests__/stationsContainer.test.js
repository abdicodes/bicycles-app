import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import StationsContainer from '../components/StationsContainer'

const data = {
  totalItems: 457,
  items: [
    {
      id: 501,
      nimi: 'Hanasaari',
      namn: 'Hanaholmen',
      name: 'Hanasaari',
      osoite: 'Hanasaarenranta 1',
      adress: 'Hanaholmsstranden 1',
      kaupunki: 'Espoo',
      stad: 'Esbo',
      capacity: 10,
      x: 24.840319,
      y: 60.16582,
    },
    {
      id: 1,
      nimi: 'Kaivopuisto',
      namn: 'Brunnsparken',
      name: 'Kaivopuisto',
      osoite: 'Meritori 1',
      adress: 'Havstorget 1',
      kaupunki: 'Helsinki',
      stad: 'Helsingfors',
      capacity: 30,
      x: 24.9502114714031,
      y: 60.155369615074,
    },
  ],
  totalPages: 229,
  currentPage: 0,
}

describe('<StationsContainer />', () => {
  it('should render stations', () => {
    const handler = jest.fn()
    render(
      <BrowserRouter>
        <StationsContainer
          stations={data.items}
          count={data.totalItems}
          page={data.currentPage}
          rows={5}
          handleChangePage={handler}
          handleChangeRow={handler}
        />
      </BrowserRouter>
    )
    expect(screen.getByText('Hanasaarenranta 1')).toBeVisible()
    expect(screen.getByText('Espoo')).toBeVisible()
    expect(screen.getByText('Kaivopuisto')).toBeVisible()
  })
})
