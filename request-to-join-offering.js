

var newRequests = [];   

var offeringNames = [
    { value: "pottery-basics", name: "Pottery Basics" },
    { value: "embroidery-workshop", name: "Embroidery Workshop" },
    { value: "crochet-for-beginners", name: "Crochet for Beginners" },
    { value: "watercolor-painting", name: "Watercolor Painting" },
    { value: "jewelry-making", name: "Jewelry Making" },
    { value: "al-sadu-weaving", name: "Al Sadu Weaving" }
];

function addZero(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function getOfferingName(value) {
    for (var i = 0; i < offeringNames.length; i++) {
        if (offeringNames[i].value == value) {
            return offeringNames[i].name;
        }
    }
    return "";
}

function isFullName(name) {

    return name.search(/^[A-Za-z\u0600-\u06FF]+(\s+[A-Za-z\u0600-\u06FF]+)+$/) != -1;
}

function isFutureDate(dateText) {
    
    var now = new Date();
    var today = now.getFullYear() + "-" + addZero(now.getMonth() + 1) + "-" + addZero(now.getDate());
    return dateText > today;
}

function showNewRequests() {
    var section = document.getElementById("new-requests");
    var list = document.getElementById("new-requests-list");
    var html = "";

    for (var i = 0; i < newRequests.length; i++) {
        var r = newRequests[i];
        html += '<div class="request-card">' +
                '<div><h3>' + r.offering + '</h3>' +
                '<p>Member Name: <strong>' + r.name + '</strong></p>' +
                '<p>Preferred Date: <strong>' + r.date + '</strong></p></div>' +
                '</div>';
    }

    list.innerHTML = html;
    section.style.display = "block";
}

function submitJoinRequest() {
    var offeringSelect = document.getElementById("join-offering");
    var nameInput = document.getElementById("join-full-name");
    var dateInput = document.getElementById("join-date");
    var name = nameInput.value.replace(/^\s+|\s+$/g, "");   
    var errors = "";

    offeringSelect.className = "";
    nameInput.className = "";
    dateInput.className = "";

    if (offeringSelect.value == "") {
        errors += "- Please select an offering.\n";
        offeringSelect.className = "input-error";
    }

    if (name == "") {
        errors += "- Please enter your full name.\n";
        nameInput.className = "input-error";
    } else if (!isFullName(name)) {
        errors += "- The name must be a full name (first and last name) and cannot contain numbers or characters such as ?, ! or @.\n";
        nameInput.className = "input-error";
    }

    if (dateInput.value == "") {
        errors += "- Please choose a preferred date.\n";
        dateInput.className = "input-error";
    } else if (!isFutureDate(dateInput.value)) {
        errors += "- The preferred date must be a future date.\n";
        dateInput.className = "input-error";
    }

    if (errors != "") {
        alert("Please fix the following:\n" + errors);
        return false;
    }

    var request = new Object();
    request.offering = getOfferingName(offeringSelect.value);
    request.name = name;

    var dateParts = dateInput.value.split("-");
    request.date = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

    var stay = confirm("Your request to join \"" + request.offering + "\" was sent.\n\n" +
                       "Click OK to stay on this page and add another request,\n" +
                       "or Cancel to return to the Club Member Dashboard.");

    if (stay) {
        newRequests.push(request);
        showNewRequests();
        offeringSelect.value = "";
        nameInput.value = "";
        dateInput.value = "";
    } else {
        // the new requests are not saved, so they disappear
        window.location.href = "member-dashboard.html";
    }

    return false;
}

document.getElementById("join-button").onclick = submitJoinRequest;
