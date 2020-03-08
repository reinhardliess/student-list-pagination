# JavaScript Techdegree Project #2: Pagination & Filtering

## Description

The goal of this project was to enhance the usability of a long student list (of undetermined length) by splitting it up in pages of 10 students each, providing the appropriate number of buttons for navigation.

A live version of this project can be found [here](https://rliess.github.io/student-list-pagination/).

### Some Additional remarks

- The number of students per page is stored in `NUM_ITEMS_PER_PAGE` to make it easier to potentially change it in the future.
- The function `filterList()` adds/removes the class `js-found` conditionally to/from respective `<li>` elements and feeds a DOM collection based on that class to the pagination functions.
- The search is activated by typing (instant search), pressing `enter` or clicking the search button (necessary in case content is pasted into the input field). ESC clears the search input field.
- If there's no search result an error message is displayed (styles can be found in `extra-styles.css`).
- Tested with Chrome, Firefox & Opera

## Technologies Used

- DOM traversal
- DOM manipulation
- DOM event handlers

### Some additional coding conventions

- Constants (there's only one, see above) are all uppercase, spaced out with underscores for readability
- In for-loop conditions, the length of collections is cached in a variable.
- Additional spaces around nested function calls.
