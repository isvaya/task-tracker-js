let tasks = [];

const input = document.getElementById('input');
const btnAdd = document.getElementById('btn_add');
const tasksList = document.getElementById('tasks__list');

/* FUNCTION ADD TASK */
function addTask() {
  const cleanInput = input.value.trim();
  const id = Date.now();

  if (cleanInput === '') {
    return;
  }

  const task = {
    id: id,
    text: cleanInput,
    done: false,
    isEditing: false,
  }

  tasks.push(task);
  input.value = '';
  input.focus();
  render();
}

btnAdd.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
})


function render() {
  tasksList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task__container');
    tasksList.append(taskContainer);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.dataset.id = tasks[i].id;
    checkbox.checked = tasks[i].done;

    const textTask = document.createElement('p');
    textTask.classList.add('text__task');
    textTask.textContent = tasks[i].text;

    if (tasks[i].done === true) {
      textTask.classList.add('task--done');
    };

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn_edit');
    btnEdit.textContent = "Edit";
    btnEdit.dataset.action = 'edit';
    btnEdit.dataset.id = tasks[i].id;

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn_delete');
    btnDelete.textContent = 'Delete';
    btnDelete.dataset.action = 'delete';
    btnDelete.dataset.id = tasks[i].id;

    //EDITING MODE
    const containerEditing = document.createElement('div');
    containerEditing.classList.add('container__editing');
    
    const inputEditing = document.createElement('input');
    inputEditing.classList.add('input__edit');
    inputEditing.type = 'text';
    inputEditing.value = tasks[i].text;

    const btnSave = document.createElement('button');
    btnSave.classList.add('btn__save');
    btnSave.textContent = 'Save';
    btnSave.dataset.action = 'save';
    btnSave.dataset.id = tasks[i].id;

    const btnCancel = document.createElement('button');
    btnCancel.classList.add('btn__cancel');
    btnCancel.textContent = 'Cancel';
    btnCancel.dataset.action = 'cancel';
    btnCancel.dataset.id = tasks[i].id;

    containerEditing.append(inputEditing, btnSave, btnCancel);

    if (tasks[i].isEditing === false) {
      taskContainer.append(checkbox, textTask, btnEdit, btnDelete);
    } else {
      taskContainer.append(checkbox, containerEditing)
    }
  }
}

tasksList.addEventListener('click', function(e) {
  const btn = e.target.closest('button');
  
  if (!btn) return;

  const id = Number(btn.dataset.id);

  if (btn.dataset.action === 'delete') {
    tasks = tasks.filter(t => t.id !== id);
    render();
    return;
  };

  if (btn.dataset.action === 'edit') {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].isEditing = true;
      } else {
        tasks[i].isEditing = false;
      }
    }
    
    render();
  }

  if (btn.dataset.action === 'save') {
    // поиск в массиве по id (короткая замена вместо цикла for как в edit)
    const task = tasks.find(t => t.id === id);

    if (!task) return;
    
    const taskContainer = btn.closest('.task__container');
    const inputEditing = taskContainer.querySelector('.input__edit');
    const newText = inputEditing.value.trim();

    if (newText === '') return;

    task.text = newText;
    task.isEditing = false;

    render();
  }

})

tasksList.addEventListener('change', function(e) {
  const checkbox = e.target.closest('input[type="checkbox"]');

  if (!checkbox) return;

  const id = Number(checkbox.dataset.id);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = checkbox.checked;
      break;
    }
  }

  render();
})