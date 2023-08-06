import { login } from '../../utils/login.cy'

context('Delete Category', () => {
  beforeEach(() => login())

  it('should be able to delete a category', () => {
    cy.visit('http://localhost:5173/categories')

    // Open menu of last category and click on delete
    cy.get('tbody tr:last-child td:last-child div').click()
    cy.get('button[type="button"]').contains('Delete').click()

    cy.get('button[type="button"]').contains('Delete category').click()
  })
})
