window.onload = function(){

    var pagetype = document.querySelector("body").id
    var isInfoPage = pagetype === "info";
    var isReflect = pagetype === "reflect";
    var isWelcome = pagetype === "welcome";

    if (isInfoPage) {
        var statusTitle = document.querySelector("#side").querySelector("h3");
        var titleText = document.createTextNode("Submission Status");
        statusTitle.appendChild(titleText);
        document.querySelector("#info-link").setAttribute("style", "font-weight:bold;");
    } else {
        var sidepanel = document.querySelector("#side");
        document.querySelector("body main").removeChild(sidepanel);
    }

    if (isReflect) 
        document.querySelector("#reflect-link").setAttribute("style", "font-weight:bold;");
    
    if (isWelcome)
        document.querySelector("#welcome-link").setAttribute("style", "font-weight:bold;");



    nameValid = function(fieldvalue) {
        var check = /^[A-Z][A-Za-z]{0,5}/;

        return check.test(fieldvalue);
    };


    passValid = function(password) {
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


    displayMsg = function(locID, msg) {
        msgLoc = document.querySelector("#" + locID);

        msgLoc.innerHTML = msg;
    };


    fieldHighlight = function(locID) {
        document.querySelector(locID).setAttribute("style","background-color:#fd9b9b;");
    }


    highlightReset = function() {
        var fields = document.querySelectorAll("input, select");
        fields.forEach(ele=>ele.setAttribute("style","background-color:white;"));
    }


    clearMsgs = function() {
        errors = document.querySelectorAll("#side p");
        errors.forEach(ele=>ele.innerHTML = "");
    };


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
                    fieldHighlight("#FirstName");
                if (!lNamePass)
                    fieldHighlight("#LastName");
            } else {
                displayMsg("name_error", "Missing name.");
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
                    displayMsg("pass_error", "Passwords should be 6 letters long and contain at least 1 number and 1 capital letter.");
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
        if (formdata.edLvl.value === "0") {
            fieldHighlight("#EdLevel");
            displayMsg("edlvl_error", "Please select your education level.");
            test = false;
        }

        //Graduation Status check
        if (formdata.gradStatus.value === "none") {
            displayMsg("grad_error", "Select your education status.");
            test = false;
        }

        if (test) {
            displayMsg("success", "Form submission was successful.");
        }

        return test;
    };

}