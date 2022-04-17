export const Project = function (name) {
  let projectName = name;
  let todos = [];

  const getProjectName = function () {
    return projectName;
  };

  const addTodo = function (item) {
    todos.push(item);
  };

  const getTodos = function () {
    return todos;
  };


  const findTodo = function (index) {
    return todos[index];
  };

  return {
    getProjectName,
    getTodos,
    addTodo,
    findTodo,
  };
};

export const Tasks = function(todo){
  let task =  todo;
  let notes = null;
  let prority = null;
  let dueTimeAndDate = {
    time:null,
    date:null
  }


  const displayTask = function(){
    return task
  }

  return{
    displayTask
  }

}

export const MainObjectBag = function(){
  const staticProject = [];
  const nonStaticProject = []

  const getStaticProject = function () {
    return staticProject;
  };

  const getNonStaticProject = function () {
    return nonStaticProject;
  };

  const findNonStaticProject = function (index) {
    return nonStaticProject[index];
  };
  
  const addStaticProject = (project) => {
    staticProject.push(project)
  }

  const addNonStaticProject = function(project) {
    nonStaticProject.push(project)
  }
  

  return {
    getStaticProject,
    findNonStaticProject,
    addStaticProject,
    addNonStaticProject,
    getNonStaticProject,
  }
  
}




