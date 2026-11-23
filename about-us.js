/* ---------- 1. Saved theme ---------- */

// apply the theme chosen on the Home Page (saved in localStorage)
function applySavedTheme() {
    if (localStorage.getItem("hirfahTheme") == "dark") {
        document.body.className = document.body.className + " dark-theme";
    }
}

/* ---------- 2. Join Our Team form validation ---------- */

// remove the spaces at the start and end of a text
function removeSpaces(text) {
    return text.replace(/^\s+|\s+$/g, "");
}

// Rule 2: the name cannot start with a number
function startsWithNumber(name) {
    return name.search(/^\d/) != -1;
}

// Rule 3: the photo must be an image file (checked by its file extension)
function isImageFile(fileName) {
    return fileName.search(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) != -1;
}

// Rule 4: read the year from the date value (format yyyy-mm-dd)
// returns 0 if the date is not valid
function getBirthYear(dateText) {
    if (dateText.search(/^\d{4}-\d{2}-\d{2}$/) == -1) {
        return 0;
    }
    return parseInt(dateText.substring(0, 4));
}

function validateJoinForm() {
    var name = removeSpaces(document.getElementById("join-name").value);
    var dateOfBirth = document.getElementById("join-dob").value;
    var email = removeSpaces(document.getElementById("join-email").value);
    var expertise = document.getElementById("join-expertise").value;
    var skills = removeSpaces(document.getElementById("join-skills").value);
    var photo = document.getElementById("join-photo").value;
    var education = removeSpaces(document.getElementById("join-education").value);
    var errors = "";

    // Rule 1 (no empty fields) and Rule 2 (name cannot start with a number)
    if (name == "") {
        errors += "- Please enter your name.\n";
    } else if (startsWithNumber(name)) {
        errors += "- The name cannot start with a number.\n";
    }

    // Rule 1 and Rule 4 (year of birth must be 2008 or earlier)
    if (dateOfBirth == "") {
        errors += "- Please enter your date of birth.\n";
    } else {
        var birthYear = getBirthYear(dateOfBirth);
        if (birthYear == 0) {
            errors += "- Please enter a valid date of birth.\n";
        } else if (birthYear > 2008) {
            errors += "- The year of birth must be 2008 or earlier.\n";
        }
    }

    if (email == "") {
        errors += "- Please enter your email.\n";
    }

    // the first option ("Select expertise") has an empty value
    if (expertise == "") {
        errors += "- Please select your area of expertise.\n";
    }

    if (skills == "") {
        errors += "- Please enter your skills.\n";
    }

    // Rule 1 and Rule 3 (photo accepts only images)
    if (photo == "") {
        errors += "- Please choose a photo.\n";
    } else if (!isImageFile(photo)) {
        errors += "- The photo must be an image file (JPG, JPEG, PNG, GIF, BMP or WEBP).\n";
    }

    if (education == "") {
        errors += "- Please enter your education.\n";
    }

    if (errors != "") {
        alert("Please fix the following:\n" + errors);
        return false;
    }

    alert("Thank you, " + name + "! Your Join Our Team form has been submitted successfully.");

    // the form is not sent to a server, so stay on the page
    return false;
}

/* ---------- Register the event handlers ---------- */
/* The script is linked just before </body>, so all the elements
   already exist */

function setUpAboutUsPage() {
    applySavedTheme();
    document.getElementsByClassName("join-form")[0].onsubmit = validateJoinForm;
}

setUpAboutUsPage();
