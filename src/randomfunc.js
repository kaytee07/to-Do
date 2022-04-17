import { Tasks } from "../objects"
import App from "./main"

// export const pushToMain = function(arr){
//     arr.map((items))
// }

export const pushTodoToProject = function (index, project){
     App.projectShelf.findNonStaticProject(index).addTodo(project);
}
