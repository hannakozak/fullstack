

describe('Blog app', function() {
  beforeEach(function() {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/testing/reset',
      failOnStatusCode: false
    })
    const user = {
      name: 'Hanna Kozak',
      username: 'hanna',
      password: 'hannakozak'
    }
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/users/', user,
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
        cy.get('#username').type('hanna')
        cy.get('#password').type('hannakozak')
        cy.get('#login-button').click()
        cy.contains('hanna kozak is logged in')
      })

      it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('wrong')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
      })
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('hanna')
        cy.get('#password').type('hannakozak')
        cy.get('#login-button').click()
        cy.contains('hanna kozak is logged in')
      })
  
      it('a new note can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a title created by cypress')
        cy.get('#author').type('a author created by cypress')
        cy.get('#url').type('a url created by cypress')
        cy.contains('create').click()
  
        cy.contains('a title created by cypress')
        
      })
    })
})

