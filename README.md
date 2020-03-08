# JavaScript Techdegree Project #2: Pagination & Filtering

## Description

Browsing long lists doesn't provide a good user experience, so this app enhances the usability of a web page by paginating a long list of students into groups of ten students, dynamically adding buttons to the bottom of the page as needed. It does this by using unobtrusive JavaScript and progressive enhancement, so that the web site still works if JavaScript is turned off or isn't working properly. The instant search box filters the student directory in real time, creating the appropriate number of pagination buttons; if there's no search result, an error message is displayed on the page.

A live version of this project can be found [here](https://rliess.github.io/student-list-pagination/).

### Some Additional remarks

- The number of students per page is stored in `NUM_ITEMS_PER_PAGE` to make it easier to potentially change it in the future.
- The function `filterList()` adds/removes the class `js-found` conditionally to/from respective `<li>` elements and feeds a DOM collection based on that class to the pagination functions.
- The search is activated by typing (instant search), pressing `enter` or clicking the search button (necessary in case content is pasted into the input field). ESC clears the search input field.
- If there's no search result an error message is displayed (styles can be found in `extra-styles.css`).
- Tested with Chrome, Firefox & Opera

## Installation

- Download or clone from Github
- Open `index.html` with your favorite browser

## Technologies Used

- DOM traversal
- DOM manipulation
- DOM event handlers

