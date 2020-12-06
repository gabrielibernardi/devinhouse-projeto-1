var btnAdd = document.getElementById("btnAdd")
var userTasks = []

function createElement(object, taskNumber) {
    var list = document.getElementById("taskList")

    var taskItem = document.createElement("li")
    taskItem.setAttribute("class", "task")
    taskItem.setAttribute("id", "task-" + taskNumber)

    var taskInput = document.createElement("input")
    taskInput.setAttribute("type", "checkbox")
    taskInput.setAttribute("id", "checkbox-" + taskNumber)
    taskInput.checked = object.marked
    taskInput.addEventListener("click", function () {
        lineCheck("text-" + taskNumber)
    })

    taskItem.appendChild(taskInput)

    var taskText = document.createElement("span")
    taskText.setAttribute("class", "text")
    taskText.setAttribute("id", "text-" + taskNumber)

    taskText.textContent = object.text

    taskItem.appendChild(taskText)

    var taskButton = document.createElement("button")
    taskButton.setAttribute("class", "delete")
    taskButton.setAttribute("id", "delete-" + taskNumber)
    taskButton.textContent = "X"
    taskButton.addEventListener("click", function () {
        removeTask("task-" + taskNumber)
    })
    taskItem.appendChild(taskButton)

    list.appendChild(taskItem)

    if (object.marked == true) {
        lineCheck("text-" + taskNumber)
    }
}

function addTaskOnList() {
    var newTaskText = document.getElementById("insertTask").value
    document.getElementById("insertTask").value = ""

    var item = {
        "text": newTaskText,
        "marked": false
    }
    var quantItem = document.getElementsByClassName("task").length

    createElement(item, quantItem)
    saveLocalStorage(newTaskText, false)
}

function saveLocalStorage(text, checked) {
    var objTask = {
        "text": text,
        "marked": checked
    }
    userTasks.push(objTask)
    localStorage.setItem("userTasks", JSON.stringify(userTasks))
}

function loadTasks() {
    var tasksLoaded = JSON.parse(localStorage.getItem("userTasks"))
    if (tasksLoaded) {
        userTasks = tasksLoaded

        for (var i = 0; i < userTasks.length; i++) {
            createElement(userTasks[i], i)
        }
    }
}

function removeTask(taskId) {
    var confirmAnwser = confirm("Você realmente deseja remover?")
    if (confirmAnwser) {
        var taskNumber = taskId.split("-")[1]
        var tasksLoaded = JSON.parse(localStorage.getItem("userTasks"))
        tasksLoaded.splice(taskNumber, 1)
        localStorage.setItem("userTasks", JSON.stringify(tasksLoaded))
        document.getElementById("taskList").innerHTML = ""
        loadTasks()
    }
}

function lineCheck(textId) {
    var taskNumber = textId.split("-")[1]
    var tasksLoaded = JSON.parse(localStorage.getItem("userTasks"))
    if (document.getElementById("checkbox-" + taskNumber).checked) {
        tasksLoaded[taskNumber].marked = true
    } else {
        tasksLoaded[taskNumber].marked = false
    }
    localStorage.setItem("userTasks", JSON.stringify(tasksLoaded))
    if (document.getElementById(textId).classList.contains("line")) {
        document.getElementById(textId).classList.remove("line")
    } else {
        document.getElementById(textId).classList.add("line")
    }
}

btnAdd.addEventListener("click", addTaskOnList)
loadTasks()