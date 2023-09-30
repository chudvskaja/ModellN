const portfolioList = document.querySelector(".portfolio-list");

function fetchPortfolio() {
  fetch("https://modelin.webmcdm.dk/portfolios")
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(portfolios => renderPortfolioList(portfolios))
    .catch(error => console.error(error));
}

function renderPortfolioList(portfolio) {
  portfolio.forEach(portfolio => {
    const listItem = document.createElement("li");
    listItem.classList.add("portfolio-item");

    const portfolioTeaser = document.createElement("img");
    portfolioTeaser.setAttribute("src", portfolio.teaser);
    portfolioTeaser.setAttribute("alt", portfolio.title);
    portfolioTeaser.classList.add("portfolio-teaser");

    const portfolioLike = document.createElement("button");
    portfolioLike.classList.add("like-button");
    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fas", "fa-thumbs-up"); // Здесь "fa-thumbs-up" - это класс иконки Font Awesome
    portfolioLike.appendChild(likeIcon);

    portfolioTeaser.addEventListener('click', () => {
      enlargeImage(portfolioTeaser);
    });


    const portfolioCount = document.createElement("span");
   portfolioCount.classList.add("likes-count");
   portfolioCount.textContent = 0;

   portfolioLike.addEventListener('click', () => {
      let likes = parseInt(portfolioCount.textContent); // Получаем текущее количество лайков

      likes++; // Увеличиваем количество лайков при нажатии
      portfolioCount.textContent = likes; // Обновляем счетчик лайков
      portfolioLike.disabled = true; // Отключаем кнопку после нажатия (чтобы нельзя было ставить лайк дважды)
    });

    listItem.appendChild(portfolioTeaser);
    listItem.appendChild(portfolioLike);
    listItem.appendChild(portfolioCount);

    portfolioList.appendChild(listItem);
  });
}


fetchPortfolio(); 

function enlargeImage(image) {
  const enlargedImage = document.createElement('img');
  enlargedImage.setAttribute('src', image.src);
  enlargedImage.classList.add('enlarged-image');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-button');
  closeBtn.textContent = 'Close';

  closeBtn.addEventListener('click', () => {
    document.body.classList.remove('enlarged'); // Убираем класс enlarged при закрытии увеличенной картинки
    document.body.removeChild(enlargedImage);
    document.body.removeChild(closeBtn);
  });

  document.body.classList.add('enlarged'); // Добавляем класс enlarged при увеличении картинки
  document.body.appendChild(enlargedImage);
  document.body.appendChild(closeBtn);
}
