describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('render landing page', () => {
    cy.get('.login').should('be.visible')
    cy.get('.signup').should('be.visible')
  })

  it('it should render Register form', () => {
    cy.get('button[data-testid="register-btn"]').click();
    cy.get('input[data-testid="register-form-username"]').should('be.visible');
    cy.get('input[data-testid="register-form-email"]').should('be.visible');
    cy.get('input[data-testid="register-form-password"]').should('be.visible');
  })

  it('it should fill and submit form with register button', () => {
    cy.get('button[data-testid="register-btn"]').click();
    cy.get('input[data-testid="register-form-username"]').type('cypress');
    cy.get('input[data-testid="register-form-email"]').type('cypressTest@gmail.com');
    cy.get('input[data-testid="register-form-password"]').type('password');
    cy.get('button[data-testid="register-form-btn"]').click();
    cy.url({ timeout: 3000 }).should('includes', '/');
    cy.contains('Registration completed successfully')
  })

  it('it should fill and submit form with register button and fail', () => {
    cy.get('button[data-testid="register-btn"]').click();
    cy.get('input[data-testid="register-form-username"]').type('ila');
    cy.get('input[data-testid="register-form-email"]').type('ila@gmail.com');
    cy.get('input[data-testid="register-form-password"]').type('password');
    cy.get('button[data-testid="register-form-btn"]').click();
    cy.contains('Authentication Error')
  })

  it('it should Register with Google auth', () => {
    cy.get('button[data-testid="register-btn"]').click();
    cy.contains('Google').click().as('googleSignin');
  })
})
