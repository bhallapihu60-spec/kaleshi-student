/* =========================================================
   KALESHI — TO-DO LIST
   ========================================================= */

let tasks = [];


/* =========================================================
   LOAD TASKS
   ========================================================= */

function loadTasks() {

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

    renderTasks();

}


/* =========================================================
   SAVE TASKS
   ========================================================= */

function saveTasks() {

    localStorage.setItem(
        "kaleshiTasks",
        JSON.stringify(tasks)
    );

}


/* =========================================================
   RENDER TASKS
   ========================================================= */

function renderTasks() {

    const taskList =
        document.getElementById(
            "taskList"
        );

    const emptyState =
        document.getElementById(
            "emptyTasks"
        );

    const completedCount =
        document.getElementById(
            "completedCount"
        );

    const totalCount =
        document.getElementById(
            "totalCount"
        );

    if (!taskList) return;

    taskList.innerHTML = "";


    /* COUNTS */

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    if (completedCount) {

        completedCount.textContent =
            completed;

    }

    if (totalCount) {

        totalCount.textContent =
            tasks.length;

    }


    /* EMPTY STATE */

    if (tasks.length === 0) {

        if (emptyState) {

            emptyState.style.display =
                "block";

        }

        return;

    }


    if (emptyState) {

        emptyState.style.display =
            "none";

    }


    /* TASK CARDS */

    tasks.forEach(
        (task, index) => {

            const taskItem =
                document.createElement(
                    "div"
                );

            taskItem.className =
                "task-item";

            if (task.completed) {

                taskItem.classList.add(
                    "completed"
                );

            }


            taskItem.innerHTML = `

                <button
                    class="big-checkbox"
                    type="button"
                    onclick="toggleTask(${index})"
                    aria-label="Complete task"
                >
                    <span>
                        ✓
                    </span>
                </button>

                <div class="task-content">

                    <strong>
                        ${escapeHTML(task.text)}
                    </strong>

                    <small>
                        ${task.completed
                            ? "DONE — LOOK AT YOU"
                            : "KALESHI HAS BUSINESS"}
                    </small>

                </div>

                <button
                    class="delete-task"
                    type="button"
                    onclick="deleteTask(${index})"
                    aria-label="Delete task"
                >
                    ×
                </button>

            `;

            taskList.appendChild(
                taskItem
            );

        }
    );

}


/* =========================================================
   ADD TASK
   ========================================================= */

function addTask(text) {

    tasks.push({

        text: text,

        completed: false,

        createdAt:
            new Date().toISOString()

    });

    saveTasks();

    renderTasks();

}


/* =========================================================
   TOGGLE TASK
   ========================================================= */

function toggleTask(index) {

    if (!tasks[index]) return;

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();

}


/* =========================================================
   DELETE TASK
   ========================================================= */

function deleteTask(index) {

    if (!tasks[index]) return;

    tasks.splice(
        index,
        1
    );

    saveTasks();

    renderTasks();

}


/* =========================================================
   ADD TASK FORM
   ========================================================= */

const taskForm =
    document.getElementById(
        "taskForm"
    );

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const taskInput =
                document.getElementById(
                    "taskInput"
                );

            if (!taskInput) return;

            const text =
                taskInput.value.trim();

            if (text === "") {

                taskInput.focus();

                return;

            }

            addTask(text);

            taskInput.value = "";

            taskInput.focus();

        }
    );

}


/* =========================================================
   CLEAR COMPLETED
   ========================================================= */

function clearCompletedTasks() {

    tasks =
        tasks.filter(
            task => !task.completed
        );

    saveTasks();

    renderTasks();

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTasks();

    }
);
