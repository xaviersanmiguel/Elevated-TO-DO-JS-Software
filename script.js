const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const modalOverlay = document.getElementById("modal-overlay");
const noDeadlineCheckbox = document.getElementById("no-deadline");

let taskText = "";
let deadlineDate = "";
let deadlineTime = "";


function openModal() {
    taskText = inputBox.value;
    if (taskText === '') {
        alert("Please enter a task before adding a deadline.");
    } else {
        modalOverlay.style.display = "flex";
    }
}


function closeModal() {
    modalOverlay.style.display = "none";
    noDeadlineCheckbox.checked = false;
}


function confirmDeadline() {

    if (noDeadlineCheckbox.checked) {
        addTask();
        closeModal();
    } else {
        deadlineDate = document.getElementById("deadline-date").value;
        deadlineTime = document.getElementById("deadline-time").value;

        if (deadlineDate === '' || deadlineTime === '') {
            alert("Please select both date and time for the deadline.");
        } else {
            addTask();
            closeModal();
        }
    }
}


function addTask() {
    let li = document.createElement("li");

    if (noDeadlineCheckbox.checked) {
        li.innerHTML = `${taskText} - No Deadline`;
    } else {
        li.innerHTML = `${taskText} - Deadline: ${deadlineDate} ${deadlineTime}`;
    }
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    saveData();
}


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}


function showSaved() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showSaved();


document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modalOverlay.style.display === "flex") {
        closeModal();
    }
});

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        openModal();
    }
});


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);
