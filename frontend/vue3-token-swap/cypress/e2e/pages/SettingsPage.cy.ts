describe('Settings Page', () => {
  beforeEach(() => {
    // Visit the settings page.
    cy.visit('/settings')
  })

  it('displays the settings header and toggles', () => {
    // Scope to the container with the "setting" class.
    cy.get('.setting').within(() => {
      // Verify the header is visible.
      cy.contains('Settings').should('be.visible')
      // Verify there is one checkbox in the settings component.
      cy.get('input[type="checkbox"]').should('have.length', 1)
    })
  })

  it('toggles dark mode and applies the dark class to the document', () => {
    // Initially, dark mode should be off.
    cy.get('html').should('not.have.class', 'dark')
    // Toggle the Dark Mode switch (assumed to be the first checkbox).
    cy.get('input[type="checkbox"]').first().check({ force: true })
    // Verify that the <html> element gets the 'dark' class.
    cy.get('html').should('have.class', 'dark')
    // Then toggle it off.
    cy.get('input[type="checkbox"]').first().uncheck({ force: true })
    cy.get('html').should('not.have.class', 'dark')
  })
})
