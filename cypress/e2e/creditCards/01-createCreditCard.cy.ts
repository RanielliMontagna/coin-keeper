import { login } from '../../utils/login.cy'

context('Create Credit Card', () => {
  beforeEach(() => login())

  it('should be able to create a credit card', () => {
    cy.visit('http://localhost:5173/credit-cards')

    cy.get("button[type='button']").contains('Add Credit Card').click()

    cy.get('[placeholder="Enter credit card name"]').type('Credit Card test')
    cy.get('[placeholder="Enter credit card limit"]').type('1000')
    cy.get('[placeholder="Select flag"]').click()
    cy.contains('Visa').click()
    cy.get('[placeholder="Select credit card closing day"]').click()
    cy.contains('10').click()
    cy.get('[placeholder="Select credit card due day"]').click()
    cy.contains('25').click()
    cy.get('[placeholder="Select account"]').click()
    cy.contains('Wallet').click()

    cy.get('[type="submit"]').click()
  })
})
