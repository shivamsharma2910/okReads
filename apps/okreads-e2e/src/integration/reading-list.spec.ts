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

  describe('When: I add a book to readinglist', () => {
    it('Then: I should see a snack bar and unread count should remain consistent after clicking undo', () => {

      cy.get('input[type="search"]').type('javascript');
      cy.get('form').submit();

      const initialReadingListLength = cy.$$('.reading-list-item').length;

      cy.get('[data-testing="add-book"]:enabled').first().click();

      /** check that reading list count increased */
      cy.get('.reading-list-item').should('have.length', initialReadingListLength + 1);

      /** check that snackbar appeared on addition */
      cy.get('.mat-simple-snackbar').should('be.visible');

      /* Click on Undo */
      cy.get('div.mat-simple-snackbar-action button.mat-button-base').click();

      /** check that the reading list count has decreased by 1
      */
      cy.get('.reading-list-item').should('have.length', initialReadingListLength);

    });
  });

  describe('When: I remove book from reading list', () => {
    it('Then: I should see a snack bar and unread count should remain consistent after clicking undo', () => {
      cy.get('input[type="search"]').type('java');
      cy.get('form').submit();

      const initialReadingListLength = cy.$$('.reading-list-item').length;

      /* Add a book to reading list */
      cy.get('[data-testing="add-book"]:enabled').first().click();

      /* Verify that it is added */
      cy.get('.reading-list-item').should('have.length', initialReadingListLength + 1);

      /* Click on remove */
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="remove-book"]').click();

      /** check that snackbar appeared and count decreased on removal */
      cy.get('.reading-list-item').should('have.length', initialReadingListLength);
      cy.get('.mat-simple-snackbar').should('be.visible');

      /** Click On Undo */
      cy.get('div.mat-simple-snackbar-action button.mat-button-base').last().click();

      /* Check that count is restored */
      cy.get('.reading-list-item').should('have.length', initialReadingListLength + 1);

      /* Clean up of reading list */
      cy.get('[data-testing="remove-book"]').click();
    });
  });
});
