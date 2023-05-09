import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import TripsContainer from '../components/TripsContainer'

const data = {
  totalItems: 2265208,
  items: [
    {
      id: 1365209,
      departure: '2021-07-30T18:03:44.000Z',
      return: '2021-07-30T18:25:56.000Z',
      departureId: 8,
      returnId: 85,
      distance: 4367,
      duration: 1331,
      departureStation: {},
      returnStation: {
        id: 85,
        nimi: 'Jalavatie',
        namn: 'Almvägen',
        name: 'Jalavatie',
        osoite: 'Jalavatie 10',
        adress: 'Almvägen 10',
        kaupunki: 'Helsinki',
        stad: 'Helsingfors',
        capacity: 16,
        x: 24.9057885671904,
        y: 60.1934470268502,
      },
    },
    {
      id: 2140757,
      departure: '2021-07-30T18:03:44.000Z',
      return: '2021-07-30T18:25:56.000Z',
      departureId: 8,
      returnId: 85,
      distance: 43670,
      duration: 13331,
      departureStation: {
        id: 8,
        nimi: 'Vanha kirkkopuisto',
        namn: 'Gamla kyrkoparken',
        name: 'Vanha kirkkopuisto',
        osoite: 'Annankatu 16',
        adress: 'Annegatan 16',
        kaupunki: 'Helsinki',
        stad: 'Helsingfors',
        capacity: 24,
        x: 24.9391145483706,
        y: 60.1653538465664,
      },
      returnStation: {
        id: 85,
        nimi: 'Jalavatie',
        namn: 'Almvägen',
        name: 'Jalavatie',
        osoite: 'Jalavatie 10',
        adress: 'Almvägen 10',
        kaupunki: 'Helsinki',
        stad: 'Helsingfors',
        capacity: 16,
        x: 24.9057885671904,
        y: 60.1934470268502,
      },
    },
  ],
  totalPages: 1132604,
  currentPage: 0,
}

describe('<TripsContainer />', () => {
  it('should render trips', () => {
    const handler = jest.fn()
    render(
      <BrowserRouter>
        <TripsContainer
          trips={data.items}
          count={data.totalItems}
          page={data.currentPage}
          totalPages={data.totalPages}
          rows={5}
          handleChangePage={handler}
          handleChangeRow={handler}
          sortDispatcher={handler}
        />
      </BrowserRouter>
    )
    expect(screen.getByText('Vanha kirkkopuisto')).toBeVisible()
    expect(screen.getByText('22 minute(s)')).toBeVisible()
    expect(screen.getByText('4.37 km')).toBeVisible()
  })
})
