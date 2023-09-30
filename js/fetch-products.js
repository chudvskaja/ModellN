const projectsList = document.querySelector(".projects-list");

function fetchProjects() {
  fetch("https://modelin.webmcdm.dk/portfolios")
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(projects => renderProjectsList(projects))
    .catch(error => console.error(error));
}

function renderProjectsList(projects) {
  projects.forEach(project => {
    const listItem = document.createElement("li");
    listItem.classList.add("project-item");

    const projectTeaser = document.createElement("img");
    projectTeaser.setAttribute("src", project.teaser);
    projectTeaser.setAttribute("alt", project.title);
    projectTeaser.classList.add("project-teaser");

    const projectLike = document.createElement("button");
    projectLike.classList.add("like-button");
    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-thumbs-up"); // Здесь "fa-thumbs-up" - это класс иконки Font Awesome
    projectLike.appendChild(likeIcon);


    const projectCount = document.createElement("span");
    projectCount.classList.add("likes-count");
    projectCount.textContent = 0;

    projectLike.addEventListener('click', () => {
      let likes = parseInt(projectCount.textContent); // Получаем текущее количество лайков

      likes++; // Увеличиваем количество лайков при нажатии
      projectCount.textContent = likes; // Обновляем счетчик лайков
      projectLike.disabled = true; // Отключаем кнопку после нажатия (чтобы нельзя было ставить лайк дважды)
    });

    listItem.appendChild(projectTeaser);
    listItem.appendChild(projectLike);
    listItem.appendChild(projectCount);

    projectsList.appendChild(listItem);
  });
}

fetchProjects();
