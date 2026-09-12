/* =================================================
   KALESHI — MAIN SCRIPT
   ================================================= */


/* =================================================
   PAGE LOAD
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateToday();

    updateDashboardStats();

    loadTheme();

});


/* =================================================
   TODAY'S DATE
   ================================================= */

function updateToday() {

    const today = new Date();


    /* ---------------------------------------------
       HERO DAY
       --------------------------------------------- */

    const heroDay =
        document.getElementById("heroDay");

    if (heroDay) {

        heroDay.textContent =
            today.getDate();

    }


    /* ---------------------------------------------
       HERO MONTH
       --------------------------------------------- */

    const heroMonth =
        document.getElementById("heroMonth");

    if (heroMonth) {

        heroMonth.textContent =
            today.toLocaleDateString(
                "en-US",
                {
                    month: "long"
                }
            ).toUpperCase();

    }


    /* ---------------------------------------------
       HERO WEEKDAY
       --------------------------------------------- */

    const heroWeekday =
        document.getElementById("heroWeekday");

    if (heroWeekday) {

        heroWeekday.textContent =
            today.toLocaleDateString(
                "en-US",
                {
                    weekday: "long"
                }
            ).toUpperCase();

    }


    /* ---------------------------------------------
       TODAY STAT
       --------------------------------------------- */

    const todayStat =
        document.getElementById("todayStat");

    if (todayStat) {

        todayStat.textContent =
            today.toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric"
                }
            );

    }

}


/* =================================================
   DASHBOARD STATISTICS
   ================================================= */

function updateDashboardStats() {


    /* ---------------------------------------------
       NOTES COUNT
       --------------------------------------------- */

    const noteCount =
        document.getElementById("noteCount");


    if (noteCount) {

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


        noteCount.textContent =
            notes.length;

    }


    /* ---------------------------------------------
       TASK COUNT
       --------------------------------------------- */

    const taskCount =
        document.getElementById("taskCount");


    if (taskCount) {

        let tasks = [];

        try {

            tasks =
                JSON.parse(
                    localStorage.getItem(
                        "kaleshiTasks"
                    )
                ) || [];

        } catch (error) {

            tasks = [];

        }


        /* Show completed tasks */

        const completed =
            tasks.filter(
                task => task.completed
            ).length;


        taskCount.textContent =
            completed;

    }

}


/* =================================================
   REFRESH DASHBOARD STATS
   ================================================= */

window.addEventListener(
    "storage",
    function () {

        updateDashboardStats();

    }
);


/* =================================================
   OPEN TOOL
   ================================================= */

function openTool(tool) {

    if (tool === "notes") {

        window.location.href =
            "notes.html";

        return;

    }


    if (tool === "todo") {

        window.location.href =
            "todo.html";

        return;

    }


    if (tool === "calendar") {

        window.location.href =
            "calendar.html";

        return;

    }

}


/* =================================================
   HOME
   ================================================= */

function goHome() {

    window.location.href =
        "index.html";

}


/* =================================================
   SCROLL TO TOOLS
   ================================================= */

function scrollToTools() {

    const tools =
        document.getElementById(
            "tools"
        );


    if (tools) {

        tools.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =================================================
   THEME
   ================================================= */

function toggleTheme() {

    const body =
        document.body;


    body.classList.toggle(
        "light-mode"
    );


    const isLight =
        body.classList.contains(
            "light-mode"
        );


    localStorage.setItem(
        "kaleshiTheme",
        isLight
            ? "light"
            : "dark"
    );


    updateThemeButton();

}


/* =================================================
   LOAD THEME
   ================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "kaleshiTheme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    }


    updateThemeButton();

}


/* =================================================
   THEME BUTTON TEXT
   ================================================= */

function updateThemeButton() {

    const themeButton =
        document.getElementById(
            "themeButton"
        );


    if (!themeButton) return;


    const isLight =
        document.body.classList.contains(
            "light-mode"
        );


    if (isLight) {

        themeButton.textContent =
            "☾";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeButton.textContent =
            "☀";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


/* =================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
   ================================================= */

window.openTool =
    openTool;

window.goHome =
    goHome;

window.scrollToTools =
    scrollToTools;

window.toggleTheme =
    toggleTheme;


/* =================================================
   KALESHI
   ================================================= */
