import { MainObjectBag, Project, Tasks } from "../objects"
import { createFolder, createNonStaticFolder, todayOrThisWeek } from "./controllers";

const App = (()=>{
const projectShelf = MainObjectBag();

function createStaticFolders(){
  const today = Project("Today");
  const all7Days = Project("This week");
  createFolder([today, all7Days],projectShelf)
}

function loadStorageItemsToProject(){
  if (localStorage.getItem("projects")){
        JSON.parse(localStorage.getItem("projects")).map((val) => {
          projectShelf.addNonStaticProject(val);
        });
  }
}

createStaticFolders();
loadStorageItemsToProject();
// todayOrThisWeek()


 return{
   projectShelf
 }



})()

export default App;