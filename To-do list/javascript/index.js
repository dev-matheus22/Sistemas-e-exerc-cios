import { auth } from "/firebase/firebaseConfig.js";
import { addDoc, collection } from '/firebase/firebaseConfig.js'

let taskId = 0;
let taskArray = [];
let editGlobal = null;

const addTask = () => {
    let textTask = document.getElementById("textTask").value.trim();
    if (editGlobal === null) {
        if (textTask === "") {
            alert("O campo de texto precisa ser preenchido")
        } else {
            const taskDate = new Date()
            let objTask = {
                texto: textTask,
                id: taskId,
                date: taskDate
            }
            taskId++
            taskArray.push(objTask)
            listTask()
            document.getElementById("textTask").value = ""
        }
    } else {
        let retorno = taskArray.find(t => t.id === editGlobal)
        retorno.texto = textTask
        document.getElementById("textTask").value = ""
        editGlobal = null;
        listTask()
    }
}

const removeTask = (e) => {
    e.target;
    let removingTask = Number(e.target.dataset.delete);
    let newTask = taskArray.filter(t => t.id !== removingTask)
    taskArray = newTask;
    listTask()
}

const updateTask = (e) => {
    e.target;
    let idClicado = Number(e.target.dataset.update);
    let editTask = taskArray.find(rightTask => rightTask.id === idClicado)
    editGlobal = idClicado
    document.getElementById("textTask").value = editTask.texto;
}


const listTask = () => {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    for (const task of taskArray) {
        let lista = document.createElement("li");
        let texto = document.createElement("span")
        let data = document.createElement("span");
        let btnExcluir = document.createElement("button");
        let btnEditar = document.createElement("button");

        btnExcluir.innerText = "Exluir tarefa"
        btnEditar.innerText = "Editar tarefa"

        btnExcluir.setAttribute("data-delete", task.id)
        btnEditar.setAttribute("data-update", task.id)

        btnExcluir.addEventListener("click", removeTask)
        btnEditar.addEventListener("click", updateTask)

        lista.classList.add("task-item");
        texto.classList.add("task-text");
        data.classList.add("task-date");
        btnExcluir.classList.add("btn-delete");
        btnEditar.classList.add("btn-edit");

        const dia = task.date.getDate();
        const mes = task.date.getMonth() + 1;
        const ano = task.date.getFullYear();
        const dataCompleta = `${dia}/${mes}/${ano}`

        texto.innerText = task.texto;
        data.innerText = dataCompleta;

        lista.appendChild(texto)
        lista.appendChild(data)
        lista.appendChild(btnExcluir)
        lista.appendChild(btnEditar)
        taskList.appendChild(lista)
    }
}
