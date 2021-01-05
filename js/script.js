/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/**
 * This function will create the element requested, and assigning the properties & its values
 * @param {string} elementType - HTML element to be created
 * @param {Object} propObj - element properties' key-value pairs
 * @returns {*} HTML element
 */
function createElement(elementType, propObj = {}) {
   const element = document.createElement(elementType)

   for (let i = 0; i < Object.keys(propObj).length; i++) {
      const prop = Object.keys(propObj)[i]
      const value = propObj[prop]
      element[prop] = value
   }

   return element
}

/**
 * This function will create HTML element & append it to the parentNode specified
 * @param {*} parentNode - newly created HTML element will be added to this parentNode
 * @param {string} elementType - HTML element to be created
 * @param {Object} propObj - element properties' key-value pairs
 */
function appendTo(parentNode, elementType, propObj) {
   const element = createElement(elementType, propObj)
   parentNode.appendChild(element)

   return element
}

/**
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * @param {object} list - Represents student data that will be passed as an argument when the function is called
 * @param {number} page - Represents the page number that will be passed as an argument when the function is called
 */
function showPage(list, page) {
   const itemsPerPage = 9
   const startIndex = (page * itemsPerPage) - itemsPerPage
   let endIndex = (page * itemsPerPage) - 1

   const ulStudentList = document.querySelector('.student-list')
   ulStudentList.innerHTML = '' // reset ul when loading

   if (endIndex > (list.length - 1)) {
      endIndex = list.length - 1
   }
   
   // loop to render the student data
   for (let i = startIndex; i <= endIndex; i++) {
      // 1. let's get all the details
      let profilePicURL = list[i].picture.large
      let fullName = `${list[i].name.first} ${list[i].name.last}`
      let email = list[i].email
      let joinDate = `Joined ${list[i].registered.date}`

      // 2. then create all the necessary HTML structure
      const li = appendTo(ulStudentList,'li',{
         className: 'student-item cf'})

         const divStudentDetails = appendTo(li,'div',{className: 'student-details'})
            appendTo(divStudentDetails, 'img',{
               className: 'avatar',
               src: profilePicURL,
               alt: 'Profile Picture'
            })
            appendTo(divStudentDetails,'h3',{
               textContent: fullName})
            appendTo(divStudentDetails,'span', {
               className: 'email',
               textContent: email
            })
         
         const divJoinedDetails = appendTo(li,'div',{className: 'joined-details'})
            appendTo(divJoinedDetails,'span', {
               className: 'date',
               textContent: joinDate   
            })
   }
}


/**
 * This function creates and appends functioning pagination buttons.
 * @param {object} list - Represent student data that will be passed as an argument when the function is called.
 */
function addPagination(list) {
   const numOfBtns = Math.ceil(list.length / 9)
   const ulLinkList = document.querySelector('.link-list')
   ulLinkList.innerHTML = '' // reset ul when loading

   // create pagination buttons
   for (let i = 1; i <= numOfBtns; i++) {
      const li = createElement('li')
         appendTo(li,'button',{
            type: 'button',
            textContent: i
         })

      ulLinkList.appendChild(li)
   }

   // select the first pagination button
   let firstButton = ulLinkList.querySelector('button')
   firstButton.className = 'active'

   ulLinkList.addEventListener('click', (event) => {
      const selectedNum = Number(event.target.textContent)
      const btnLis = ulLinkList.children

      for (let i = 0; i < numOfBtns; i++) {
         let btn = btnLis[i].firstElementChild

         if (i === (selectedNum - 1)) {
            // if this is the clicked button
            btn.className = 'active'
            showPage(list, selectedNum)
         }
         else {
            btn.className = ''
         }
      }
   })
}


function addSearchBar(list) {
   const header = document.querySelector('header')
   
   // create search box
   const searchLabel = appendTo(header, 'label', {
      htmlFor: 'search',
      className: 'student-search'
   })
      const searchBar = appendTo(searchLabel, 'input', {
         id: 'search',
         placeholder: 'Search by name...'
      })
      const searchButton = appendTo(searchLabel, 'button', {
         type:'button'
      })
         appendTo(searchButton, 'img', {
            src: 'img/icn-search.svg',
            alt: 'Search icon'
         })
   
   function performSearch() {
      const searchTerm = searchBar.value
      const searchResult = []

      for (let i = 0; i < list.length; i++) {
         let fullName = `${list[i].name.first} ${list[i].name.last}`.toLowerCase()

         if (fullName.search(searchTerm) > -1) {
            // if found
            searchResult.push(list[i])
         }
      }
      
      if (searchResult.length > 0) {
         // If there are search result, then produce the result page
         showPage(searchResult,1)
         addPagination(searchResult)
      }
      else {
         // if no search result, then show "no result" message
         const ulStudentList = document.querySelector('.student-list')
         ulStudentList.innerHTML = '<h3>No Result Found...</h3>'

         const ulLinkList = document.querySelector('.link-list')
         ulLinkList.innerHTML = ''
      }
   }

   searchButton.addEventListener('click', (event) => {
      performSearch()
   })

   searchBar.addEventListener('keyup', (event) => {
      performSearch()
   })

}


// Produce the webpage
showPage(data,1)
addPagination(data)
addSearchBar(data)