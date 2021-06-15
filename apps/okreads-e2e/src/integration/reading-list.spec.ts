describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should get an option to mark as finished and on click should set finished date', async () => {
    /*Search for keyword */
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();

    /* Add book to reading list */
    cy.get('[data-testing="want-to-read"]:enabled').first().click();

    /* Open reading list */
    cy.get('[data-testing="toggle-reading-list"]').click();

    /* Mark book as finished */
    cy.get('[data-testing="mark-finished"][ng-reflect-color="basic"]').click();

    /* Check that finished on text is showing up */
    cy.get('[data-testing="finished-date"]').should('contain.text', 'Finished on');

    /* Check that button has been disabled and text has changed */
    cy.get('[data-testing="want-to-read"]').first().should('be.disabled');
    cy.get('[data-testing="want-to-read"]').first().should('contain.text', 'Finished');

    /* Remove book */
    cy.get('[data-testing="remove-book"]').click();
    
  });
});
