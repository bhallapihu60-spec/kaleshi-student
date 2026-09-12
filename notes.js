/* =========================================================
   KALESHI NOTES
   ========================================================= */

let notes = [];


/* =========================================================
   LOAD NOTES
   ========================================================= */

function loadNotes() {

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

    renderNotes();
}


/* =========================================================
   SAVE NOTES
   ========================================================= */

function saveNotes() {

    localStorage.setItem(
        "kaleshiNotes",
        JSON.stringify(notes)
    );

}


/* =========================================================
   RENDER NOTES
   ========================================================= */

function renderNotes() {

    const notesGrid =
        document.getElementById(
            "notesGrid"
        );

    const emptyNotes =
        document.getElementById(
            "emptyNotes"
        );

    if (!notesGrid) return;

    notesGrid.innerHTML = "";

    if (notes.length === 0) {

        emptyNotes.style.display =
            "block";

        return;
    }

    emptyNotes.style.display =
        "none";


    notes
        .slice()
        .reverse()
        .forEach((note, index) => {

            const actualIndex =
                notes.length - 1 - index;

            const card =
                document.createElement("div");

            card.className =
                "note-card";

            card.innerHTML = `
                <div class="note-top">

                    <div class="note-date">
                        ${note.date}
                    </div>

                    <button
                        class="delete-note"
                        onclick="deleteNote(${actualIndex})"
                    >
                        🗑
                    </button>

                </div>

                <h3>
                    ${escapeHTML(note.title)}
                </h3>

                <p>
                    ${escapeHTML(note.text)}
                </p>
            `;

            notesGrid.appendChild(card);

        });

}


/* =========================================================
   ADD NOTE
   ========================================================= */

function addNote(title, text) {

    const today =
        new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-US",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    notes.push({

        title: title,

        text: text,

        date: formattedDate

    });

    saveNotes();

    renderNotes();

}


/* =========================================================
   DELETE NOTE
   ========================================================= */

function deleteNote(index) {

    const sure =
        confirm(
            "Delete this note?"
        );

    if (!sure) return;

    notes.splice(index, 1);

    saveNotes();

    renderNotes();

}


/* =========================================================
   MODAL
   ========================================================= */

function openNoteModal() {

    const modal =
        document.getElementById(
            "noteModal"
        );

    modal.classList.add("show");

}


function closeNoteModal() {

    const modal =
        document.getElementById(
            "noteModal"
        );

    modal.classList.remove("show");

}


/* =========================================================
   FORM
   ========================================================= */

const noteForm =
    document.getElementById(
        "noteForm"
    );

if (noteForm) {

    noteForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const title =
                document
                    .getElementById(
                        "noteTitle"
                    )
                    .value
                    .trim();

            const text =
                document
                    .getElementById(
                        "noteText"
                    )
                    .value
                    .trim();

            if (
                title === "" ||
                text === ""
            ) {
                return;
            }

            addNote(
                title,
                text
            );

            noteForm.reset();

            closeNoteModal();

        }
    );

}


/* =========================================================
   CLOSE MODAL CLICK OUTSIDE
   ========================================================= */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "noteModal"
            );

        if (
            event.target === modal
        ) {

            closeNoteModal();

        }

    }
);


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadNotes();

    }
);
