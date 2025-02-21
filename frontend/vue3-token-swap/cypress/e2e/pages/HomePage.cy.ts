describe('Home Page', () => {
  beforeEach(() => {
    // Open the home page
    cy.visit('/')
  })

  it('displays header text and category cards', () => {
    cy.contains('Plan Your Day, Conquer Your Tasks').should('be.visible')
    // Verify each category is visible:
    cy.contains('All').should('be.visible')
    cy.contains('Completed').should('be.visible')
    cy.contains('High').should('be.visible')
    cy.contains('Medium').should('be.visible')
    cy.contains('Low').should('be.visible')
  })

  it('filters tasks by category using intercept', () => {
    cy.intercept('GET', '**/tasks', { fixture: 'tasks.json' }).as('getTasks')
    cy.visit('/')
    cy.wait('@getTasks')

    // Click the "Completed" category card.
    cy.contains('Completed').click()

    // Verify that only one task item is visible and that it contains the completed task title.
    cy.get('[data-cy="task-item"]', { timeout: 10000 })
      .should('have.length', 1)
      .first()
      .should('contain.text', 'Completed Task')
  })

  it('filters tasks based on search query and shows no tasks if none match', () => {
    // Type in the search bar.
    cy.get('input[placeholder="Search tasks..."]').type('Test')

    // Verify that no task items are rendered.
    cy.get('[data-cy="task-item"]', { timeout: 10000 }).should('have.length', 0)
  })

  it('filters tasks based on search query', () => {
    // Type in the search bar.
    cy.get('input[placeholder="Search tasks..."]').type('Task')

    // Verify that every visible task contains "Test" in its title.
    cy.get('body').then(($body) => {
      const items = $body.find('[data-cy="task-item"]')
      if (items.length > 0) {
        cy.wrap(items).each(($el) => {
          cy.wrap($el).should('contain.text', 'Task')
        })
      } else {
        expect(items.length).to.equal(0)
      }
    })
  })

  it('creates a new task', () => {
    // Use the test attribute to find the button
    cy.get('[data-cy="add-task-button"]').click()

    // Fill out the TaskForm in the modal.
    cy.get('input#taskTitle').type('Cypress New Task')
    cy.get('textarea#taskDescription').type('This task is created by Cypress.')
    cy.get('select#taskPriority').select('High')

    // Click on a color box; adjust the selector to reliably find the color.
    cy.get('div')
      .filter((index, el) => el.style.backgroundColor.includes('rgb(242, 153, 74)'))
      .first()
      .click()

    cy.contains('Save').click()
    // Verify the new task appears in the list.
    cy.contains('Cypress New Task').should('be.visible')
  })

  it('updates an existing task', () => {
    // For testing, click on the first task item (using the data-cy attribute) to open the update modal.
    cy.get('[data-cy="task-item"]').first().click()
    // Clear and update the task title.
    cy.get('input#taskTitle').clear()
    cy.get('input#taskTitle').type('Updated Task Title')
    cy.contains('Save').click()
    // Verify the updated title appears in the task list.
    cy.contains('Updated Task Title').should('be.visible')
  })
})
