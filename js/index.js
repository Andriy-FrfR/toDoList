'use strict';

let todo = document.querySelector('.todo'),
    todoInput = document.querySelector('.todo-input'),
    createBtn = document.querySelector('.create-btn');

todo.addEventListener('click', todoHandler);

function todoHandler(event) {
    let target = event.target;
    if (target.closest('.create-btn')) {
        createTask();
        todoInput.value = '';
    } else if (target.closest('.delete-btn')) {
        target.closest('.todo-item').remove();
    } else if (target.closest('.clear-btn')) {
        todoInput.value = '';
    } else if (target.closest('.change-btn')) {
        changeTask(target);
    }
}

function createTask() {
    let newTaskHTML = `<div class="todo-item">
    <div class="todo-item-text">${todoInput.value}</div>
    <button class="todo-btn change-btn">
        <img src="./images/change-icon.png" alt="" class="btn-image">
    </button>
    <button class="todo-btn delete-btn">
        <img src="./images/cross-icon.png" alt="" class="btn-image">
    </button>
    </div>`;

    todo.insertAdjacentHTML('beforeend', newTaskHTML);
}

function changeTask(target) {
    let newInput = document.createElement('input'),
        taskText = target.closest('.todo-item').querySelector('.todo-item-text');
    
    newInput.classList.add('todo-input');
    newInput.value = taskText.innerHTML;
    
    taskText.replaceWith(newInput);
    newInput.focus();
}