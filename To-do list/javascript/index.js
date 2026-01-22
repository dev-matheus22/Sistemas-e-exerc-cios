import { db } from "../firebase/firebaseConfig.js";
import { addDoc, collection, Timestamp, doc, getDocs, getFirestore, query, where, updateDoc, deleteDoc }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


let taskId = 0;
let taskArray = [];
let editGlobal = null;

let search = document.getElementById("searchTask")
search.addEventListener("input", (e) => {
    let filteredTasks = []
    for (const task of taskArray) {
        if (task.texto.toLowerCase().includes(search.value.toLowerCase())) {
            filteredTasks.push(task)
        }
    }
    listTask(filteredTasks)
})



const verifyUser = async () => {
    const user = Firebase.auth.currentUser
    if (user !== null) {
        return user.uid
    } else {
        alert("Faça login primeiro")
        return
    }
}

const addTask = async () => {
    let textTask = document.getElementById("textTask").value.trim();
    const uid = await verifyUser()
    const data = Timestamp.now()
    if (textTask === "") {
        alert("O campo de texto precisa ser preenchido")
        return;
    }
    if (editGlobal === null) {
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                id: uid,
                texto: textTask,
                createdAt: data,
                status: false
            })
            let objTask = {
                id: docRef.id,
                texto: textTask,
                createdAt: data,
                status: false
            }
            taskArray.push(objTask)
        } catch (error) {
            alert("Erro ao criar tarefa")
            console.error(error)
        }
    } else {
        try {
            const taskRef = doc(db, "tasks", editGlobal);

            await updateDoc(taskRef, {
                texto: textTask,
                updatedAt: Timestamp.now()
            });
            let i = taskArray.findIndex(t => t.id === editGlobal)
            taskArray[i].texto = textTask
            taskArray[i].updatedAt = Timestamp.now()
            editGlobal = null;
        } catch (error) {
            alert("Erro ao salvar a edição de tarefa")
            console.error(error)
        }
        document.getElementById("textTask").value = ""
        listTask()
    }
}

const removeTask = async (e) => {
    e.target;
    let removingTask = e.target.dataset.delete;
    const taskRef = doc(db, "tasks", removingTask)
    try {
        await deleteDoc(taskRef)
    } catch (error) {
        alert("Erro ao remover a tarefa")
        console.error(error)
    }
    taskArray = taskArray.filter(t => t.id !== removingTask)
    listTask()
}

const updateTask = (e) => {
    let idClicado = e.target.dataset.update;
    let editTask = taskArray.find(t => t.id === idClicado)
    editGlobal = idClicado
    document.getElementById("textTask").value = editTask.texto;
}

const fillArray = async (uid) => {
    taskArray = []
    try {
        const q = query(
            collection(db, "tasks"),
            where("id", "==", uid)
        )
        const querySnp = await getDocs(q)
        querySnp.forEach(doc => {
            taskArray.push({ id: doc.id, ...doc.data() })
        });
    } catch (error) {
        alert("Erro ao carregar dados")
        console.error(error)
    }
}

const listTask = (filteredTasks) => {
    const tasksToRender = filteredTasks || taskArray;
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";


    for (const task of tasksToRender) {
        let dateObj;
        let lista = document.createElement("li");
        let texto = document.createElement("span")
        let data = document.createElement("span");
        let btnExcluir = document.createElement("button");
        let btnEditar = document.createElement("button");
        let checkbox = document.createElement("input")

        checkbox.checked = task.status;

        checkbox.type = "checkbox"

        checkbox.addEventListener("change", async () => {
            task.status = checkbox.checked;

            try {
                const taskRef = doc(db, "tasks", task.id);
                await updateDoc(taskRef, { status: task.status });
            } catch (error) {
                alert("Erro ao atualizar status da tarefa");
                console.error(error);
            }
            
        });


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

        if (task.updatedAt) {
            dateObj = task.updatedAt.toDate();
        } else {
            dateObj = task.createdAt.toDate();
        }
        const dia = dateObj.getDate();
        const mes = dateObj.getMonth() + 1;
        const ano = dateObj.getFullYear();
        const dataCompleta = `${dia}/${mes}/${ano}`

        texto.innerText = task.texto;
        data.innerText = dataCompleta;

        lista.appendChild(texto)
        lista.appendChild(data)
        lista.appendChild(btnExcluir)
        lista.appendChild(btnEditar)
        lista.appendChild(checkbox)
        taskList.appendChild(lista)
    }
}

const logout = async () => {
    try {
        await Firebase.auth.signOut();
        alert("Você saiu da conta");
        taskArray = [];
        document.getElementById("taskList").innerHTML = ""; 
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
        alert("Não foi possível sair da conta");
    }
};


const startApp = async () => {
    const uid = await verifyUser()
    if (!uid) return;
    await fillArray(uid)
    listTask()
}

startApp()
