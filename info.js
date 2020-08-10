window.onload = function(){

    var pagetype = document.querySelector("body").id
    var isInfoPage = pagetype === "errorpanel";
    var isNoSide = pagetype === "no_errorpanel";

    if (isInfoPage) {
        var statusTitle = document.querySelector("#side").querySelector("h3");
        var titleText = document.createTextNode("Submission Status");
        statusTitle.appendChild(titleText);
    } 
    
    if (isNoSide) {
        var sidepanel = document.querySelector("#side");
        document.querySelector("body main").removeChild(sidepanel);
    }
    /*firstnameCheck = function() {
        var fnamefield = document.querySelector("#LastName");
        var fname = fnamefield.getAttribute("value");

        return nameValid(fname);
    };

    lastnameCheck = function() {
        var lnamefield = document.querySelector("#LastName");
        var lname = lnamefield.getAttribute("value");

        return nameValid(lname);
    };*/

    nameValid = function(fieldvalue) {
        var check = /^[A-Z][A-Za-z]{0,5}/;

        return check.test(fieldvalue);
    };

    /*passCheck = function() {
        var passfield = document.querySelector("#Password");
        var passfield2 = document.querySelector("#Re_Password");

        return passfield.getAttribute("value") === passfield2.getAttribute("value") && passValid();
    };*/


    passValid = function(password) {
        /*var passfield = document.querySelector("#Password");
        var password = passfield.getAttribute("value");*/
        var bStart = false;
        var rAlpha = /^[A-Za-z]/;
        var bUpper = false;
        var rUpper = /.*[A-Z].*/;
        var bDigit = false;
        var rDigit = /.*\d.*/;
        var bLength = false;

        if (typeof password === 'string') {
            if (rAlpha.test(password))
                bStart = true;
            if (rUpper.test(password))
                bUpper = true;
            if (rDigit.test(password))
                bDigit = true;
            if (password.length == 6)
                bLength = true;
            
            return bStart && bUpper && bDigit && bLength;
        } else {
            return false;
        }
    };


    usernameCheck = function(username) {
        var rStart = /^[A-Za-z]/;

        return username.length >= 6 && rStart.test(username);
    };


    displayError = function(locID, msg) {
        msgLoc = document.querySelector("#" + locID);

        msgLoc.innerHTML = msg;
    };


    clearErrors = function() {
        errors = document.querySelectorAll("#side p");
        errors.forEach(ele=>ele.innerHTML = "");
    };


    formValidate = function(formdata) {
        var test = true;

        clearErrors();

        //Name field check
        if (!nameValid(formdata.fName.value) || !nameValid(formdata.lName.value)) {
            var nameEmpty = false;

            if (formdata.fName.value.length == 0) {
                nameEmpty = true;
            }

            if (formdata.lName.value.length == 0) {
                nameEmpty = true;
            }

            if (!nameEmpty) {
                displayError("name_error", "Names should start with a capital letter and should only contain alphabetical letters.");
            } else {
                displayError("name_error", "Missing name.");
            }

            test = false;
        }

        //Password check
        if (formdata.password.value === formdata.re_password.value) {
            if (!passValid(formdata.password.value)) {
                var passEmpty = false;

                if (formdata.password.value.length == 0) {
                    passEmpty = true;
                }
    
                if (formdata.re_password.value.length == 0) {
                    passEmpty = true;
                }

                if (!passEmpty) {
                    displayError("pass_error", "Passwords should be 6 letters long and contain at least 1 number and 1 capital letter.");
                } else {
                    displayError("pass_error", "Password not entered.");
                }
                
                test = false;
            } 
        } else {
            displayError("pass_error", "The passwords given do not match.");
            test = false;
        }

        //Username Check
        if (!usernameCheck(formdata.username.value)) {
            if (formdata.username.value.length != 0) {
                displayError("username_error", "Valid usernames should be at least 6 characters long and start with an alphabetical character.");
            } else {
                displayError("username_error", "Username is required.");
            }
            test = false;
        }

        //Education level check
        if (formdata.edLvl.value === "0") {
            displayError("edlvl_error", "Please select your education level.");
            test = false;
        }

        //Graduation Status check
        if (formdata.gradStatus.value === "none") {
            displayError("grad_error", "Select your education status.");
            test = false;
        }

        return test;
    };

}