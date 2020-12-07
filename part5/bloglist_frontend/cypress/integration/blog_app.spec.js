describe('Blog app', function() {
  beforeEach(function() {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/testing/reset',
      failOnStatusCode: false
    })
    const user = {
      name: 'Anna Noga',
      username: 'anna',
      password: 'annanoga'
    }
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/users/',
      failOnStatusCode: false
    })
    cy.visit('http://localhost:3000')
  })

    it('Login form is shown', function() {
      cy.contains('Login to application')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('anna')
        cy.get('#password').type('annanoga')
        cy.get('#login-button').click()
        cy.contains('Anna Noga is logged in')
      })

      it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('wrong')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
      })
    })
})

