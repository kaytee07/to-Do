import {mainObjectBag, project} from '../objects';
import {
  createFolder,
} from './controllers';

const App = (() => {
  const projectShelf = mainObjectBag();

function createStaticFolders() {
    const today = project('Today');
    const all7Days = project('This week');
    createFolder([today, all7Days], projectShelf);
  }

  function loadStorageItemsToProject() {
    if (localStorage.getItem('projects')) {
      JSON.parse(localStorage.getItem('projects')).map((val) => {
        projectShelf.addNonStaticProject(val);
      });
    }
  }

  createStaticFolders();
  loadStorageItemsToProject();

  return {
    projectShelf,
  };
})();

export default App;
