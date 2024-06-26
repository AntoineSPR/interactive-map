let map = document.querySelector("gmp-map");
let list = document.querySelector(".list");
let legend = document.getElementById("legend");
let cities = [];

function loadJSON(callback) {
  let xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'cities.json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cities = JSON.parse(xhr.responseText);
      displayCities();
    }
  }
  xhr.send();
};

loadJSON();

function displayCities() {
  list.innerHTML = '';
  cities.forEach(city => {
    let marker = document.createElement("gmp-advanced-marker");
    marker.setAttribute("position", `${city.coordinates.lat}, ${city.coordinates.lng}`);
    marker.setAttribute("title", city.name);
    map.appendChild(marker);
    marker.addEventListener("click", (event) => {
      displayLegend(event, city);
      }
    );
    let listItem = document.createElement("div");
    listItem.innerHTML = 
      `
      <form id="cityForm${city.id}" onsubmit="handleSubmit(event, ${city.id})">
      <input type="hidden" id="${city.id}">
      <h2>${city.name}</h2>
      <input type="text" id="name${city.id}" value="${city.name}">
      <input type="submit"> 
      <p>Country: ${city.country}</p>
      <p>Latitude : ${city.coordinates.lat}</p>
      <p>Longitude : ${city.coordinates.lng}</p>
      <p>Population: ${city.population}</p>
      </form>`;
    list.appendChild(listItem);
  });
}

function displayLegend(event, city){
  legend.innerHTML = 
    `<h2>${city.name}</h2>
    <p>Population: ${city.population}</p>
    <span>&#10006;</span>`;
  legend.style.display = "block";
  legend.style.left = event.clientX + "px";
  legend.style.top = event.clientY + "px";
  let cross = document.querySelector("#legend span");
  cross.addEventListener("click", () => {
    legend.style.display = "none";
  })
}

function toggleMap(){ 
  list.style.display = "none";
  map.style.display = "block";
}

function toggleList(){
  list.style.display = "block";
  map.style.display = "none";
}

function handleSubmit(event, cityId) {
  event.preventDefault();
  const name = document.getElementById(`name${cityId}`).value;
  const cityIndex = cities.findIndex(city => city.id === cityId);
  cities[cityIndex].name = name;
  console.log(cities[cityIndex]);
  localStorage.setItem('cities', JSON.stringify(cities));
  document.getElementById(`cityForm${cityId}`).reset();
  displayCities();
}
