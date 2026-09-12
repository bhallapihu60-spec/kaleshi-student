/* =========================================================
   KALESHI — STUDENT DASHBOARD
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. THEME
   ========================================================= */

const themeButton =
    document.getElementById("themeButton");

function loadTheme() {

    const savedTheme =
        localStorage.getItem("kaleshiTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");

        if (themeButton) {
            themeButton.textContent = "☀";
        }
    }

}

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "kaleshiTheme",
        isLight ? "light" : "dark"
    );

    if (themeButton) {

        themeButton.textContent =
            isLight ? "☀" : "☾";

    }
}

if (themeButton) {

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================================
   2. TODAY'S DATE
   ========================================================= */

function updateDate() {

    const today = new Date();

    const day =
        today.getDate();

    const month =
        today.toLocaleDateString(
            "en-US",
            {
                month: "long"
            }
        );

    const weekday =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );


    const heroDay =
        document.getElementById("heroDay");

    const heroMonth =
        document.getElementById("heroMonth");

    const heroWeekday =
        document.getElementById("heroWeekday");


    if (heroDay) {
        heroDay.textContent =
            String(day).padStart(2, "0");
    }

    if (heroMonth) {
        heroMonth.textContent =
            month.toUpperCase();
    }

    if (heroWeekday) {
        heroWeekday.textContent =
            weekday.toUpperCase();
    }

}


/* =========================================================
   3. DASHBOARD STATS
   ========================================================= */

function updateDashboardStats() {

    /*
       Tasks are stored by the To-Do page
       inside localStorage.
    */

    let tasks = [];

    try {

        tasks =
            JSON.parse(
                localStorage.getItem(
                    "studentTasks"
                )
            ) || [];

    } catch (error) {

        tasks = [];

    }


    const completedTasks =
        tasks.filter(
            task => task.completed
        ).length;


    const taskCount =
        document.getElementById(
            "taskCount"
        );


    if (taskCount) {

        taskCount.textContent =
            completedTasks;

    }


    /*
       Notes are stored by the Notes page.
       We support a few possible storage names
       so the dashboard remains compatible
       with the notes system we build later.
    */

    let notes = [];

    try {

        notes =
            JSON.parse(
                localStorage.getItem(
                    "kaleshiNotes"
                )
            ) || [];

    } catch (error) {

        notes = [];

    }


    const noteCount =
        document.getElementById(
            "noteCount"
        );


    if (noteCount) {

        noteCount.textContent =
            Array.isArray(notes)
                ? notes.length
                : 0;

    }

}


/* =========================================================
   4. NAVIGATION
   ========================================================= */

function openTool(tool) {

    const pages = {

        notes: "notes.html",

        todo: "todo.html",

        calendar: "calendar.html"

    };


    if (pages[tool]) {

        window.location.href =
            pages[tool];

    }

}


function goHome() {

    window.location.href =
        "index.html";

}


/* =========================================================
   5. SCROLL TO TOOLS
   ========================================================= */

function scrollToTools() {

    const tools =
        document.getElementById(
            "tools"
        );

    if (!tools) return;

    tools.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   6. PAGE START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTheme();

        updateDate();

        updateDashboardStats();

    }
);


/* =========================================================
   7. UPDATE STATS WHEN RETURNING
   ========================================================= */

window.addEventListener(
    "pageshow",
    function () {

        updateDashboardStats();

    }
);
