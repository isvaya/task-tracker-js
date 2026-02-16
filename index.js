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
  }

  tasks.push(task);
  input.value = '';
  render();
}

btnAdd.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
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

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn_delete');
    btnDelete.textContent = 'Delete';
    btnDelete.dataset.action = 'delete';
    btnDelete.dataset.id = tasks[i].id;

    taskContainer.append(checkbox, textTask, btnDelete);
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