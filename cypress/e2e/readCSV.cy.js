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

describe('Simple test on all rows from CSV', () => {
  it('has access to all rows', () => {
    cy.wrap(csvUsers)
    .each((item, index) => {
      cy.wrap(item).then((row) => {
        cy.log(`The user ${index + 1} in the row has name: ${row["first name"]}, surname: ${row["last name"]} and ID: ${row["user id"]}`)
      })
    })
  })
})

describe ('Users from CSV - dynamic tests', () => {
  beforeEach(() => {
    cy.visit('index.html')
  })

  csvUsers.forEach((taxpayer) => {
    it (`has the user ${taxpayer['first name']} ${taxpayer['last name']}`, () => {
      cy.contains('td[data-test-id=userId]', taxpayer['user id'])
      .parent('tr')
      .within(() => {
        cy.contains('td[data-test-id=firstName]', taxpayer['first name'])
        cy.contains('td[data-test-id=lastName]', taxpayer['last name'])
      })
    })
  })
})