window.onload = function(){

    //Page identification check
    var pagetype = document.querySelector("body").id
    var isInfoPage = pagetype === "info"; 
    var isReflect = pagetype === "reflect";
    var isWelcome = pagetype === "welcome";

    //Deletion/Modification of side panel depending on page (only kept in info page)
    //Link to current page is styled bold
    if (isInfoPage) {
        //var statusTitle = document.querySelector("#side").querySelector("h3");
        //var titleText = document.createTextNode("Submission Status");
        //statusTitle.appendChild(titleText);
        document.querySelector("#info-link").setAttribute("style", "font-weight:bold;");
    } else {
        var sidepanel = document.querySelector("#side");
        document.querySelector("body main").removeChild(sidepanel);
    }

    if (isReflect) 
        document.querySelector("#reflect-link").setAttribute("style", "font-weight:bold;");
    
    if (isWelcome)
        document.querySelector("#welcome-link").setAttribute("style", "font-weight:bold;");
    //************ */



    /********************************************************************
     * Form validation functions. 
     * Used by formValidate function that is define later in this doc.
     */

    //Checks for name vailidity, where name must start with a capital letter 
    //and contain only letters
    nameValid = function(fieldvalue) {
        var checkCap = /^[A-Z]/; //start with capital
        var checkAlpha = /^[a-zA-Z]+$/; //only letters

        return checkCap.test(fieldvalue) && checkAlpha.test(fieldvalue);
    };

    //Checks password to ensure it is 6 characters long,
    //starts with a letter,
    //at least one digit,
    //at least one capital letter
    passValid = function(password) {
        var bStart = false;
        var rStart = /^[A-Za-z]/; //starts with letter
        var bUpper = false;
        var rUpper = /.*[A-Z].*/; //contains capital
        var bDigit = false;
        var rDigit = /.*\d.*/; //contains digit
        var bLength = false;

        if (typeof password === 'string') { //check if string before testing
            if (rStart.test(password))
                bStart = true;
            if (rUpper.test(password))
                bUpper = true;
            if (rDigit.test(password))
                bDigit = true;
            if (password.length == 6)
                bLength = true;
            
            return bStart && bUpper && bDigit && bLength; //all test must be true to return true
        } else {
            return false;
        }
    };

    //Username check, must start with a letter and at least 6 characters long
    usernameCheck = function(username) {
        var rStart = /^[A-Za-z]/; //starts with letter

        return username.length >= 6 && rStart.test(username);
    };


    /*********************************************************************
     * Side panel message functions and incorrect field highlighting 
     * functions.
     */

    //Displays string msg at element with and id of locID
    //Used for the p elements in side panel
    displayMsg = function(locID, msg) {
        msgLoc = document.querySelector("#" + locID);

        msgLoc.innerHTML = msg;
    };

    //Highlights fields with light red to indicate error
    //Expects the calling function to provide the right identifier
    fieldHighlight = function(loc) {
        document.querySelector(loc).setAttribute("style","background-color:#fd9b9b;");
    }

    //Resets all input fields back to white. Used when new submission is received or fields are cleared
    highlightReset = function() {
        var fields = document.querySelectorAll("input, select");
        fields.forEach(ele=>ele.setAttribute("style","background-color:white;"));
    }

    //Clear the messages from the side panel
    clearMsgs = function() {
        errors = document.querySelectorAll("#side p");
        errors.forEach(ele=>ele.innerHTML = "");
    };


    /*****************************************************
     * Main form validation function
     */
    formValidate = function(formdata) {
        var test = true;

        clearMsgs();
        highlightReset();

        //Name field check
        var fNamePass = nameValid(formdata.fName.value);
        var lNamePass = nameValid(formdata.lName.value)
        if (!fNamePass || !lNamePass) {
            var nameEmpty = false;

            if (formdata.fName.value.length == 0) {
                fieldHighlight("#FirstName");
                nameEmpty = true;
            }

            if (formdata.lName.value.length == 0) {
                fieldHighlight("#LastName");
                nameEmpty = true;
            }

            if (!nameEmpty) {
                displayMsg("name_error", "Names should start with a capital letter and should only contain alphabetical letters.");
                if (!fNamePass)
                    fieldHighlight("#FirstName"); //highlight the field that has an error
                if (!lNamePass)
                    fieldHighlight("#LastName"); //highlight the field that has an error
            } else {
                displayMsg("name_error", "Missing name."); //at least one empty
            }

            test = false;
        }

        //Password check
        if (formdata.password.value === formdata.re_password.value) {
            if (!passValid(formdata.password.value)) {
                var passEmpty = false;

                if (formdata.password.value.length == 0) {
                    fieldHighlight("#Password");
                    passEmpty = true;
                }
    
                if (formdata.re_password.value.length == 0) {
                    fieldHighlight("#Re_Password");
                    passEmpty = true;
                }

                if (!passEmpty) {
                    fieldHighlight("#Re_Password");
                    fieldHighlight("#Password");
                    displayMsg("pass_error", "Passwords should be 6 characters long and contain at least 1 number and 1 capital letter and start with an alphabet.");
                } else {
                    displayMsg("pass_error", "Password not entered.");
                }
                
                test = false;
            } 
        } else {
            fieldHighlight("#Re_Password");
            displayMsg("pass_error", "The passwords given do not match.");
            test = false;
        }

        //Username Check
        if (!usernameCheck(formdata.username.value)) {
            fieldHighlight("#Username");
            if (formdata.username.value.length != 0) {
                displayMsg("username_error", "Valid usernames should be at least 6 characters long and start with an alphabetical character.");
            } else {
                displayMsg("username_error", "Username is required.");
            }
            test = false;
        }

        //Education level check
        //Checks the default selection is still selected
        if (formdata.edLvl.value === "0") {
            fieldHighlight("#EdLevel");
            displayMsg("edlvl_error", "Please select your education level.");
            test = false;
        }

        //Graduation Status check
        //Checks if the hidden radio button is still selected (selected by default to represent no selection)
        if (formdata.gradStatus.value === "none") {
            displayMsg("grad_error", "Select your education status.");
            test = false;
        }

        //All tests pass, print success message
        if (test) {
            displayMsg("success", "Form submission was successful.");
        }

        return test;
    };

}