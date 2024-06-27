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
      <h2>${city.name}
      <input type="text" id="name${city.id}" value="${city.name}">
      <input type="submit"> 
      </h2>
      <p>Country: ${city.country}
      <input type="text" id="country${city.id}" value="${city.country}">
      <input type="submit"> 
      </p>
      <p>Latitude : ${city.coordinates.lat}
      <input type="text" id="lat${city.id}" value="${city.coordinates.lat}">
      <input type="submit"> 
      </p>
      <p>Longitude : ${city.coordinates.lng}
      <input type="text" id="lng${city.id}" value="${city.coordinates.lng}">
      <input type="submit"> 
      </p>
      <p>Population: ${city.population}
      <input type="text" id="population${city.id}" value="${city.population}">
      <input type="submit"> 
      </p>
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
  const country = document.getElementById(`country${cityId}`).value;
  const lat = document.getElementById(`lat${cityId}`).value;
  const lng = document.getElementById(`lng${cityId}`).value;
  const population = document.getElementById(`population${cityId}`).value;
  const cityIndex = cities.findIndex(city => city.id === cityId);

  cities[cityIndex].name = name;
  cities[cityIndex].country = country;
  cities[cityIndex].coordinates.lat = lat;
  cities[cityIndex].coordinates.lng = lng;
  cities[cityIndex].population = population;

  localStorage.setItem('cities', JSON.stringify(cities));
  document.getElementById(`cityForm${cityId}`).reset();
  displayCities();
}
