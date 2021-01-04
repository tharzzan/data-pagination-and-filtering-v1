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



   // ----------- start here ---------------
   const itemsPerPage = 9
   const startIndex = (page * itemsPerPage) - itemsPerPage
   const endIndex = (page * itemsPerPage) - 1

   const ulStudentList = document.querySelector('.student-list')
   ulStudentList.innerHTML = '' // reset ul when loading
   
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
            type :'button',
            textContent :i
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


// Call functions
showPage(data,1)
addPagination(data)