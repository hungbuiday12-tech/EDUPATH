function loadTheme() {
    const theme = localStorage.getItem("edupath-theme");

    if (theme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }

    updateThemeButton();
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("edupath-theme", "light");
    } else {
        localStorage.setItem("edupath-theme", "dark");
    }

    updateThemeButton();
}

function updateThemeButton() {
    const button = document.getElementById("themeToggle");

    if (!button) return;

    if (document.body.classList.contains("light-mode")) {
        button.innerHTML = "🌙";
        button.title = "Chuyển sang Dark Mode";
    } else {
        button.innerHTML = "☀️";
        button.title = "Chuyển sang Light Mode";
    }
}

document.addEventListener("DOMContentLoaded", loadTheme);