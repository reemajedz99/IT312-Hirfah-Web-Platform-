function trimText(text) {
    return text.replace(/^\s+|\s+$/g, "");
}

function escapeHTML(text) {
    text = "" + text;
    text = text.replace(/&/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/"/g, "&quot;");
    return text;
}

function fileNameOf(path) {
    let parts = path.split(/[\\\/]/);
    return parts[parts.length - 1];
}

function loadOfferings() {
    let offerings = JSON.parse(localStorage.getItem("offerings"));
    if (offerings === null) {
        offerings = [];
    }
    return offerings;
}

function validateOffering(name, price, description, photo, instructor) {
    if (name === "") {
        alert("Offering Name is empty. Please enter the offering name.");
        return false;
    }
    if (name.search(/^[0-9]/) !== -1) {
        alert("Offering Name cannot start with a number.");
        return false;
    }

    if (price === "") {
        alert("Price is empty. Please enter a price (0 for a free offering).");
        return false;
    }
    if (price.search(/^[0-9]+(\.[0-9]+)?$/) === -1) {
        alert("Price must be a number that is 0 or more.");
        return false;
    }

    if (description === "") {
        alert("Description is empty. Please describe the offering.");
        return false;
    }

    if (photo === "") {
        alert("Offering Photo is missing. Please choose an image.");
        return false;
    }
    if (photo.search(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i) === -1) {
        alert("Offering Photo must be an image file (jpg, png, gif ...).");
        return false;
    }

    if (instructor === "") {
        alert("Please select an Instructor / Leader.");
        return false;
    }

    return true;
}

function addOffering() {
    let name = trimText(document.getElementById("offering-name").value);
    let price = trimText(document.getElementById("price").value);
    let description = trimText(document.getElementById("description").value);
    let photo = document.getElementById("offering-photo").value;
    let select = document.getElementById("instructor-leader");
    let instructor = select.value;

    if (!validateOffering(name, price, description, photo, instructor)) {
        return false;
    }

    let offerings = loadOfferings();
    offerings.push({
        id: new Date().getTime(),
        name: name,
        price: parseFloat(price),
        description: description,
        instructor: trimText(select.options[select.selectedIndex].text),
        image: "images/" + fileNameOf(photo)
    });
    localStorage.setItem("offerings", JSON.stringify(offerings));

    alert("The offering \"" + name + "\" has been added successfully.");

    document.getElementById("offering-name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    document.getElementById("offering-photo").value = "";
    select.selectedIndex = 0;

    return false;
}

function offerCardHTML(offering) {
    return '<article class="offer-card" id="offer-' + offering.id + '">' +
        '<img src="' + escapeHTML(offering.image) + '" alt="' + escapeHTML(offering.name) + '">' +
        '<div class="offer-body">' +
        '<h3>' + escapeHTML(offering.name) + '</h3>' +
        '<p class="offer-instructor">' + escapeHTML(offering.instructor) + '</p>' +
        '<p>' + escapeHTML(offering.description) + '</p>' +
        '<p class="offer-price">Price: ' + offering.price + ' SAR</p>' +
        '</div>' +
        '</article>';
}

function updateCount() {
    let count = document.getElementsByClassName("offer-card").length;
    let top = document.getElementsByClassName("offers-top")[0];
    top.getElementsByTagName("h2")[0].innerHTML = "MANAGER OFFERINGS CATALOG (" + count + ")";
}

function showOfferings() {
    let list = document.getElementsByClassName("offers-list")[0];
    let offerings = loadOfferings();

    let html = "";
    for (let i = 0; i < offerings.length; i++) {
        html += offerCardHTML(offerings[i]);
    }
    list.innerHTML += html;

    updateCount();
}

let instructors = [
    { id: 1, name: "Nora Alqahtani", expertise: "Ceramics & Pottery",       email: "nora@hirfah.com",    photo: "images/instructor1.png" },
    { id: 2, name: "Turki Alharbi",  expertise: "Embroidery & Textile Arts", email: "turki@hirfah.com",   photo: "images/instructor2.png" },
    { id: 3, name: "Sofia Rossi",    expertise: "Crochet & Embroidery",      email: "sofia@hirfah.com",   photo: "images/instructor3.png" },
    { id: 4, name: "Liam Mitchell",  expertise: "Watercolor & Painting",     email: "liam@hirfah.com",    photo: "images/instructor4.png" },
    { id: 5, name: "Gabriel Santos", expertise: "Traditional Sadu Weaving",  email: "gabriel@hirfah.com", photo: "images/instructor5.png" },
    { id: 6, name: "Ayana Bekele",   expertise: "Beadwork & Wire Art",       email: "ayana@hirfah.com",   photo: "images/instructor6.png" }
];

function showInstructors() {
    let tbody = document.getElementsByTagName("tbody")[0];
    let html = "";

    if (instructors.length === 0) {
        html = '<tr><td colspan="5">No activity leaders or instructors left.</td></tr>';
    }

    for (let i = 0; i < instructors.length; i++) {
        let person = instructors[i];
        html += '<tr>' +
            '<td><input type="checkbox" name="select_instructor" value="' + person.id + '" aria-label="Select ' + escapeHTML(person.name) + '"></td>' +
            '<td><img src="' + escapeHTML(person.photo) + '" alt="' + escapeHTML(person.name) + '"></td>' +
            '<td>' + escapeHTML(person.name) + '</td>' +
            '<td>' + escapeHTML(person.expertise) + '</td>' +
            '<td>' + escapeHTML(person.email) + '</td>' +
            '</tr>';
    }

    tbody.innerHTML = html;
}

function deleteInstructors() {
    let boxes = document.querySelectorAll("input[name='select_instructor']");

    let selectedIds = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            selectedIds.push(parseInt(boxes[i].value));
        }
    }

    if (selectedIds.length === 0) {
        alert("Please select at least one activity leader or instructor to delete.");
        return false;
    }

    if (!confirm("Are you sure you want to delete the selected person(s)?")) {
        return false;
    }

    let remaining = [];
    for (let i = 0; i < instructors.length; i++) {
        let isSelected = false;
        for (let j = 0; j < selectedIds.length; j++) {
            if (selectedIds[j] === instructors[i].id) {
                isSelected = true;
            }
        }
        if (!isSelected) {
            remaining.push(instructors[i]);
        }
    }
    instructors = remaining;
    showInstructors();

    return false;
}

function validateInstructor(name, gender, dob, email, education, skills, expertise, photo) {
    if (name === "") {
        alert("Name is empty. Please enter the full name.");
        return false;
    }
    if (name.search(/^[A-Za-z][A-Za-z ]*$/) === -1) {
        alert("Name must start with a letter and contain only letters and spaces.");
        return false;
    }

    if (gender === "") {
        alert("Please select a gender.");
        return false;
    }

    if (dob === "") {
        alert("Date of Birth is empty. Please choose a date.");
        return false;
    }
    if (new Date(dob).getTime() > new Date().getTime()) {
        alert("Date of Birth cannot be in the future.");
        return false;
    }

    if (email === "") {
        alert("Email is empty. Please enter an email.");
        return false;
    }
    if (email.search(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/) === -1) {
        alert("Please enter a valid email, for example: user@example.com");
        return false;
    }

    if (education === "") {
        alert("Education is empty. Please enter the education.");
        return false;
    }
    if (skills === "") {
        alert("Skills is empty. Please enter the skills.");
        return false;
    }
    if (expertise === "") {
        alert("Area of Expertise is empty. Please enter the area of expertise.");
        return false;
    }

    if (photo === "") {
        alert("Photo is missing. Please choose an image.");
        return false;
    }
    if (photo.search(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i) === -1) {
        alert("Photo must be an image file (jpg, png, gif ...).");
        return false;
    }

    return true;
}

function addInstructor() {
    let name = trimText(document.getElementById("inst-name").value);
    let dob = document.getElementById("inst-dob").value;
    let email = trimText(document.getElementById("inst-email").value);
    let education = trimText(document.getElementById("inst-education").value);
    let skills = trimText(document.getElementById("inst-skills").value);
    let expertise = trimText(document.getElementById("inst-expertise").value);
    let photo = document.getElementById("inst-photo").value;

    let gender = "";
    let radios = document.querySelectorAll("input[name='gender']");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value;
        }
    }

    if (!validateInstructor(name, gender, dob, email, education, skills, expertise, photo)) {
        return false;
    }

    let newId = 1;
    for (let i = 0; i < instructors.length; i++) {
        if (instructors[i].id >= newId) {
            newId = instructors[i].id + 1;
        }
    }

    instructors.push({
        id: newId,
        name: name,
        gender: gender,
        dob: dob,
        email: email,
        education: education,
        skills: skills,
        expertise: expertise,
        photo: "images/" + fileNameOf(photo)
    });

    showInstructors();
    alert(name + " has been added to the activity leaders and instructors list.");

    document.getElementById("inst-name").value = "";
    document.getElementById("inst-dob").value = "";
    document.getElementById("inst-email").value = "";
    document.getElementById("inst-education").value = "";
    document.getElementById("inst-skills").value = "";
    document.getElementById("inst-expertise").value = "";
    document.getElementById("inst-photo").value = "";
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    return false;
}

let offeringForms = document.getElementsByClassName("offering-form");
if (offeringForms.length > 0) {
    offeringForms[0].noValidate = true;
    offeringForms[0].onsubmit = addOffering;
}

let offersLists = document.getElementsByClassName("offers-list");
if (offersLists.length > 0) {
    showOfferings();
}

let deleteForms = document.getElementsByClassName("delete-form");
let instructorForms = document.getElementsByClassName("instructor-form");
if (deleteForms.length > 0 && instructorForms.length > 0) {
    instructorForms[0].noValidate = true;
    showInstructors();
    deleteForms[0].onsubmit = deleteInstructors;
    instructorForms[0].onsubmit = addInstructor;
}

if (localStorage.getItem("hirfahTheme") == "dark") {
    document.body.className = document.body.className + " dark-theme";
}