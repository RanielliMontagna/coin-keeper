import { login } from '../../utils/login.cy'

context('Create Category', () => {
  beforeEach(() => login())

  it('should create a category', () => {
    cy.visit('http://localhost:5173/categories')

    cy.get("button[type='button']").contains('Add Category').click()

    cy.get('[placeholder="Enter category name"]').type('Category test')
    cy.get('[placeholder="Enter category description"]').type('Category test description')
    cy.get('[placeholder="Select category color"]').click()
    cy.contains('Red').click()

    cy.get('[type="submit"]').click()
  })
})
