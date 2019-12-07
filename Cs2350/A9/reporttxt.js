/*

   Author:   Sam Gamez
   Date:     3/25/2018

   Filename: report.js

*/
(function () {
      /**
       * Initializes the contents of the Web page
       */
      document.addEventListener("DOMContentLoaded", initPage);
      function initPage() {
            var dataFields = [];

            var expenseEntryElements = document.getElementsByClassName("expenseEntry")

            for (var element of expenseEntryElements) {
                  dataFields.push(element);
                  element.addEventListener("blur", upDate);
            }

            var formElement = document.getElementById("expform");
            formElement.addEventListener("submit", function(event){
                  // If the form is not valid, prevent submission.
                  if (!validateForm()) {
                        event.preventDefault();
                  }
            });


      }

      /**
       * Tests a field for its length
       */
      function testLength(field) {
            if (field.value.length === 0){
                  field.style.background = "yellow";
                  return false;
            }
            else {
                  field.style.background = "white";
                  return true;
            }
      }

      /**
       * Tests a field for its pattern
       */
      function testPattern(field, regx) {
            var fieldMatches = regx.test(field.value);
            if (!fieldMatches) {
                  field.style.background = "yellow";
                  field.style.color = "red";
                  return false;
            }
            else {
                  field.style.background = "white";
                  field.style.color = "black";
                  return true;
            }
      }

      /**
       * Validates a Web form.
       */
      function validateForm() {
            var isValid = true;
            
            // Test required fields.
            if (!testLength(document.forms[0].lname)){
                  isValid = false;
            }
            if (!testLength(document.forms[0].fname)){
                  isValid = false;
            }
            if (!testLength(document.forms[0].address)){
                  isValid = false;
            }
            if (!testLength(document.forms[0].summary)){
                  isValid = false;
            }

            // Test fields with special formats such as SSN.
            if (!testPattern(document.forms[0].account, /ACT\d{6}/)){
                  isValid = false;
            }
            if (!testPattern(document.forms[0].department, /DEPT\d{3}/)){
                  isValid = false;
            }
            if (!testPattern(document.forms[0].project, /PROJ\d{5}/)){
                  isValid = false;
            }
            if (!testPattern(document.forms[0].ssn, /\d{3}-\d{2}-\d{4}/)){
                  isValid = false;
            }

            if (!isValid){
                  alert("Please fill out all required fields in the proper format.");
            }

            return isValid;
      }

      /**
       * Calculates the costs within one row of the travel report
       */
      function calcRow(row) {
            var travel = parseFloat(document.forms[0].elements["travel" + row].value);
            var lodge = parseFloat(document.forms[0].elements["lodge" + row].value);
            var meal = parseFloat(document.forms[0].elements["meal" + row].value);

            return travel + lodge + meal;
      }

      /**
       * Calculates the total cost of the travel
       */
      function calcTotal(){
            var totalExp = 0;

            for (var rowIdx = 1; rowIdx <= 4; rowIdx++){
                  totalExp += calcRow(rowIdx);
            }

            return totalExp;
      }

      /**
       * Updates the total travel cost
       */
      function upDate(event){
            //Regex used to test if a given value is a number.
            var numRegExp = /^\d*(\.\d{0,2})?$/;
            
            if (numRegExp.test(this.value)){

                  // Fix to 2 decimal places.
                  this.value = parseFloat(this.value).toFixed(2);

                  // Calculate the row and column totals.
                  for (var idx = 1; idx <= 4; idx++){
                        document.forms[0].elements["sub" + idx].value = calcRow(idx).toFixed(2);

                        document.forms[0].elements["total"].value = calcTotal().toFixed(2);
                  }
            }
            else{
                  alert("Invalid currency value");
                  this.value = 0.00;
                  this.focus();
            }
      }
})();
