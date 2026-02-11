let tasks = [];

let input = document.getElementById('input');
let btnAdd = document.getElementById('btn_add');
let tasksList = document.getElementById('tasks__list');

/* BUTTUN ADD TASK */
btnAdd.addEventListener('click', () => {
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
})


// function render() {

// }