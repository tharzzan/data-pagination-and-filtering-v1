/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/**
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * @param {*} list - A ___list___ parameter to represent student data that will be passed as an argument when the function is called
 * @param {*} page - A ___page___ parameter to represent the page number that will be passed as an argument when the function is called
 */
function showPage(list, page) {
   const itemsPerPage = 9
   let startIndex = (page * itemsPerPage) - itemsPerPage
   let endIndex = (page * itemsPerPage) - 1

   const ulStudentList = document.querySelector('.student-list')
   ulStudentList.innerHTML = '' // reset ul when loading

   for (let i = 0; i < list.length; i++) {

      if ((i >= startIndex) && (i <= endIndex)) {
         // let's first get all the details
         let profilePicURL = list[i].picture.large
         let fullName = `${list[i].name.first} ${list[i].name.last}`
         let email = list[i].email
         let joinDate = `Joined ${list[i].registered.date}`

         // then create all the necessary HTML structure
         const li = document.createElement('li')
         li.className = 'student-item cf'

            const divStudentDetails = document.createElement('div')
            divStudentDetails.className = 'student-details'
            
               const img = document.createElement('img')
               img.className = 'avatar'
               img.src = profilePicURL
               img.alt = 'Profile Picture'

               const h3 = document.createElement('h3')
               h3.textContent = fullName

               const spanEmail = document.createElement('span')
               spanEmail.className = 'email'
               spanEmail.textContent = email

               divStudentDetails.appendChild(img)
               divStudentDetails.appendChild(h3)
               divStudentDetails.appendChild(spanEmail)

            const divJoinedDetails = document.createElement('div')
            divJoinedDetails.className = 'joined-details'

               const spanDate = document.createElement('span')
               spanDate.className = 'date'
               spanDate.textContent = joinDate

               divJoinedDetails.appendChild(spanDate)
         
         li.appendChild(divStudentDetails)
         li.appendChild(divJoinedDetails)

         ulStudentList.appendChild(li)


         // <li class="student-item cf">
         //    <div class="student-details">
         //       <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
         //       <h3>Ethel Dean</h3>
         //       <span class="email">ethel.dean@example.com</span>
         //    </div>
         //    <div class="joined-details">
         //       <span class="date">Joined 12-15-2005</span>
         //    </div>
         // </li>
     
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data,1)