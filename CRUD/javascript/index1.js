class Task {
    constructor(id, texto) {
        this.id = id;
        this.texto = texto;
        this.date = new Date();
    }
}

class TaskManager {
    constructor(containerId, inputId) {
        this.taskArray = [];
        this.taskId = 0;
        this.currentEditId = null;
        this.container = document.getElementById(containerId);
        this.input = document.getElementById(inputId);
        this.ui = new TaskUI(this.container, this.removeTask.bind(this), this.updateTask.bind(this));
    }

 addTask(){
    let textTask = this.input.value.trim();
    if (this.currentEditId === null) {
        if (textTask === "") {
            alert("O campo de texto precisa ser preenchido")
        } else {
            let objTask = new Task(this.taskId, textTask)
            this.taskId++
            this.taskArray.push(objTask)
            this.ui.render(this.taskArray);
            this.input.value = ""
        }
    } else {
        let retorno = this.taskArray.find(t => t.id === this.currentEditId)
        retorno.texto = textTask
        this.input.value = ""
        this.currentEditId = null;
        this.ui.render(this.taskArray);
    }
}

 removeTask(taskId){
    this.taskArray = this.taskArray.filter(t => t.id !== taskId)
    this.ui.render(this.taskArray);
}

 updateTask(taskId){
    let editTask = this.taskArray.find(t => t.id === taskId)
    this.currentEditId = taskId
    this.input.value = editTask.texto;
}


}


class TaskUI {
  constructor(container, removeCallback, updateCallback) {
    this.container = container;
    this.removeCallback = removeCallback;
    this.updateCallback = updateCallback;
  }

  render(taskArray) {
    this.container.innerHTML = "";
    for (const task of taskArray) {
      const el = this.createTaskElement(task);
      this.container.appendChild(el);
    }
  }

    
createTaskElement(task){
        let lista = document.createElement("li");
        let texto = document.createElement("span")
        let data = document.createElement("span");
        let btnExcluir = document.createElement("button");
        let btnEditar = document.createElement("button");

        btnExcluir.innerText = "Excluir tarefa"
        btnEditar.innerText = "Editar tarefa"

        btnExcluir.setAttribute("data-delete", task.id)
        btnEditar.setAttribute("data-update", task.id)

        btnExcluir.addEventListener("click", (e) => this.removeCallback(task.id))
        btnEditar.addEventListener("click", (e) => this.updateCallback(task.id))

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
        
        return lista;
}
}






