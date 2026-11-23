var offerings = [];

function readOfferings() {
    var list = document.getElementById("offers-list");
    var cards = list.getElementsByClassName("offer-card");

    for (var i = 0; i < cards.length; i++) {
        var name = cards[i].getElementsByTagName("h2")[0].innerHTML;
        var priceText = cards[i].getElementsByClassName("offer-price")[0].innerHTML;
        var price = parseFloat(priceText.replace("Price:", ""));

        var offering = new Object();
        offering.name = name;
        offering.price = price;
        offering.card = cards[i];

        offerings.push(offering);
    }
}

function showOfferings() {
    var list = document.getElementById("offers-list");

    for (var i = 0; i < offerings.length; i++) {
        list.appendChild(offerings[i].card);
    }
}

function shuffleOfferings() {
    for (var i = offerings.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = offerings[i];
        offerings[i] = offerings[j];
        offerings[j] = temp;
    }
}

function comparePriceLowHigh(a, b) {
    return a.price - b.price;
}

function comparePriceHighLow(a, b) {
    return b.price - a.price;
}

function compareNameAZ(a, b) {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}

function compareNameZA(a, b) {
    return compareNameAZ(b, a);
}

function sortOfferings() {
    var choice = document.getElementById("sort-by").value;
    var message = "";

    if (choice == "price-low") {
        offerings.sort(comparePriceLowHigh);
        message = "sorted by price: low to high";
    } else if (choice == "price-high") {
        offerings.sort(comparePriceHighLow);
        message = "sorted by price: high to low";
    } else if (choice == "name-az") {
        offerings.sort(compareNameAZ);
        message = "sorted by name: A to Z";
    } else if (choice == "name-za") {
        offerings.sort(compareNameZA);
        message = "sorted by name: Z to A";
    } else {
        shuffleOfferings();
        message = "in random order";
    }

    showOfferings();
    document.getElementById("offers-count").innerHTML =
        "Showing all " + offerings.length + " offerings " + message;
}

function setUpOfferingsPage() {
    readOfferings();

    document.getElementById("sort-by").value = "random";
    shuffleOfferings();
    showOfferings();
    document.getElementById("offers-count").innerHTML =
        "Showing all " + offerings.length + " offerings in random order";

    document.getElementById("sort-by").onchange = sortOfferings;
}

setUpOfferingsPage();
