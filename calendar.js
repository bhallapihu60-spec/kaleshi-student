/* =================================================
   KALESHI CALENDAR
   ================================================= */

let currentDate = new Date();

let selectedDate = new Date();

let calendarEvents = {};


/* =================================================
   LOAD SAVED EVENTS
   ================================================= */

function loadCalendarEvents() {

    try {

        calendarEvents =
            JSON.parse(
                localStorage.getItem("kaleshiCalendarEvents")
            ) || {};

    } catch (error) {

        calendarEvents = {};

    }

}


/* =================================================
   SAVE EVENTS
   ================================================= */

function saveCalendarEvents() {

    localStorage.setItem(
        "kaleshiCalendarEvents",
        JSON.stringify(calendarEvents)
    );

}


/* =================================================
   DATE KEY
   ================================================= */

function getDateKey(date) {

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/* =================================================
   CHECK SAME DATE
   ================================================= */

function isSameDate(date1, date2) {

    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );

}


/* =================================================
   RENDER CALENDAR
   ================================================= */

function renderCalendar() {

    const calendarGrid =
        document.getElementById("calendarGrid");

    const monthName =
        document.getElementById("monthName");

    if (!calendarGrid || !monthName) return;


    /* ---------------------------------------------
       MONTH TITLE
       --------------------------------------------- */

    monthName.textContent =
        currentDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    calendarGrid.innerHTML = "";


    /* ---------------------------------------------
       FIRST DAY OF MONTH
       --------------------------------------------- */

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const firstDay =
        new Date(year, month, 1).getDay();


    /* ---------------------------------------------
       NUMBER OF DAYS
       --------------------------------------------- */

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* ---------------------------------------------
       DAYS FROM PREVIOUS MONTH
       --------------------------------------------- */

    const previousMonthDays =
        new Date(
            year,
            month,
            0
        ).getDate();


    /* ---------------------------------------------
       PREVIOUS MONTH DATES
       --------------------------------------------- */

    for (
        let i = firstDay - 1;
        i >= 0;
        i--
    ) {

        const day =
            previousMonthDays - i;

        const date =
            new Date(
                year,
                month - 1,
                day
            );

        createDayButton(
            date,
            true,
            calendarGrid
        );

    }


    /* ---------------------------------------------
       CURRENT MONTH DATES
       --------------------------------------------- */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );

        createDayButton(
            date,
            false,
            calendarGrid
        );

    }


    /* ---------------------------------------------
       NEXT MONTH DATES
       --------------------------------------------- */

    const totalCells =
        firstDay + daysInMonth;

    const remainingCells =
        totalCells % 7 === 0
            ? 0
            : 7 - (totalCells % 7);


    for (
        let day = 1;
        day <= remainingCells;
        day++
    ) {

        const date =
            new Date(
                year,
                month + 1,
                day
            );

        createDayButton(
            date,
            true,
            calendarGrid
        );

    }


    updateSelectedDate();

}


/* =================================================
   CREATE DAY BUTTON
   ================================================= */

function createDayButton(
    date,
    isOtherMonth,
    calendarGrid
) {

    const button =
        document.createElement("button");

    button.type = "button";

    button.className = "calendar-day";


    if (isOtherMonth) {

        button.classList.add(
            "other-month"
        );

    }


    /* ---------------------------------------------
       TODAY
       --------------------------------------------- */

    const today = new Date();

    if (isSameDate(date, today)) {

        button.classList.add("today");

    }


    /* ---------------------------------------------
       SELECTED DATE
       --------------------------------------------- */

    if (isSameDate(date, selectedDate)) {

        button.classList.add("selected");

    }


    /* ---------------------------------------------
       DAY NUMBER
       --------------------------------------------- */

    const number =
        document.createElement("span");

    number.className = "day-number";

    number.textContent =
        date.getDate();

    button.appendChild(number);


    /* ---------------------------------------------
       EVENT DOT
       --------------------------------------------- */

    const key =
        getDateKey(date);

    if (
        calendarEvents[key] &&
        calendarEvents[key].length > 0
    ) {

        const dot =
            document.createElement("span");

        dot.className = "event-dot";

        button.appendChild(dot);

    }


    /* ---------------------------------------------
       CLICK
       --------------------------------------------- */

    button.addEventListener(
        "click",
        function() {

            selectedDate =
                new Date(date);

            /* If user clicks another month,
               show that month too */

            if (isOtherMonth) {

                currentDate =
                    new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        1
                    );

            }

            renderCalendar();

        }
    );


    calendarGrid.appendChild(button);

}


/* =================================================
   CHANGE MONTH
   ================================================= */

function changeMonth(amount) {

    currentDate =
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + amount,
            1
        );

    renderCalendar();

}


/* =================================================
   UPDATE SELECTED DATE
   ================================================= */

function updateSelectedDate() {

    const selectedDateElement =
        document.getElementById(
            "selectedDate"
        );

    if (!selectedDateElement) return;


    selectedDateElement.textContent =
        selectedDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    renderEvents();

}


/* =================================================
   RENDER EVENTS
   ================================================= */

function renderEvents() {

    const eventList =
        document.getElementById(
            "eventList"
        );

    if (!eventList) return;


    eventList.innerHTML = "";


    const key =
        getDateKey(selectedDate);


    const events =
        calendarEvents[key] || [];


    /* ---------------------------------------------
       NO EVENTS
       --------------------------------------------- */

    if (events.length === 0) {

        const empty =
            document.createElement("div");

        empty.className = "no-events";

        empty.textContent =
            "No plans yet. Add something to this date.";

        eventList.appendChild(empty);

        return;

    }


    /* ---------------------------------------------
       EVENTS
       --------------------------------------------- */

    events.forEach(
        function(eventText, index) {

            const item =
                document.createElement("div");

            item.className =
                "event-item";


            const text =
                document.createElement("div");

            text.className =
                "event-text";

            text.textContent =
                eventText;


            const deleteButton =
                document.createElement("button");

            deleteButton.type = "button";

            deleteButton.className =
                "delete-event";

            deleteButton.textContent =
                "×";

            deleteButton.setAttribute(
                "aria-label",
                "Delete event"
            );


            deleteButton.addEventListener(
                "click",
                function() {

                    deleteEvent(
                        key,
                        index
                    );

                }
            );


            item.appendChild(text);

            item.appendChild(
                deleteButton
            );

            eventList.appendChild(item);

        }
    );

}


/* =================================================
   ADD EVENT
   ================================================= */

function addEvent(eventText) {

    const key =
        getDateKey(selectedDate);


    if (!calendarEvents[key]) {

        calendarEvents[key] = [];

    }


    calendarEvents[key].push(
        eventText
    );


    saveCalendarEvents();

    renderCalendar();

}


/* =================================================
   DELETE EVENT
   ================================================= */

function deleteEvent(
    key,
    index
) {

    if (!calendarEvents[key]) return;


    calendarEvents[key].splice(
        index,
        1
    );


    if (
        calendarEvents[key].length === 0
    ) {

        delete calendarEvents[key];

    }


    saveCalendarEvents();

    renderCalendar();

}


/* =================================================
   EVENT FORM
   ================================================= */

const eventForm =
    document.getElementById(
        "eventForm"
    );


if (eventForm) {

    eventForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "eventInput"
                );


            const text =
                input.value.trim();


            if (text === "") return;


            addEvent(text);


            input.value = "";


            input.focus();

        }
    );

}


/* =================================================
   START CALENDAR
   ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCalendarEvents();

        renderCalendar();

    }
);
