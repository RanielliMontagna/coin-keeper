export function login() {
  cy.visit('http://localhost:5173/')

  cy.get('[placeholder="Enter your email"]').type('teste@teste.com')
  cy.get('[placeholder="Enter your password"]').type('A1s2d3')

  cy.get('[type="submit"]').click()

  cy.url().should('include', '/dashboard')
}
