import { MainObjectBag, Project, Tasks } from "../objects"


const App = (()=>{
const projectShelf = MainObjectBag();

function createStaticFolders(){
  const today = Project("Today");
  const all7Days = Project("All 7 Days");
  const allTasks = Project("All Tasks");
  const uncompleted = Project("Uncompleted Tasks");
  createFolder([today, all7Days, allTasks, uncompleted],projectShelf)
}

createStaticFolders();

function createFolder(arr, shelf) {
  arr.map((val) => shelf.addStaticProject(val));
}

function createNonStaticFolder(name){
  projectShelf.addNonStaticProject(Project(name)); 
}

function homePageDecison(markup){
document.querySelector('.display_to-do').appendChild(markup)
}



 

 
 return{
   projectShelf,
   createNonStaticFolder,
   homePageDecison
 }



})()

export default App;