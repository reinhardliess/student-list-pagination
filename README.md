# JavaScript Techdegree Project #2: Pagination & Filtering

The goal of this project was to enhance the usability of a long student list (of undetermined length) by splitting it up in pages of 10 students, providing the appropriate number of buttons for navigation.

It follows the principles of [unobtrusive JavaScript](https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript) and [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), so that the website is still usable if JavaScript is turned off or unavailable.

## The following additional functionality was added

* The number of students per page was stored in `NUM_ITEMS_PER_PAGE` to make it easier to potentially change it in the future.
* Search functionality (input field and search button) is added dynamically to the HTML.
    * It's possible to search for name and/or email address of students. The function `filterList()` adds conditionally the class `js-found` to respective `<li>` elements. 
    * The search is activated by typing (instant search), pressing `enter`or clicking the search button.
    * error message, styles