"use strict";

/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Reinhard Liess, 2018
******************************************/

/* Some additional conventions

* constants (there's only one) are all uppercase, spaced out with underscores for readability
* In for loop conditions, the length of collections is cached in a variable
* Additional spaces around nested function calls 

*/ 
 
// global declarations

// students per page
const NUM_ITEMS_PER_PAGE = 10;

// main div
const divPage = document.querySelector('.page');

// general purpose functions 

// creates DOM element, sets HTML attributes in object oProps
const createElementEx = (elementName, oProps) => {
  const element = document.createElement(elementName);
  
  for (const prop in oProps) {
      if ( oProps.hasOwnProperty(prop) ) {
        element[prop] = oProps[prop];
      }
  }
  return element;
}

// adds tag to target element as a child, sets HTML attributes in oProps
const appendChildEx = (tag, target, oProps) => {
  const element = createElementEx(tag, oProps);
  
  target.appendChild(element);
  return element;
} 

// app specific functions

// display page (parameter), hide everything else
const showPage = (listItems, page) => { 
   
    
  for (let i = 0, l = listItems.length; i < l; i++) {
    const start = (page - 1) * NUM_ITEMS_PER_PAGE;
    const end   =  start + NUM_ITEMS_PER_PAGE - 1;

    listItems[i].style.display = (i >= start && i <= end) ? '' : 'none';
  }
  
  
};

// removes pagination buttons, necessary for switching between browse & search modes
const removePageButtons = () => {
  
  const divPagination = document.querySelector('div.pagination');
  
  if (divPagination) {
    const divPage = divPagination.parentNode;
    divPage.removeChild(divPagination);
  }
  
}

// appends pagination buttons, no button shown in case of only one page
const appendPageLinks = listItems => {

  /* <!-- pagination HTML to create dynamically -->
    <div class="pagination">
    <ul>
      <li>
        <a class="active" href="#">1</a>
      </li>
    </ul>
  </div>
  
 */  
   
  // calculate number of pages, prevent showing a button if there's only one page
  const numPages = listItems.length <= NUM_ITEMS_PER_PAGE ? 
                    0 : 
                    Math.ceil(listItems.length / NUM_ITEMS_PER_PAGE);

  
  // necessary for switching between browse and search modes
  removePageButtons();
  
  const ul = appendChildEx('div', divPage, { className: 'pagination' })
        .appendChild( document.createElement('ul') );
  
  for (let i = 1; i <= numPages; i++) {
    let anchor = appendChildEx('a', ul.appendChild( document.createElement('li') ), 
                                 { href: '#', textContent: i} );
    if (i === 1) {
      anchor.className = 'active';
    }
    anchor.addEventListener('click', () => {
      showPage(listItems, i);
      
      // change active page button/link
      const anchors = ul.querySelectorAll('a');
      for (let j = 0, l = anchors.length; j < l; j++) {
        if (j === i - 1) {
          anchors[j].classList.add('active'); 
        } else {
          anchors[j].classList.remove('active'); 
        }
      }
      
    });
  }
 
}

// initializes pagination for browse mode
const initBrowse = () => {

  /* NB:  when coming from search mode (ESC pressed), the class js-found might be attached
          to all the <li> elements found the last time.
          There's no need to remove them, the search mode will set them correctly
          during a new search and they have no relevance for browse mode. 
  */

  let listStudents = document.querySelectorAll('li.student-item');  
  
  appendPageLinks(listStudents);
  showPage(listStudents, 1);
}

// displays error when no results were found
const displayError = searchInput => {
  
  /* <div class="js-not-found">
        <p><span>[search expression]</span> not found.</p>      
        <p>Try​ ​searching​ ​again​ ​using​ ​a​ ​different​ ​spelling​ ​or keyword.</p>
      </div>
  */    
  
  let divError = document.querySelector('.js-not-found');
  
  // prevent multiple instances of the error message showing up
  // update search string that wasn't found
  if (divError) {
    const span = document.querySelector('.js-not-found span');
    
    span.textContent = searchInput;
  
  } else {
  
    divError = createElementEx('div', { className: 'js-not-found'});
    const ul = document.querySelector('.student-list');
    
    appendChildEx('p', divError, { innerHTML: `<span>${searchInput}</span> not found.`});
    appendChildEx('p', divError, { textContent: 'Try​ ​searching​ ​again​ ​using​ ​a​ ​different​ ​spelling​ ​or keyword.'});
    
    divPage.insertBefore(divError, ul);
      
  }
  
}

// removes error message from screen
const removeError = () => {
   
  const divError = document.querySelector('.js-not-found');
  if (divError) {
    divPage.removeChild(divError);
  }
}

// checks if search term matches name or email, adds class js-found if true
const filterList = () => {
  
  /*  <div class="student-details">
        <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/10.jpg">
        <h3>elsa lahti</h3>
        <span class="email">elsa.lahti@example.com</span>
      </div>
  */
  
  // collection of divs containing the student details
  const divsDetails = document.querySelectorAll('.student-details');
  
  // search box
  const inputSearch = document.querySelector('.student-search input');
  let numFound = 0;
  
  // iterate through the student list
  for (let i = 0, l = divsDetails.length; i < l; i++) {
    let isFound = false;
    let listInfo = divsDetails[i].children;
    
    // iterate through student-details
    for (let j = 0, m = listInfo.length; j < m; j++) {
      if (listInfo[j].tagName === 'H3' || listInfo[j].tagName === 'SPAN') {
        let textToSearch = listInfo[j].textContent.toLowerCase();
        if (textToSearch.indexOf(inputSearch.value.toLowerCase() ) > -1) {
          isFound = true;
        }
      } 
    } // end of 'for j'
    let li = divsDetails[i].parentNode;
    if (isFound) {
      li.classList.add('js-found');
      
      // at least one student was found, remove error message, if shown
      removeError();
      
      // if found student is on first page, show
      li.style.display = ++numFound <= NUM_ITEMS_PER_PAGE ? '' : 'none';
    } else {
      // if not found always hide
      li.classList.remove('js-found');
      li.style.display = 'none';
    } 
  } // end of 'for i'

  if (numFound === 0) {
    displayError(inputSearch.value);
  }
  // recreate pagination links for search
  const listFound = document.querySelectorAll('.js-found');
  appendPageLinks(listFound);
  
}

// dynamically create HTML for search function
const initSearch = () => {
  
  /* <!-- student search HTML to add dynamically -->
    <div class="student-search">
      <input title="Instant search for name or email, ESC clears input field." placeholder="Search for students...">
      <button>Search</button>
    </div>
  */
  
  const divHeader = document.querySelector('.page-header');
  const divSearch = appendChildEx('div', divHeader, { className: 'student-search'});

  const inputSearch = appendChildEx('input',  divSearch, {type: 'text', placeholder: 'Search for students...', 
      title: 'Instant search for name or email, ESC clears input field.'});
  const btnSearch = appendChildEx('button', divSearch, { textContent: 'Search'} );
  
  // add necessary event handlers
  btnSearch.addEventListener('click', () => {
    filterList();
  });
  
  inputSearch.addEventListener('keyup', (event) => {
        switch (event.keyCode) {
        // escape
        case 27:
          // switch back to browsing
          inputSearch.value = '';
          removeError();
          initBrowse();
          break;
        // enter 
        case 13: 
          // Search
          filterList();
          break;
        // 
        default:
          // 
          filterList();
          break;
       }
  })
}

// global execute section when website loads

initSearch();
initBrowse();







