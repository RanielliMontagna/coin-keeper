import { login } from '../../utils/login.cy'

context('Delete Credit Card', () => {
  beforeEach(() => login())

  it('should be able to delete a credit card', () => {
    cy.visit('http://localhost:5173/credit-cards')

    // Open menu of last credit card and click on delete
    cy.get('tbody tr:last-child td:last-child div').click()
    cy.get('button[type="button"]').contains('Delete').click()

    cy.get('button[type="button"]').contains('Delete credit card').click()
  })
})
