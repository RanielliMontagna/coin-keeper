import { login } from '../../utils/login.cy'

context('Edit Category', () => {
  beforeEach(() => login())

  it('should be able to edit a category', () => {
    cy.visit('http://localhost:5173/categories')

    // Open menu of last category and click on edit
    cy.get('tbody tr:last-child td:last-child div').click()
    cy.get('button[type="button"]').contains('Edit').click()

    cy.get('[placeholder="Enter category name"]').clear().type('Category test edited')
    cy.get('[placeholder="Enter category description"]')
      .clear()
      .type('Category test description edited')
    cy.get('[placeholder="Select category color"]').click()
    cy.contains('Blue').click()

    cy.get('[type="submit"]').click()
  })
})
