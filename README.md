# JavaScript Techdegree Project #2: Pagination & Filtering

A live version of this project can be found [here](https://rliess.github.io/js-techdegree-project2/).

The goal of this project was to enhance the usability of a long student list (of undetermined length) by splitting it up in pages of 10 students each, providing the appropriate number of buttons for navigation.


## Basic Project requirements

* All code for this project must be plain vanilla JavaScript - no libraries like jQuery or code snippets created by others.
* No inline JavaScript
* Use [unobtrusive JavaScript](https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript) and [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement#Core_principles). The website must still be fully functional if JavaScript is turned off or unavailable. 
* Create pagination links/buttons and show 10 students per page.
* The app must work for any number of students.
* Add meaningful code comments.

## Exceeds Grade Project Requirements

* Dynamically add a search component on the page (input text field and button).
* Creating a live/instant search functionality is encouraged.
* Paginate search results if necessary.
* Handle no results found and display an error message if needed.


### Some Additional remarks

* The number of students per page was stored in `NUM_ITEMS_PER_PAGE` to make it easier to potentially change it in the future.
* The function `filterList()` adds/removes the class `js-found` conditionally to/from respective `<li>` elements and feeds a DOM collection based on that class to the pagination functions. 
* The search is activated by typing (instant search), pressing `enter` or clicking the search button (necessary in case content is pasted into the input field). ESC clears the search input field.
* If there's no search result an error message is displayed (styles can be found in `extra-styles.css`).
    
    
### Some additional coding conventions

* Constants (there's only one, see above) are all uppercase, spaced out with underscores for readability
* In for-loop conditions, the length of collections is cached in a variable.
* Additional spaces around nested function calls.
