const serviceList = document.querySelector(".services-list");


function fetchService() {
  fetch("../data/services.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((service) => renderServiceList(service))
   .catch((error) => console.log(error));
}

fetchService();

function renderServiceList(service) {
    const markup = service
      .map((service) => {
        return `<li class="service-item">
        <div class="service-icon">
        <p class="service-text">${service.service}</p>
        <i class="fa-solid fa-plus"></i>
    </div>
    
        <p class="dropdown-text">${service.answer}</p>
       </li>`;
      })
      .join("");
      serviceList.innerHTML = markup;
  }