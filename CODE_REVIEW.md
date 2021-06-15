## Code smells:-

1. Unsubscribe is not used for 'getAllBooks' selector in book-search.component.ts (Line #35). The function callback attached to this subscrition will be called continuously, this may cause memory leak and performance issues. I have used async pipe to handle this, async will take care of unsubscribing by itself once the component is destroyed.

2. formatDate() method is not required in book-search.component.ts (Line #40). We can use the built-in filter for that. This is required to improve the performance as a pipe would evaluate the expression only once and will fetch the value from last result as opposed to the current method which is called on each change detection.

3. clearSearch action doesn't clear searchTerm field in the state. The searchTerm persists in the state even when it is cleared from UI.

4. Properties, variables and method names should have self explanatory names. Currently b is used in book-search and reading-list templates.

5. Currently optimistic update is followed in reading-list.reducer.ts, so the state is getting updated as soon as 'addToReadingList' & 'removeFromReadingList' actions are dispatched. But the state is not reverted in case of API failure while updating the reading list. In order to avoid this, changes are done to follow pessimistic update. 2 new actions - 'confirmedAddToReadingList' & 'confirmedRemoveFromReadingList' actions have been created for this.

6. Test cases are failing for reading-list reducer.




## Accessibility issues found during lighthouse testing:-
1. Buttons do not have an accessible name.
2. Background and foreground colors do not have a sufficient contrast ratio.


## Accessibility issues found during manual testing:-
1. 'Want to Read' button text is very generic while using VoiceOver. It does not specify the corresponding book for the button.
2. Alt tag is missing for book images.
3. Anchor tag is used for search example but there is no href. As per accessibility standards anchor tag should have a href with it. As we do not need to navigate from this, changed the tag to span.

## All above mentioned issues have been fixed.

## Improvements:-
1. Application is currently not responsive. UI breaks for mobile and tablet views.
2. Spinner can be shown when search API is fetching results.
3. Error handling is not done for API failure scenarios.