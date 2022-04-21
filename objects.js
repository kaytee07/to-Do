export const Project = function (name) {
  let projectName = name;
  let todos = [];


  const findTodo = function (index) {
    return todos[index];
  };

  return {
    name,
    todos,
    findTodo,
  };
};

export const Tasks = function(todo){
  let task =  todo;
  let priority = null;
  let dueTimeAndDate = {
    time:null,
    date:null
  }
  let projectId = null

  const getProjectId = function(){
    return projectId
  }

  const addDueTimeAndDate = function(time, date){
    dueTimeAndDate.time = time;
    dueTimeAndDate.date = date
  }

  const setPriority = function(info){
    priority = info
  }

  return{
    task,
    priority,
    dueTimeAndDate,
    projectId,
    addDueTimeAndDate,
    setPriority,
    getProjectId
  }

}

export const MainObjectBag = function(){
  let staticProject = [];
  const nonStaticProject = []

  const getStaticProject = function () {
    return staticProject;
  };
 

  const getNonStaticProject = function () {
    return nonStaticProject;
  };

  const findStaticProject = function (index) {
    return staticProject[index];
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
    findStaticProject,
    findNonStaticProject,
    addStaticProject,
    addNonStaticProject,
    getNonStaticProject,
  }
  
}




