window.onload = function(){


    if (document.querySelector("body").id === "errorpanel") {
        var statusTitle = document.querySelector("#side").querySelector("h3");
        var titleText = document.createTextNode("Submission Status");
        statusTitle.appendChild(titleText);
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
        /*var userfield = document.querySelector("#Username");
        var username = userfield.getAttribute("value");*/
        var rStart = /^[A-Za-z]/;

        return username.length >= 6 && rStart.test(username);
    };

    formValidate = function(formdata) {
        var test = true;

        if (!nameValid(formdata.fName.value) || !nameValid(formdata.lName.value)) {
            //message
            test = false;
        }

        if (formdata.password.value === formdata.re_password.value) {
            if (!passValid(formdata.password.value))
                test = false; //invalid password message
        } else {
            //non-match message
            test = false;
        }

        if (!usernameCheck(formdata.username.value)) {
            //message
            test = false;
        }

        if (formdata.edLvl.value == "0") {
            //message
            test = false;
        }

        if (formdata.gradStatus.value == "none") {
            //message
            test = false;
        }

        return test;
    };

}