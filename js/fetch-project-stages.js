const projectStagesList = document.querySelector(".project-stages-list");

function fetchProjectStages() {
  fetch("../data/projects.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((project) => renderProjectStagesList(project))
    .catch((error) => console.log(error));
}

fetchProjectStages();

function renderProjectStagesList(project) {
  const markup = project
    .map((project) => {
      return `<li class="project-item">
        <div class="project-icon">
          <p class="project-text">${project.project}</p>
          <i class="fa-solid fa-plus"></i>
        </div>
        <p class="dropdown-text">${project.answer}</p>
      </li>`;
    })
    .join("");
  projectStagesList.innerHTML = markup;
}  
