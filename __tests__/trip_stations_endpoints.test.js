const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

beforeAll(() => jest.setTimeout(90 * 1000))

describe('creating new trips or stations', () => {
  beforeAll(() => jest.setTimeout(90 * 1000))
  test('creation of a station with a new id succeeds', async () => {
    const newStation = {
      id: '2000',
      nimi: 'test',
      namn: 'test',
      name: 'test',
      osoite: 'test',
      adress: 'test',
      kaupunki: 'test',
      stad: 'test',
      x: '1',
      y: '1',
      capacity: '1',
    }

    await api
      .post('/api/stations')
      .send(newStation)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('creation fails if an existing station is attempted to be added', async () => {
    const newStation = {
      id: '2000',
      nimi: 'test',
      namn: 'test',
      name: 'test',
      osoite: 'test',
      adress: 'test',
      kaupunki: 'test',
      stad: 'test',
      x: '1',
      y: '1',
      capacity: '1',
    }

    await api.post('/api/stations').send(newStation).expect(400)
  })

  test('new trip can be added', async () => {
    const newTrip = {
      departure: '2021-06-01 17:22',
      return: '2021-06-01 18:22',
      departureId: '2000',
      returnId: '2000',
      distance: '100',
      duration: '100',
    }

    const myReq = await api.post(`/api/trips`).send(newTrip)
    expect(myReq.status).toEqual(201)
    expect(myReq.body.distance).toEqual(100)
  })

  test('new with malformed date is rejected', async () => {
    const newTrip = {
      departure: 'foo',
      return: '2021-06-01 18:22',
      departureId: '2000',
      returnId: '2000',
      distance: '100',
      duration: '100',
    }

    const myReq = await api.post(`/api/trips`).send(newTrip)
    expect(400)
  })

  test('unknown routes are handled', async () => {
    await api.get(`/api/unknown`)
    expect(404)
  })

  test('test trip can be delete ', async () => {
    await api.delete('/api/trips').expect(204)
  })

  test('test station can be delete ', async () => {
    await api.delete('/api/stations').expect(204)
  })
})

describe('querying  trips or stations', () => {
  beforeAll(() => jest.setTimeout(90 * 1000))

  test('querying stations', async () => {
    await api
      .get('/api/stations')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('querying trips', async () => {
    await api.get('/api/trips/').expect('Content-Type', /application\/json/)
  })

  test('querying single station', async () => {
    const validId = 1

    await api
      .get(`/api/stations/${validId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('querying single station that do not exist fails', async () => {
    const nonExistenceId = 99999999
    await api.get(`/api/stations/${nonExistenceId}`).expect(404)
  })

  test('querying single station with malformed ID fails', async () => {
    const invalidId = 'NaN'
    await api.get(`/api/stations/${invalidId}`).expect(400)
  })

  test('querying single trip', async () => {
    const validId = 1

    await api
      .get(`/api/trips/${validId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('querying single trip that do not exist', async () => {
    const nonExistenceId = 99999999
    await api.get(`/api/trips/${nonExistenceId}`).expect(404)
  })

  test('querying single trip with malformed ID', async () => {
    const invalidId = 'NAN'
    await api.get(`/api/trips/${invalidId}`).expect(400)
  })
})
