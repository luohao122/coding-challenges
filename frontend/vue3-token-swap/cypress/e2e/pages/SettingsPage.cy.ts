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
      // Verify there are two checkboxes in the settings component.
      cy.get('input[type="checkbox"]').should('have.length', 2)
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

  it('shows the Sync Now button only when Sync with Server is enabled', () => {
    // Toggle the second checkbox (Sync with Server).
    cy.get('input[type="checkbox"]').eq(1).check({ force: true })
    // Verify that the "Sync Now" button appears.
    cy.contains('Sync Now').should('be.visible')
    // Now turn off sync.
    cy.get('input[type="checkbox"]').eq(1).uncheck({ force: true })
    cy.contains('Sync Now').should('not.exist')
  })

  it('triggers sync when the Sync Now button is clicked', () => {
    // Enable sync.
    cy.get('input[type="checkbox"]').eq(1).check({ force: true })

    // Intercept the GET request for tasks. Adjust the URL pattern as needed.
    cy.intercept('GET', '**/tasks', { fixture: 'tasks.json' }).as('getTasks')

    // Click the Sync Now button.
    cy.contains('Sync Now').click()

    // Wait for the intercepted network request.
    cy.wait('@getTasks')

    // Optionally, check for a notification that indicates sync success.
    // For example, if your app shows a notification with text "Sync complete".
    cy.contains('Sync complete').should('be.visible')
  })
})
