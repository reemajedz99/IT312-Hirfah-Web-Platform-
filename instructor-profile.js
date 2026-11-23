
function applySavedTheme() {
    if (localStorage.getItem("hirfahTheme") == "dark") {
        document.body.className = document.body.className + " dark-theme";
    }
}

applySavedTheme();
