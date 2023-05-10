/* eslint-disable no-undef */
describe('Checking all routes', () => {
  it('Station page can be viewed and searched from default router', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Name')
    cy.contains('Address')
    cy.contains('City')
    cy.contains('Capacity')
    cy.get('#search').type('Kontula')
    cy.contains('Kontula (M)')
  })

  it('Trips page can be viewed and searched', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Trips').click()
    cy.get('#search').type('Kontula')
    cy.contains('Kontula (M)')
  })

  it('new station can be added', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Add station').click()
    cy.get('#id').type('2000')
    cy.get('#nimi').type('cypress')
    cy.get('#namn').type('cypress')
    cy.get('#name').type('cypress')
    cy.get('#osoite').type('cypress 1')
    cy.get('#adress').type('cypress 1')
    cy.get('#kaupunki').type('Helsinki')
    cy.get('#stad').type('Helsingfors')
    cy.get('#x').type('100')
    cy.get('#y').type('100')
    cy.get('#capacity').type('100')
    cy.contains('Submit').click()
    cy.contains('New station has been added successfully').click()
  })

  it('new station with existing ID cannot be added', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Add station').click()
    cy.get('#id').type('2000')
    cy.get('#nimi').type('cypress')
    cy.get('#namn').type('cypress')
    cy.get('#name').type('cypress')
    cy.get('#osoite').type('cypress 1')
    cy.get('#adress').type('cypress 1')
    cy.get('#kaupunki').type('Helsinki')
    cy.get('#stad').type('Helsingfors')
    cy.get('#x').type('100')
    cy.get('#y').type('100')
    cy.get('#capacity').type('100')
    cy.contains('Submit').click()
    cy.contains('Request failed').click()
  })

  it('new Trip can be added', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Add trip').click()
    cy.get('#departure').type('06-01-2021 16:22')
    cy.get('#return').type('06-01-2021 16:50')
    cy.get('#departureId').type('2000')
    cy.get('#returnId').type('2000')
    cy.get('#duration').type('900')
    cy.get('#distance').type('900')
    cy.contains('Submit').click()
    cy.contains('New Trip has been added successfully')
  })

  it('verify new station and trip', function () {
    cy.visit('http://localhost:3000/')

    cy.get('#search').type('cypress')
    cy.contains('cypress 1')
    cy.contains('Trips').click()
    cy.get('#search').type('cypress')
    cy.contains('cypress')
  })

  it('delete test trip', function () {
    cy.request('DELETE', 'http://localhost:5000/api/trips')
  })

  it('delete test station', function () {
    cy.request('DELETE', 'http://localhost:5000/api/stations')
  })
})
