import App from "./main";
import { tasks } from "../objects";
import {
  pushTodoToProject,
  innerHtml,
  dateCheck,
  todayOrThisWeek,
  createNonStaticFolder,
  deleteTodoFromNonStaticFolder,
  deleteFromStaticFolders,
  deleteFolder,
} from "./controllers";

const DOM = (() => {
  function shortcutUI(statics) {
    const shortcut = document.querySelector(".static");
    let markUp = ``;
    statics.getStaticProject().forEach((items, index) => {
      markUp += `
            <li class="item" id="${index}">  ${items.name}  </li>
          `;
    });
    shortcut.innerHTML = markUp;
  }


  function nonStaticUI(data) {
    const project = document.querySelector(".non-static");

    let markUp = ``;
    data.getNonStaticProject().forEach((items, index) => {
      markUp += `
            <li id="${index}" class="folder item" id="${index}">
            ${items.name}
            <i class="bi bi-trash3-fill trush"></i>
            </li>
          `;
    });
    project.innerHTML = markUp;
  }

  function foldersinTodoForm() {
    const folders = document.querySelector(".fold");
    let markUp = ``;
    App.projectShelf.getNonStaticProject().map((folders, index) => {
      markUp += `
          <div id="${index}" class="foldItems">${folders.name}</div>
        `;
    });
    folders.innerHTML = markUp;
  }

  function projectPageUI(project) {
    const projectPage = document.querySelector(".to-do_box");
    const projectItem = document.querySelector(".todos");
    const markUp1 = `
      <div class="side-menu">
                    <i class="bi bi-list"></i>
               </div>
        <div class="to-do_title">      
                    <h2>${project.name}</h2>
               </div>
       `;

    projectPage.innerHTML = markUp1;

    let markUp2 = ``;
    project.todos.forEach((val, index) => {
      markUp2 += `
              <li folder="${val.projectId}" id="${index}" class="to-dos">
                       <div class="left-side">
                           <i class="bi bi-circle"></i>
                           <p>${val.task}</p>
                        </div> 
                           
                        ${
                          !val.dueTimeAndDate.date
                            ? ""
                            : `<div class="timeanddate">
                          <div class="time">
                            <i class="bi bi-alarm"></i>
                            <p>${val.dueTimeAndDate.time}</p>
                        </div>
                        <div class="dates">
                           <i class="bi bi-calendar-event"></i>
                            <p>${val.dueTimeAndDate.date}</p>
                        </div>
                        </div>`
                        }
                        
                           
                        </div>
                        <div class="right-side">
                            <i class="bi bi-trash3-fill"></i>
                        </div>
                   </li>
         `;
    });

    projectItem.innerHTML = markUp2;
    projectPage.appendChild(projectItem);
    return projectPage;
  }

  function restoreProjectPageToDefault() {
    document.querySelector(".to-do_box").innerHTML = `
       <div class="side-menu">
                    <i class="bi bi-list"></i>
               </div>
        <div class="to-do_title">
                    <h2>.to-Do</h2>
               </div>
               <ul class="todos">
                  
               </ul>
      `;
    return document.querySelector(".to-do_box");
  }

  function homePageDecison(markup) {
    document.querySelector(".display_to-do").appendChild(markup);
  }

  function restoreProjectForm() {
    document.querySelector(".add-folder").value = "";
  }

  function restoreTodoForm() {
    document.querySelector(".add-to-do").value = "";
    document.querySelector(".setProject").lastElementChild.innerHTML =
      "add to a Project";
    document.querySelector(".due-date").lastElementChild.innerHTML =
      "Set due date";
    document.querySelector(".setPriority").lastElementChild.innerHTML =
      "Set Priority";
    document.querySelector(".add-time").value = "";
    document.querySelector(".add-date").value = "";
  }

  function removeIDSFromForm() {
    document
      .querySelector(".setProject")
      .lastElementChild.removeAttribute("id");
    document.querySelector(".due-date").lastElementChild.removeAttribute("id");
    document
      .querySelector(".setPriority")
      .lastElementChild.removeAttribute("id");
  }

  function closeModals(modal) {
    if (modal.classList.value === "modal_task active") {
      restoreTodoForm();
      removeIDSFromForm();
    }
    modal.classList.remove("active");
    cover.classList.remove("show_caver");
  }

  function addEvent(elem) {
    elem.addEventListener("click", function () {
      closeModals(elem.parentElement);
    });
  }

  function listeners() {
    const folder = document.querySelector(".aproject");
    const addTask = document.querySelector(".add-task_button");
    const addTaskBtn = document.querySelector(".addtask");
    const modalTask = document.querySelector(".modal_task");
    const productMod = document.querySelector(".modal_product");
    const addFold = document.querySelector(".atask");
    const dueDate = document.querySelector(".due-date");
    const priority = document.querySelector(".setPriority");
    const slctFldr = document.querySelector(".setProject");
    const setDate = document.querySelector(".modal_due-date");
    const setPriority = document.querySelector(".modal_priority-col");
    const addToAFldr = document.querySelector(".modal_folders");
    const dateData = document.querySelector(".date");
    const staticFolders = document.querySelector(".static");
    const closeModal = document.querySelectorAll(".bi-x-circle");
    const folderInput = document.querySelector(".add-folder");
    const todoName = document.querySelector(".add-to-do");
    const sidemenu = document.querySelector(".side-menu");
    const cover = document.querySelector(".caver")

    folder.addEventListener("click", function () {
      productMod.classList.add("active");
    });

    // create folder
    addFold.addEventListener("click", function () {
      if (!folderInput.value) {
        alert("enter folder name");
        return;
      }
      createNonStaticFolder(folderInput.value);
      render();
      restoreProjectForm();
      productMod.classList.remove("active");
    });

    addTask.addEventListener("click", function () {
      modalTask.classList.add("active");
      cover.classList.add("show_caver");
    });

    cover.addEventListener("click", function(){
      modalTask.classList.remove("active");
      cover.classList.remove("show_caver");
    })

    // create to do Item
    addTaskBtn.addEventListener("click", function () {
      if (!todoName.value) {
        alert("enter task name");
        return;
      }
      if (!slctFldr.lastElementChild.id) {
        alert("choose a project folder");
        return;
      }

      const newTodo = tasks(todoName.value);
      if ((dueDate.lastElementChild.id = "time")) {
        newTodo.addDueTimeAndDate(
          dueDate.lastElementChild.innerHTML.split(",")[0],
          dueDate.lastElementChild.innerHTML.split(",")[1]
        );
      }
      if ((priority.lastElementChild.id = "prior")) {
        newTodo.setPriority(priority.lastElementChild.innerHTML);
      }

      newTodo.projectId =
        document.querySelector(".setProject").lastElementChild.id;
      pushTodoToProject(
        document.querySelector(".setProject").lastElementChild.id,
        newTodo
      );

      homePageDecison(
        projectPageUI(
          App.projectShelf.findNonStaticProject(
            document.querySelector(".setProject").lastElementChild.id
          )
        )
      );

      // saveToLocalStorage();
      todayOrThisWeek();
      removeIDSFromForm();
      restoreTodoForm();
      modalTask.classList.remove("active");
      cover.classList.remove("show_caver");
    });

    // show due date modal
    dueDate.addEventListener("click", function () {
      setDate.classList.add("active");
    });

    // show priority modal
    priority.addEventListener("click", function () {
      setPriority.classList.add("active");
    });

    // select a folder for your todo
    slctFldr.addEventListener("click", function () {
      if (!App.projectShelf.getNonStaticProject().length) {
        productMod.classList.add("active");
      }
      addToAFldr.classList.add("active");
    });

    dateData.addEventListener("click", function () {
      if (
        !document.querySelector(".dateTime").firstElementChild.value ||
        !document.querySelector(".dateTime").lastElementChild.value
      ) {
        setDate.classList.remove("active");
        return;
      }

      if (
        !dateCheck(
          document.querySelector(".dateTime").lastElementChild.value,
          document.querySelector(".dateTime").firstElementChild.value
        )
      ) {
        alert("enter current or future date and time");
        return;
      }

      innerHtml(
        dueDate.lastElementChild,
        `${document.querySelector(".dateTime").firstElementChild.value},${
          document.querySelector(".dateTime").lastElementChild.value
        }`
      );

      dueDate.lastElementChild.id = "time";
      setDate.classList.remove("active");
    });

    document
      .querySelector(".modal_priority-col")
      .addEventListener("click", function (e) {
        if (e.target.classList[0] === "urgency") {
          priority.lastElementChild.id = "prior";
          innerHtml(priority.lastElementChild, e.target.innerHTML);
        }
        setPriority.classList.remove("active");
      });

    // click to view folders in this week and today
    staticFolders.addEventListener("click", function (e) {
      todayOrThisWeek();
      homePageDecison(
        projectPageUI(App.projectShelf.findStaticProject(e.target.id))
      );
    });

    // render folder
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value === "folder item") {
        homePageDecison(
          projectPageUI(App.projectShelf.findNonStaticProject(e.target.id))
        );
      }
    });

    // set folder in create to do modal
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value === "foldItems") {
        document.querySelector(".setProject").lastElementChild.id = e.target.id;
        innerHtml(
          document.querySelector(".setProject").lastElementChild,
          App.projectShelf.findNonStaticProject(e.target.id).name
        );
        addToAFldr.classList.remove("active");
      }
    });

    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value === "foldItems") {
        document.querySelector(".setProject").lastElementChild.innerHTML =
          App.projectShelf.findNonStaticProject(e.target.id).name;
        addToAFldr.classList.remove("active");
      }
    });

    // close all modals
    for (let i = 0; i < closeModal.length; i++) {
      addEvent(closeModal[i]);
    }

    // done to do Item
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value == "bi bi-circle") {
        deleteTodoFromNonStaticFolder(
          e.target.parentElement.parentElement.getAttribute("folder"),
          e.target.parentElement.parentElement.id
        );

        deleteFromStaticFolders(e.target.nextElementSibling.innerHTML);
          console.log(e.target.parentElement.parentElement.parentElement)
        // saveToLocalStorage();

        homePageDecison(
          projectPageUI(
            App.projectShelf.findNonStaticProject(
              e.target.parentElement.parentElement.getAttribute("folder")
            )
          )
        );
      }
    });

    // delete to do item
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value == "bi bi-trash3-fill") {
        console.log( e.target.parentElement.parentElement.getAttribute("folder"),e.target.parentElement.parentElement.id)
        deleteTodoFromNonStaticFolder(
          e.target.parentElement.parentElement.getAttribute("folder"),
          e.target.parentElement.parentElement.id
        );

        deleteFromStaticFolders(
          e.target.parentElement.parentElement.firstElementChild
            .lastElementChild.innerHTML
        );

        // saveToLocalStorage();

        homePageDecison(
          projectPageUI(
            App.projectShelf.findNonStaticProject(
              e.target.parentElement.parentElement.getAttribute("folder")
            )
          )
        );
      }
    });

    // delete Folder
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value == "bi bi-trash3-fill trush") {
        console.log(e.target)
        deleteFolder(e.target.parentElement.id);
        // saveToLocalStorage();
        render();
        homePageDecison(restoreProjectPageToDefault());
      }
    });

    // open side menu phone view
    sidemenu.addEventListener("click", function () {
      document.querySelector(".to-do_app").classList.toggle("openmenu");
    });

    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value == "side-menu") {
        document.querySelector(".to-do_app").classList.add("openmenu");
      }
    });

    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.value == "bi bi-list") {
        document.querySelector(".to-do_app").classList.add("openmenu");
      }
    });

    // close side menu
    document
      .querySelector(".close_side-menu")
      .addEventListener("click", function () {
        document.querySelector(".to-do_app").classList.remove("openmenu");
      });
  }

  function render() {
    shortcutUI(App.projectShelf);
    nonStaticUI(App.projectShelf);
    foldersinTodoForm();
  }

  const init = (_) => {
    render();
    listeners();
  };

  return {
    init,
  };
})();

export default DOM;
