import { login } from '../../utils/login.cy'

context('Edit Credit Card', () => {
  beforeEach(() => login())

  it('should be able to edit a credit card', () => {
    cy.visit('http://localhost:5173/credit-cards')

    // Open menu of last credit card and click on edit
    cy.get('tbody tr:last-child td:last-child div').click()
    cy.get('button[type="button"]').contains('Edit').click()

    cy.get('[placeholder="Enter credit card name"]').clear().type('Credit Card test edited')
    cy.get('[placeholder="Enter credit card limit"]').clear().type('2000')
    cy.get('[placeholder="Select flag"]').click()
    cy.contains('Mastercard').click()

    cy.get('[type="submit"]').click()
  })
})
