// Get Elements
let form = document.querySelector('.task-form');
let input = document.querySelector('.task-input');
let tracker = document.querySelector('.task-tracker');

// Tasks
let tasks = [];

// Other Stuff
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let input_value = input.value.trim();
    input.value = '';

    if (input_value.length === 0) return alert('Write smth...');

    tasks.push({
        id: `task-${tasks.length + 1}`,
        text: input_value,
        completed: false
    });

    renderTasks()
});

function renderTasks() {
    tracker.innerHTML = ''
    tasks.slice().reverse().forEach((task, index) => {
        let realIndex = tasks.length - index;
        let task_element = document.createElement('div');
        task_element.className = 'task';
        task_element.id = task.id;
        task_element.innerHTML = `<div class="task-check"><div class="task-check-box ${task.completed ? 'checked' : ''}"></div></div><p class="task-text">${task.text}</p><span class="material-symbols-outlined">delete</span>`

        tracker.appendChild(task_element);

        let check_box = document.querySelector(`#${task.id} .task-check`);
        let text = document.querySelector(`#${task.id} .task-text`);
        let trash = document.querySelector(`#${task.id} .material-symbols-outlined`);

        check_box.addEventListener('click', () => {
            task.completed = !task.completed;
            check_box.classList.toggle('checked')

            if (task.completed) {
                text.innerHTML = `<del>${task.text}</del>`;
            } else {
                text.innerHTML = task.text;
            }
        });

        if (task.completed) {
            check_box.classList.add('checked')
            text.innerHTML = `<del>${task.text}</del>`;
        } else {
            check_box.classList.remove('checked')
            text.innerHTML = task.text;
        }

        trash.addEventListener('click', () => {
            tasks.splice(realIndex - 1, 1);
            renderTasks();
        });
    })
}