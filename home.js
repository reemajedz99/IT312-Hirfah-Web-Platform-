/* =========================================================
   Hirfah Club - Home Page script (home.js)
   Phase 3:
     1. Theme switch (light / dark) saved in localStorage
     2. Menu button for small screens
     3. "Back to Top" button
     4. Real-time clock in the footer
   ========================================================= */

var currentTheme = "light";   // "light" or "dark"
var menuOpen = false;         // is the small-screen menu open?

/* ---------- 1. Theme switch ---------- */

function applyTheme(theme) {
    var button = document.getElementById("theme-button");

    if (theme == "dark") {
        document.body.className = "home-page dark-theme";
        button.innerHTML = "Light Theme";
    } else {
        document.body.className = "home-page";
        button.innerHTML = "Dark Theme";
    }

    currentTheme = theme;
}

function switchTheme() {
    if (currentTheme == "light") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    // remember the choice so the theme stays after a refresh
    localStorage.setItem("hirfahTheme", currentTheme);
}

/* ---------- 2. Menu button (small screens) ---------- */

function toggleMenu() {
    var nav = document.getElementById("home-nav");
    var button = document.getElementById("menu-button");

    if (menuOpen == true) {
        nav.className = "site-nav";
        button.innerHTML = "&#9776; Menu";
        menuOpen = false;
    } else {
        nav.className = "site-nav nav-open";
        button.innerHTML = "&#10005; Close";
        menuOpen = true;
    }
}

/* ---------- 3. Back to Top button ---------- */

function checkScroll() {
    var topButton = document.getElementById("back-to-top");

    // show the button only after the user scrolls down 300px
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

function goToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

/* ---------- 4. Real-time clock ---------- */

function addZero(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var period = "AM";

    if (hours >= 12) {
        period = "PM";
    }
    hours = hours % 12;
    if (hours == 0) {
        hours = 12;
    }

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

    document.getElementById("clock").innerHTML =
        addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + " " + period;

    document.getElementById("clock-date").innerHTML =
        days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();
}

/* ---------- Register the event handlers ---------- */
/* The script is linked just before </body>, so all the elements
   already exist and we can set everything up right away. */

function setUpHomePage() {
    // load the saved theme (light is the default)
    var savedTheme = localStorage.getItem("hirfahTheme");
    if (savedTheme == "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    document.getElementById("theme-button").onclick = switchTheme;
    document.getElementById("menu-button").onclick = toggleMenu;
    document.getElementById("back-to-top").onclick = goToTop;

    window.onscroll = checkScroll;
    checkScroll();

    updateClock();
    setInterval(updateClock, 1000);
}

setUpHomePage();
