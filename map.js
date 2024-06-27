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
  list.innerHTML = `<h1>Capitales</h1>`;
  map.innerHTML = '';

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
      `<form id="cityForm${city.id}" onsubmit="editCity(event, ${city.id})">
      <input type="hidden" id="${city.id}">
      <h2>${city.name} <span id="delete${city.id}" onclick="deleteCity(${city.id})">&#128465;</span>
      <input type="text" id="name${city.id}" value="${city.name}">
      <input type="submit"> 
      </h2>
      <p>Pays : ${city.country}
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
      <p>Population : ${city.population}
      <input type="text" id="population${city.id}" value="${city.population}">
      <input type="submit"> 
      </p>
      </form>`;
    list.appendChild(listItem);
  });

  list.innerHTML += 
  `<h3>Ajouter une ville:</h3>
  <form id="newCityForm" onsubmit="addCity(event)">
      <label for="name">Nom : </label>
      <input type="text" id="name" name="name"> <br>
      <label for="country">Pays : </label>
      <input type="text" id="country" name="country"> <br>
      <label for="lat">Latitude : </label>
      <input type="text" id="lat" name="lat"> <br>
      <label for="lng">Longitude : </label>
      <input type="text" id="lng" name="lng"> <br>
      <label for="population">Population : </label>
      <input type="text" id="population" name="population"> <br>
      <input type="submit"> 
  </form>`;
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
  legend.style.display = "none";
}

function editCity(event, cityId) {
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
  displayCities();
}

function addCity(event) {
  event.preventDefault();
  const name = document.getElementById(`name`).value;
  const country = document.getElementById(`country`).value;
  const lat = document.getElementById(`lat`).value;
  const lng = document.getElementById(`lng`).value;
  const population = document.getElementById(`population`).value;
  const newCityId = cities.length > 0 ? Math.max(...cities.map(city => city.id)) + 1 : 1;

  const newCity = {
    id: newCityId,
    name: name,
    country: country,
    coordinates: {
      lat: lat,
      lng: lng
    },
    population: population
  };

  cities.push(newCity);
  localStorage.setItem('cities', JSON.stringify(cities));
  displayCities();
}

function deleteCity(cityId) {
  const cityIndex = cities.findIndex(city => city.id === cityId);

  const confirmation = confirm(`Voulez-vous vraiment supprimer ${cities[cityIndex].name}?`);

  if(confirmation){
  cities.splice(cityIndex, 1);
  localStorage.setItem('cities', JSON.stringify(cities));
  displayCities();
  }
}
