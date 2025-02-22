// cypress/e2e/HomeView.cy.ts
describe('HomeView E2E Flow', () => {
  beforeEach(() => {
    // Intercept the fetch to the tokenPrices endpoint
    cy.intercept('GET', 'http://localhost:3000/tokenPrices', {
      fixture: 'tokenPrices.json',
    }).as('getTokenPrices')

    // Visit the root path (assuming your dev server runs on localhost:4173 or similar)
    cy.visit('http://localhost:4173/')
  })

  it('displays loading skeleton then shows swap form once data is loaded', () => {
    // 1. Initially, we expect the loading skeleton to be visible
    cy.get('[data-cy="loading-skeleton"]').should('be.visible')

    // 2. Wait for the token prices request to complete
    cy.wait('@getTokenPrices')

    // 3. The skeleton should now be gone, and the swap form should appear
    cy.get('form').should('be.visible') // swap form

    // The from/to currency selects should contain the tokens from `tokenPrices.json`
    // e.g. if your fixture has ["ATOM", "ETH", "USDC"], check that the selects have these
    // This step might vary depending on how you generate `availableCurrencies`.
    // We'll do a sample check if you know which currency is definitely there:
    cy.get('select').first().select('ATOM')
    cy.get('select').last().select('ETH')
  })

  it('performs a swap and displays result in the SwapList', () => {
    cy.wait('@getTokenPrices')

    // Fill "From Currency"
    cy.get('select').first().select('ATOM')

    // Fill "Amount to send"
    cy.get('#input-amount').type('10')

    // Fill "To Currency"
    cy.get('select').last().select('ETH')

    // Confirm swap
    cy.contains('button', 'CONFIRM SWAP').click()

    // Now check that a new swap item is displayed in the list.
    // Assuming your SwapList items have a data-cy or some unique attribute.
    // Or we can just check text:
    cy.contains('10 ATOM')   // from side
    cy.contains(' ETH')      // to side

    // Optionally check the computed toAmount if you know your fixture's prices (e.g. 10 ATOM → X ETH)
    // e.g. if 1 ATOM = $10, 1 ETH = $2000 => toAmount= $100 / $2000 = 0.05
    cy.contains('0.05 ETH')
  })

  it('shows error card if the token prices fail to load', () => {
    // Override the intercept to return a 500 error
    cy.intercept('GET', 'http://localhost:3000/tokenPrices', {
      statusCode: 500,
      body: {},
    }).as('getTokenPricesFail')

    // Visit again to trigger the failing request
    cy.visit('http://localhost:4173/')
    cy.wait('@getTokenPricesFail')

    // The error card should appear
    cy.contains('Could not load token prices at the moment.').should('be.visible')

    // The form should not appear
    cy.get('form').should('not.exist')
  })
})
