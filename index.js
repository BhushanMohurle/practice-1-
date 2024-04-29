
let todoListContainerEl = document.getElementById("todoListContainer");
let userInputEl = document.getElementById("userInput");

//Local Storage Mechanism
// let localStorageItem = "My Local Storage Element";
// localStorage.setItem("myItem",localStorageItem);
// let getLocallyStoredItem = localStorage.getItem("myItem");
// console.log(getLocallyStoredItem);
// localStorage.removeItem("myItem");
//###################################

//Find Index Mechanism 

// let resultingIndex = myArray.findIndex(function(each){
//   if(each===140){
//     return true;
//   }
//   else{
//     return false;
//   }
// });

// console.log(resultingIndex);

//let myArray = [1,120,110,130,true,"one"];

//let newArray = myArray.splice(1,3,"two",24,"two",24,"two",24,"two",24); 1st argument takes index, 2nd argument takes count of slice

// console.log(newArray);
// console.log(myArray);


// function getParsedTodoList(){
//   let myStoredTodo = localStorage.getItem("myTodo");
//   let parsedTodoList = JSON.parse(myStoredTodo);
//   if(parsedTodoList===null){
//     return [];
//   }
//   else{
//     return parsedTodoList;
//   }
// }



function getParsedTodo(){
  let myStoredTodo = localStorage.getItem("myTodo");
  let parsedTodoList = JSON.parse(myStoredTodo);
if(parsedTodoList===null){
  return [];
}
else{
  return parsedTodoList;
}
}

todoList = getParsedTodo();

// let todoList = getParsedTodoList();
// console.log(todoList);

// let todoList = [
//   {
//     title: "HTML5",
//     uniqueId: 1,
//   },
//   {
//     title: "CSS3",
//     uniqueId: 2
//   },
//   {
//     title: "Bootstrap",
//     uniqueId: 3,
//   },
// ];

function onSaveTodo(){
  let locallyStoredList = JSON.stringify(todoList);//We converting todo object into string..
  localStorage.setItem("myTodo",locallyStoredList);
}


function onTodoStatusChange(labelId, checkboxId,todoId) {
  let myCheckBoxEl = document.getElementById(checkboxId);
  let myLabelEl = document.getElementById(labelId);

  if (myCheckBoxEl.checked === true) {
    myLabelEl.classList.add("checked");
  } else {
    myLabelEl.classList.remove("checked");
  }

  let statusTodoIndex = todoList.findIndex(function(each){
    let eachTodoId = "todo"+each.uniqueId;
    if(eachTodoId===todoId){
      return true;
    }
    else{
       return false;
    }
  })

  let checkedTodo = todoList[statusTodoIndex];
  
  if(checkedTodo.isChecked===true){
    checkedTodo.isChecked = false;
  }
  else{
    checkedTodo.isChecked = true;
  }
}

function onDeleteTodoEl(todoId){
  let DeletedTodo = document.getElementById(todoId);
  todoListContainerEl.removeChild(DeletedTodo);

  let deleteTodoIndex = todoList.findIndex(function(each){
    let eachTodoId = "todo"+each.uniqueId;
    if(eachTodoId===todoId){
      return true;
    }
    else{
       return false;
    }
  })
  
  todoList.splice(deleteTodoIndex,1);
  console.log(todoList);
  

}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueId;
  let checkboxId = "mycheckbox" + todo.uniqueId;
  let labelId = "mylabel" + todo.uniqueId;

  let todoCardEl = document.createElement("div");
  todoCardEl.classList.add("todo-card");
  todoCardEl.id = todoId;
  todoListContainerEl.appendChild(todoCardEl);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkboxId;
  checkboxEl.checked=todo.isChecked;
  todoCardEl.appendChild(checkboxEl);
  checkboxEl.onclick = function () {
    onTodoStatusChange(labelId, checkboxId,todoId);
  };

  let labelContainerEl = document.createElement("label");
  labelContainerEl.classList.add("label-cont");
  labelContainerEl.htmlFor = checkboxId;
  todoCardEl.appendChild(labelContainerEl);

  let titleTodoEl = document.createElement("p");
  titleTodoEl.textContent = todo.title;
  titleTodoEl.id = labelId;
  if(todo.isChecked===true){
    titleTodoEl.classList.add("checked");
  }
  labelContainerEl.appendChild(titleTodoEl);

  let deleteIconEl = document.createElement("i");
  deleteIconEl.classList.add("fa-solid", "fa-trash");
  labelContainerEl.appendChild(deleteIconEl);
  deleteIconEl.onclick = function(){
    onDeleteTodoEl(todoId);
  }
}

let lengthOfTodo = todoList.length;

function onTodoAdd(){
  let userInputVal = userInputEl.value;
  
  lengthOfTodo = lengthOfTodo+1

  if(userInputVal===""){
    alert("please enter a valit input");
  }
  else{
    let newTodo = {
      title:userInputVal,
      uniqueId:lengthOfTodo,
      isChecked:false
    }
  
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    console.log(todoList);
  }
  userInputEl.value = "";
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
