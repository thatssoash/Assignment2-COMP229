/*  File Name: Assignment 2
    Name: Asheka Hall
    Student Id: 301064568 
    Date: October 25, 2020 */

//const { event } = require("jquery");

//IIFE -- Immeadiately Invoked Function Expression

(function() {
   function Start()
   {
       console.log("App Started...");

       let deleteButtons = document.querySelectorAll('.btn-danger')

       for(button of deleteButtons){
           button.addEventListener('click', (event) =>{
               if(!confirm('Are You Sure?'))
               {
                   event.preventDefault();
                   window.location.assign('/book-list');
               }
           });
       }

       if(document.title == "Contact")
       {
           let sendbtn = document.getElementById("sendbtn");
           let cancelbtn = document.getElementById("cancelbtn");
           let form = document.forms[0];

           sendbtn.addEventListener("click", (event) =>{
               event.preventDefault();

               let fName = document.getElementById("fName").value;
               let lName = document.getElementById("lName").value;
               let contactNum = document.getElementById("contactNum").value;
               let emailAdd = document.getElementById("emailAdd").value;
               let messageArea = document.getElementById("messageArea").value;

               console.info(`First Name: ${fName}
               Last Name: ${lName}
               Contact Number: ${contactNum}
               Email Address: ${emailAdd}
               Message: ${messageArea}`)

               form.reset();
            
           });

           cancelbtn.addEventListener("click", (event) =>{
            event.preventDefault();
            if (confirm("Are you sure?"))
            {
                location.href =  "/home";

            }
        });
       }

   }

   window.addEventListener("load", Start);

})();
