const taskInput = document.querySelector('.add-task__input');
const addButton = document.querySelector('.add-task__button');
const incompleteTaskHolder = document.querySelector('.incompleted');
const completedTasksHolder = document.querySelector('.completed');

//New task list item

const createNewTaskElement = function(taskString) {

  let listItem = document.createElement('li');
  listItem.className = 'task-item';

  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'checkbox';

  let label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task-item__text';

  let editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task-item__input';

  let editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit-button';

  let deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';

  let deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'delete-button__img';

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;

}

const addTask = function() {
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

//Edit an existing task.

const editTask = function() {

  let listItem = this.parentNode;
  let editInput = listItem.querySelector('input[type=text]');
  let label = listItem.querySelector('label');
  let editBtn = listItem.querySelector('.edit-button');
  let containsClass = listItem.classList.contains('task-item_edit');
  if(!containsClass) {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  } else {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  }
  label.classList.toggle('task-item__text');
  label.classList.toggle('task-item__text_disabled');
  editInput.classList.toggle('task-item__input_edit');
  editInput.classList.toggle('task-item__input');
  listItem.classList.toggle('task-item');
  listItem.classList.toggle('task-item_edit');

};

//Delete task

const deleteTask = function() {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed

const taskCompleted = function() {
  let listItem = this.parentNode;
  let label = listItem.querySelector('label');
  label.classList.remove('task-item__text');
  label.classList.add('task-item__text_done');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  let listItem = this.parentNode;
  let label = listItem.querySelector('.task-item__text_done');
  label.classList.remove('task-item__text_done');
  label.classList.add('task-item__text');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function() {
  console.log('AJAX Request');
}

//Set the click handler to the addTask function.

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector('.checkbox');
  let editButton = taskListItem.querySelector('.edit-button');
  let deleteButton = taskListItem.querySelector('.delete-button');
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange  =checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}