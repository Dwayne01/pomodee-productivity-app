describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('render landing page', () => {
    cy.get('.login').should('be.visible')
    cy.get('.signup').should('be.visible')
  })

  it('it should render Login form', () => {
    cy.get('button[data-testid="login-btn"]').click();
    cy.get('input[data-testid="login-form-email"]').should('be.visible');
    cy.get('input[data-testid="login-form-password"]').should('be.visible');
  })

  it('it should fill and submit form with Login button', () => {
    cy.get('button[data-testid="login-btn"]').click();
    cy.get('input[data-testid="login-form-email"]').type('ila@gmail.com');
    cy.get('input[data-testid="login-form-password"]').type('password');
    cy.get('button[data-testid="login-form-btn"]').click();
    cy.url({ timeout: 3000 }).should('includes', '/');
    cy.contains('Login successfull')
  })

  it('it should Login with Google auth', () => {
    cy.get('button[data-testid="login-btn"]').click();
    cy.contains('Google').click().as('googleSignin');
  })
})
