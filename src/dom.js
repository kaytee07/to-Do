import App from './main'
import { MainObjectBag, Project, Tasks } from "../objects";
import { pushTodoToProject } from './randomfunc';


const DOM =(()=>{
    function shortcutUI(statics){
      const shortcut = document.querySelector(".static"); 
          let markUp = ``
          statics.getStaticProject().forEach((items, index) => {
            markUp += `
            <li class="item" id="${index}">${items.getProjectName()}</li>
          `;
          });     
        shortcut.innerHTML = markUp
    }


    function NonStaticUI(data){
      const project = document.querySelector(".non-static"); 
      
      let markUp = ``;
      data.getNonStaticProject().forEach((items, index) => {
        markUp += `
            <li id="${index}" class="folder item" id="${index}">${items.getProjectName()}</li>
          `;
      });
      project.innerHTML = markUp;
    }

    function foldersinTodoForm(){
      let folders = document.querySelector(".fold");
      let markUp = ``;
      App.projectShelf.getNonStaticProject().map((folders, index)=>{
        markUp += `
          <div id="${index}" class="foldItems">${folders.getProjectName()}</div>
        `;
      })
      folders.innerHTML = markUp
      console.log(App.projectShelf.getNonStaticProject())
    }

    function projectPageUI(project){
      const projectPage = document.querySelector(".to-do_box");
      const projectItem = document.querySelector(".todos");
      let markUp1 = `
        <div class="to-do_title">
                    <h2>${project.getProjectName()}</h2>
               </div>
       `;

      projectPage.innerHTML = markUp1;

      let markUp2 = ``;
      project.getTodos().forEach((val, index) => {
        markUp2 += `
              <li class="to-dos">
                       <div class="left-side">
                           <i class="bi bi-check-lg"></i>
                           <p>${val.displayTask()}</p>
                        </div>    
                        <div class="right-side">
                            <i class="bi bi-pencil-fill"></i>
                            <i class="bi bi-trash3-fill"></i>
                        </div>
                   </li>
         `;
      });

      projectItem.innerHTML = markUp2;
      projectPage.appendChild(projectItem);
      return projectPage;
    }

    

    function listeners(){
      let folder = document.querySelector(".aproject");
      let addTask = document.querySelector(".add-task_button");
      let addTaskBtn = document.querySelector(".addtask");
      let modalTask = document.querySelector(".modal_task");
      let task = document.querySelector(".atodo");
      let productMod = document.querySelector(".modal_product");
      let addFold = document.querySelector(".atask");
      let dueDate = document.querySelector(".due-date");
      let priority = document.querySelector(".setPriority");
      let slctFldr = document.querySelector(".setProject");
      let setDate = document.querySelector(".modal_due-date");
      let setPriority = document.querySelector(".modal_priority-col");
      let addToAFldr = document.querySelector(".modal_folders");
      let dateData = document.querySelector(".date");
      let priorityData = document.querySelector(".priority");
      let urgency = document.querySelectorAll(".urgency");
      let folderData = document.querySelector(".toFolder");

  
      

     folder.addEventListener("click", function(){
        productMod.classList.add("active")
     })

     addFold.addEventListener("click", function () {
        App.createNonStaticFolder(productMod.firstElementChild.value);
        render();
      productMod.classList.remove("active");  
     });

     addTask.addEventListener("click", function(){
        modalTask.classList.add("active")
     })

     addTaskBtn.addEventListener("click", function(){
       console.log();
        if(!modalTask.firstElementChild.value ){
         alert("enter task name")
         return
       }
        if (!modalTask.children[1].lastElementChild.id) {
          alert("choose a project folder");
          return;
        }
       pushTodoToProject(document.querySelector(".setProject").lastElementChild.id,
       Tasks(modalTask.firstElementChild.value))
       modalTask.classList.remove("active");
     })

     dueDate.addEventListener("click", function () {
        setDate.classList.add("active");
      });

     priority.addEventListener("click", function () {
        setPriority.classList.add("active");
       });

     slctFldr.addEventListener("click", function () {
          addToAFldr.classList.add("active");  
        });

      dateData.addEventListener("click", function () {
        setDate.classList.remove("active");
      });

      // priorityData.addEventListener("click", function () {
      //   setPriority.classList.remove("active");
      // });

      // folderData.addEventListener("click", function () {
      //   addToAFldr.classList.remove("active");
      // });
      
      document.addEventListener("click", function(e){
        if(e.target && e.target.classList.value === "folder item"){
          App.homePageDecison(projectPageUI(App.projectShelf.findNonStaticProject(e.target.id)))
         console.log(App.projectShelf.findNonStaticProject(e.target.id).getTodos()[0].displayTask()); 
        }
      })

      document.addEventListener("click", function(e){
        if(e.target && e.target.classList.value === "foldItems"){
          document.querySelector(".setProject").lastElementChild.id = e.target.id
          document.querySelector(".setProject").lastElementChild.innerHTML =
            App.projectShelf.findNonStaticProject(e.target.id).getProjectName()
            addToAFldr.classList.remove("active");
        }
      })

      // urgency.addEventListener("click", function(e){
      //   console.log(e.target.classList.value)
      // })

      document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.value === "foldItems") {
          document.querySelector(".setProject").lastElementChild.innerHTML =
            App.projectShelf.findNonStaticProject(e.target.id).getProjectName();
          addToAFldr.classList.remove("active");
        }
      });

      
    }


     function render() {
       shortcutUI(App.projectShelf);
       NonStaticUI(App.projectShelf)
       foldersinTodoForm()
     }

  


    const init = _ => {
      render();
      listeners();
    }



    return{
        init
    }

})()

export default DOM;
