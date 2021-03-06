'use strict';

let tasksArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [],
    order = localStorage.getItem('order') ? + localStorage.getItem('order') : 0;

let todo = document.querySelector('.todo'),
    todoInput = document.querySelector('.todo-input'),
    createBtn = document.querySelector('.create-btn');

document.addEventListener('DOMContentLoaded', showTasks);

function showTasks() {
    for (let item of tasksArr) {
        todo.insertAdjacentHTML('beforeend', item);
    }
}

todo.addEventListener('click', todoHandler);

function todoHandler(event) {
    let target = event.target;
    if (target.closest('.create-btn')) {
        createTask();
        todoInput.value = '';
    } else if (target.closest('.delete-btn')) {
        deleteTask(target);
    } else if (target.closest('.clear-btn')) {
        todoInput.value = '';
    } else if (target.closest('.change-btn')) {
        changeTask(target);
    } else if (target.closest('.confirm-btn')) {
        confirmTask(target);
    }
}

function createTask() {
    if (!todoInput.value) {
        return;
    }

    let newTaskHTML = `<div data-order="${order++}" class="todo-item">
    <div class="todo-item-text">${todoInput.value}</div>
    <button class="todo-btn change-btn">
        <img src="./images/change-icon.png" alt="" class="btn-image">
    </button>
    <button class="todo-btn delete-btn">
        <img src="./images/cross-icon.png" alt="" class="btn-image">
    </button>
    </div>`;
    todo.insertAdjacentHTML('beforeend', newTaskHTML);

    tasksArr.push(newTaskHTML);
}

function deleteTask(target) {
    for (let i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i] === target.closest('.todo-item').outerHTML) {
            tasksArr.splice(i, 1);
            break;
        }
    }

    target.closest('.todo-item').remove();
}

function changeTask(target) {
    let newInput = document.createElement('input'),
        taskText = target.closest('.todo-item').querySelector('.todo-item-text'),
        changeBtn = target.closest('.todo-item').querySelector('.change-btn');

    newInput.classList.add('todo-input');
    newInput.value = taskText.innerHTML;
    
    taskText.replaceWith(newInput);
    newInput.focus();

    let confirmBtn = document.createElement('button');
        
    confirmBtn.classList.add('todo-btn', 'confirm-btn');
    confirmBtn.innerHTML = '<img src="./images/confirm-icon.png" alt="" class="btn-image">';
    
    changeBtn.replaceWith(confirmBtn);
}

function confirmTask(target) {
    let task = target.closest('.todo-item'),
        taskInput = task.querySelector('.todo-input'),
        confirmBtn = task.querySelector('.confirm-btn');
        
    let newText = document.createElement('div');    
    newText.classList.add('todo-item-text');
    newText.innerHTML = taskInput.value;

    if (!newText.innerHTML) {
        return;
    }

    taskInput.replaceWith(newText);

    let changeBtn = document.createElement('button');
    changeBtn.classList.add('todo-btn', 'change-btn');
    changeBtn.innerHTML = '<img src="./images/change-icon.png" alt="" class="btn-image">';

    confirmBtn.replaceWith(changeBtn);

    for (let i = 0; i < tasksArr.length; i++)  {
        if (tasksArr[i].includes(`data-order="${task.dataset.order}"`)) {
            tasksArr[i] = task.outerHTML;
        }
    }
}

window.onbeforeunload = function() {
    localStorage.setItem('tasks', JSON.stringify(tasksArr));
    localStorage.setItem('order', order);
}