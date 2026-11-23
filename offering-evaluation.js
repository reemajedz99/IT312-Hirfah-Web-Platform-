

function getRating() {

    for (var i = 1; i <= 5; i++) {
        if (document.getElementById("star" + i).checked) {
            return i;
        }
    }
    return 0;
}

function submitEvaluation() {
    var offeringSelect = document.getElementById("eval-offering");
    var feedbackBox = document.getElementById("eval-feedback");
    var ratingBox = document.getElementById("rating-fieldset");
    var feedback = feedbackBox.value.replace(/^\s+|\s+$/g, "");   
    var rating = getRating();
    var errors = "";

    offeringSelect.className = "";
    feedbackBox.className = "";
    ratingBox.className = "rating-fieldset";

    if (offeringSelect.value == "") {
        errors += "- Please select an offering.\n";
        offeringSelect.className = "input-error";
    }

    if (rating == 0) {
        errors += "- Please add a rating.\n";
        ratingBox.className = "rating-fieldset input-error";
    }

    if (feedback == "") {
        errors += "- Please write your feedback.\n";
        feedbackBox.className = "input-error";
    }

    if (errors != "") {
        alert("Please complete the following:\n" + errors);
        return false;
    }

    if (rating >= 4) {
        alert("Thank you for your great rating! We are glad you enjoyed the offering.");
    } else {
        alert("We are sorry the offering did not meet your expectations. We will use your feedback to improve.");
    }

    // the review is not stored, go back to the dashboard
    window.location.href = "member-dashboard.html";
    return false;
}

document.getElementById("eval-button").onclick = submitEvaluation;
