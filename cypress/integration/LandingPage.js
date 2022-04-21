describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('render landing page', () => {
    cy.get('.login').should('be.visible')
    cy.get('.signup').should('be.visible')
  })

})
