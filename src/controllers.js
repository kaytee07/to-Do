import { Tasks, Project } from "../objects"
import App from "./main"

// export const pushToMain = function(arr){
//     arr.map((items))
// }

export const createFolder = function (arr, shelf) {
  arr.map((val) => shelf.addStaticProject(val));
}

export const createNonStaticFolder = function (name) {
  App.projectShelf.addNonStaticProject(Project(name));
};

export const pushTodoToProject = function (index, project){
     App.projectShelf.findNonStaticProject(index).todos.push(project);
}

export const innerHtml = function(target, input){
     target.innerHTML = input
}

export const dateCheck = function(date, time){
     let userDateArray = date.split("-");
     let userTimeArray = time.split(":");
     const todayDate = new Date();
     const selectedDate = new Date(userDateArray[0], (userDateArray[1]-1), userDateArray[2], userTimeArray[0], userTimeArray[1])
     if(selectedDate < todayDate){
          return false
     }
          return true
          
}

export const todayOrThisWeek = function () {
  let allNonStaticProject = App.projectShelf
    .getNonStaticProject()
    .map((items) => {
      return items;
    });

  let todos = allNonStaticProject.map((items) => {
    return items.todos;
  });

      App.projectShelf.getStaticProject()[0].todos = [];
      App.projectShelf.getStaticProject()[1].todos = [];

  for (let i = 0; i < todos.length; i++) {
    for (let j = 0; j < todos[i].length; j++) {
     if (todos[i][j].dueTimeAndDate.date){
           moveToToday(todos[i][j].dueTimeAndDate.date, todos[i][j]);
           moveToWeek(todos[i][j].dueTimeAndDate.time, todos[i][j]);
     }      
    }
  }
};



const moveToToday = function(date, todo){
      let userDateArray = date.split("-");
      const todayDate = new Date();
      let userDate = new Date(
        userDateArray[0],
        userDateArray[1] - 1,
        userDateArray[2]
      );
      if (todayDate.toDateString() == userDate.toDateString()) { 
        App.projectShelf.getStaticProject()[0].todos.push(todo);
        return;
      }

      return
}


const moveToWeek = function (date, todo){
         let userDateArray = date.split("-");
      const todayDate = new Date();
       let first = todayDate.getDate() - todayDate.getDay();
       let last = first + 6;
      let userDate = new Date(
        userDateArray[0],
        userDateArray[1] - 1,
        userDateArray[2]
      );
      if (first <= userDate.getDate() && last >= userDate.getDate()) {      
        App.projectShelf.getStaticProject()[1].todos.push(todo)
        return;
      }

      return
}



export const deleteTodoFromNonStaticFolder = function(foldId, todoId){
   let array = App.projectShelf.findNonStaticProject(foldId).todos
   if(todoId > -1){
        array.splice(todoId, 1)
   }  
}

export const  deleteFromStaticFolders = function(name){
  let array = App.projectShelf.getStaticProject()
  for(let i = 0; i < array.length ; i++){
    console.log(array[i].todos.length);
    for(let j = 0 ; j < array[i].todos.length; j++){
      if (array[i].todos[j].task === name){
        array[i].todos.splice(j, 1)
      }
    }
  }
}

export const deleteFolder = function(id){
  let array = App.projectShelf.getNonStaticProject();
  array.splice(id,1)
}

export const saveToLocalStorage = function(){
  localStorage.setItem(
    "projects",
    JSON.stringify(App.projectShelf.getNonStaticProject())
  );
}