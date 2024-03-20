// ~ >=========> HTML Elements
let root = document.querySelector(":root")
let newTaskBtn = document.getElementById("newTask");
let modalEl = document.getElementById("modal");
let statusInput = document.getElementById("status");
let categoryInput = document.getElementById("category");
let titleInput = document.getElementById("title");
let descriptionInput = document.getElementById("description");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let searchInput = document.getElementById("searchInput");
let deleteBtn = document.getElementById("delete");
let gridBtn = document.getElementById("gridBtn");
let barsBtn = document.getElementById("barsBtn");
let sections = document.querySelectorAll("section")
let taskContainers = document.querySelectorAll(".tasks")
let modeBtn = document.getElementById("mode")
let alertDeleteCard = document.querySelector(".alert-card")
let overLay = document.querySelector(".overLay")
let yesBtn = document.getElementById("yes")
let noBtn = document.getElementById("no")



let containers = {
    nextUp: document.getElementById("nextUp"),
    inProgress: document.getElementById("inProgress"),
    done: document.getElementById("done"),
};
let countersEl = {
    nextUp: document.querySelector("#nextUp").querySelector("span"),
    inProgress: document.querySelector("#inProgress").querySelector("span"),
    done: document.querySelector("#done").querySelector("span"),
}
let counters = {
    nextup: 0,
    inProgress: 0,
    done: 0,
}

let updateIndex;
// ~ App Variables

let tasksArr = getItemFromLocalStorage();
for (let i = 0; i < tasksArr.length; i++) {
    displayTask(i);
}

// ~  Function

function showModal() {

    window.scroll(0, 0)
    modalEl.classList.replace("d-none", "d-flex")
    document.body.style.overflow = "hidden"
}
function hideModal() {
    modalEl.classList.replace("d-flex", "d-none")
    document.body.style.overflow = "auto"
}

function setItemsToLocalStorage() {

    localStorage.setItem("Tasks", JSON.stringify(tasksArr))
}

function getItemFromLocalStorage() {

    return JSON.parse(localStorage.getItem("Tasks")) || []

}


// & Add Task
function addTask() {

    let task = {

        status: statusInput.value,
        category: categoryInput.value,
        title: titleInput.value,
        description: descriptionInput.value,
        bgColor: "#0d1117",
    };

    tasksArr.push(task)
    setItemsToLocalStorage()
    displayTask(tasksArr.length - 1)
}
function setCounter(status) {

    countersEl[status].innerHTML = Number(countersEl[status].innerHTML) + 1
    clearInput()

}

// & display

function displayTask(index) {
    let taskHTML = `  
    <div class="task" style="background-color: ${tasksArr[index].bgColor}" >
        <h3 h3 class="text-capitalize" > ${tasksArr[index]?.title}</h3 >
    <p class="description text-capitalize">${tasksArr[index]?.description}</p>
    <h4 class="category ${tasksArr[index]?.category} text-capitalize">${tasksArr[index]?.category}</h4>
    <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
    <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
    <li><i class="bi bi-trash-fill" onclick="deleteItem(${index})"></i></li>
    <li><i class="bi bi-palette-fill" onclick="changeBgColor(event , ${index})"></i></li>
    </ul>
    </div >
        `;


    containers[tasksArr[index].status].querySelector(".tasks").innerHTML += taskHTML;

    setCounter(tasksArr[index].status)
}

function displayAllTasks() {
    for (let i = 0; i < tasksArr.length; i++) {
        displayTask(i)
    }
}


// & delete

function deleteItem(index) {
    tasksArr.splice(index, 1)
    setItemsToLocalStorage();
    resetContainers()
    resetCounters()
    displayAllTasks()

}

function resetContainers() {

    for (let key in containers) {

        containers[key].querySelector(".tasks").innerHTML = '';

    }

}

function resetCounters() {

    for (let key in countersEl) {
        countersEl[key].innerHTML = 0;
    }

    for (var key in counters) {
        counters[key] = 0;
    }
}


function searchTasks() {

    resetContainers()
    resetCounters()

    const term = searchInput.value;

    for (let i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].title.toLowerCase().includes(term.toLowerCase()) ||
            tasksArr[i].category.toLowerCase().includes(term.toLowerCase())) {

            displayTask(i)
        }

    }
    console.log(term);

}

function getTaskInfo(index) {

    updateIndex = index;

    showModal()
    statusInput.value = tasksArr[index].status
    categoryInput.value = tasksArr[index].category
    titleInput.value = tasksArr[index].title
    descriptionInput.value = tasksArr[index].description

    addBtn.classList.replace("d-block", "d-none")
    updateBtn.classList.replace("d-none", "d-block")
}

function editTask() {

    tasksArr[updateIndex].status = statusInput.value;
    tasksArr[updateIndex].category = categoryInput.value;
    tasksArr[updateIndex].title = titleInput.value;
    tasksArr[updateIndex].description = descriptionInput.value;
    setItemsToLocalStorage();
    resetContainers();
    resetCounters()
    displayAllTasks()
    hideModal()

}

const colorArr = ["#FBF3D5", "#4CCD99", "#B0C5A4", "#FFF5C2", "#525CEB", "#C6A969", "#FF9843", "#FFB0B0"];

function changeBgColor(event, index) {

    let randomNum = Math.trunc(Math.random() * 8);
    let randomColor = colorArr[randomNum];

    tasksArr[index].bgColor = randomColor;
    setItemsToLocalStorage();
    event.target.closest(".task").style.backgroundColor = randomColor;


}


function changeToBars() {

    gridBtn.classList.remove("active")
    barsBtn.classList.add("active")
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove("col-md-6", "col-lg-4")
        sections[i].style.overflow = "auto"
    }
    for (let x = 0; x < taskContainers.length; x++) {
        taskContainers[x].setAttribute("data-view", "bars")
    }
}

function changeToGrid() {

    gridBtn.classList.add("active")
    barsBtn.classList.remove("active")
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.add("col-md-6", "col-lg-4")
        sections[i].style.overflow = "hidden"
    }
    for (let x = 0; x < taskContainers.length; x++) {
        taskContainers[x].removeAttribute("data-view", "bars")
    }
}

function changeMode() {

    if (modeBtn.classList.contains('bi-brightness-high-fill')) {

        root.style.setProperty("--main-black", "#fff")
        root.style.setProperty("--sec-black", "#eee")
        modeBtn.classList.replace("bi-brightness-high-fill", "bi-moon")
    } else {

        root.style.setProperty("--main-black", "#0d1117")
        root.style.setProperty("--sec-black", "#161b22")
        modeBtn.classList.replace("bi-moon", "bi-brightness-high-fill")

    }


}

function deleteAllTasks() {

    tasksArr.splice(0);
    localStorage.clear();
    resetContainers();
    resetCounters();
    displayAllTasks();
    alertDeleteCard.classList.add("d-none");
    overLay.classList.add("d-none");
    document.body.style.overflow = "auto"

}

function alertCard() {
    if (tasksArr.length > 0) {
        alertDeleteCard.classList.remove("d-none");
        overLay.classList.remove("d-none");
        window.scroll(0, 0)
        document.body.style.overflow = "hidden"

    }
}
function closeAlertCard() {
    alertDeleteCard.classList.add("d-none");
    overLay.classList.add("d-none");
    document.body.style.overflow = "auto"
}

function clearInput() {

    titleInput.value = ''
    descriptionInput.value = ''

}

// ~ Events

newTaskBtn.addEventListener("click", showModal);

addBtn.addEventListener("click", function () {
    addTask()
    hideModal()
});

modalEl.addEventListener("click", function (event) {

    if (event.target.id === 'modal') {
        hideModal()
        clearInput()
    }
})

document.addEventListener("keyup", function (event) {

    if (event.code === 'Escape') {
        hideModal()
        clearInput()
    }
})

searchInput.addEventListener('input', searchTasks)

updateBtn.addEventListener("click", editTask)

barsBtn.addEventListener("click", changeToBars)

gridBtn.addEventListener("click", changeToGrid)

modeBtn.addEventListener("click", changeMode)
deleteBtn.addEventListener("click", alertCard)

yesBtn.addEventListener("click", deleteAllTasks)
noBtn.addEventListener("click", closeAlertCard)