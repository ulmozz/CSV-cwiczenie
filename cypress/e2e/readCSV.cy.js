/// <reference types="cypress" />

// we can access the Cypress.env() object outside the test:
const csvUsers = Cypress.env('usersList')
console.log(csvUsers)

describe('Simple test on first row from CSV', () => {
  it('has access to first row', () => {
    cy.wrap(csvUsers)
      .should('have.length', 3)
      .then((rows) => {
        const firstRow = rows[0]
        console.log(csvUsers)
        console.log(rows)
        console.log(`The user in the first row has name: ${firstRow["first name"]}`)
      })
  })
})