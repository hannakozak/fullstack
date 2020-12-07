describe('Blog app', function() {
  beforeEach(function() {

    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/testing/reset',
      failOnStatusCode: false
  })
    
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })

  
})

