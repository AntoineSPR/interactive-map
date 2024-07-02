function createList(city) {
    let listItem = document.createElement("div");
    listItem.innerHTML =
        `<form id="cityForm${city.id}" onsubmit="editCity(event, ${city.id})">
      <input type="hidden" id="${city.id}">
      <h2>${city.name} 
      <button id="delete${city.id}" type="button" onclick="deleteCity(${city.id})">&#128465;</button>
      <button id="edit${city.id}" type="button" onclick="toggleEditForm(${city.id})">Modifier</button>
      <input type="text" id="name${city.id}" value="${city.name}">
      <input type="submit"> 
      </h2>
      <p>Pays : ${city.country}
      <input type="text" id="country${city.id}" value="${city.country}">
      <input type="submit"> 
      </p>
      <p>Latitude : ${city.coordinates.lat}
      <input type="text" id="lat${city.id}" value="${city.coordinates.lat}"> 
      <br>
      Longitude : ${city.coordinates.lng}
      <input type="text" id="lng${city.id}" value="${city.coordinates.lng}">
      <input type="submit"> 
      </p>
      <p>Population : ${city.population}
      <input type="text" id="population${city.id}" value="${city.population}">
      <input type="submit"> 
      </p>
      </form>`;
    list.appendChild(listItem);
}

function addCityForm() {
    list.innerHTML +=
        `<button id="addCity" type="button" onclick="toggleAddForm()">Ajouter une ville</button>
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

function editCity(event, cityId) {
    event.preventDefault();

    const name = document.getElementById(`name${cityId}`).value;
    const country = document.getElementById(`country${cityId}`).value;
    const lat = parseFloat(document.getElementById(`lat${cityId}`).value);
    const lng = parseFloat(document.getElementById(`lng${cityId}`).value);
    const population = parseInt(document.getElementById(`population${cityId}`).value);
    const cityIndex = cities.findIndex(city => city.id === cityId);

    if (!isNaN(lat) && !isNaN(lng) && !isNaN(population)) {
        cities[cityIndex] = {
            ...cities[cityIndex],
            name,
            country,
            coordinates: { lat, lng },
            population
        };
        localStorage.setItem('cities', JSON.stringify(cities));
        displayCities();
    } else {
        alert("Les champs population, latitude et longitude doivent être des nombres");
    }
}

function addCity(event) {
    event.preventDefault();
    const name = document.getElementById(`name`).value;
    const country = document.getElementById(`country`).value;
    const lat = parseFloat(document.getElementById(`lat`).value);
    const lng = parseFloat(document.getElementById(`lng`).value);
    const population = parseInt(document.getElementById(`population`).value);
    const newCityId = cities.length > 0 ? Math.max(...cities.map(city => city.id)) + 1 : 1;

    if (!isNaN(lat) && !isNaN(lng) && !isNaN(population)) {
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
    } else {
        alert("Les champs population, latitude et longitude doivent être des nombres");
    }
}

function deleteCity(cityId) {
    const cityIndex = cities.findIndex(city => city.id === cityId);

    const confirmation = confirm(`Voulez-vous vraiment supprimer ${cities[cityIndex].name}?`);

    if (confirmation) {
        cities.splice(cityIndex, 1);
        localStorage.setItem('cities', JSON.stringify(cities));
        displayCities();
    }
}

function toggleEditForm(cityId) {
    let form = document.getElementById(`cityForm${cityId}`);
    let inputs = form.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        input.style.display = input.style.display !== 'inline-block' ? 'inline-block' : 'none';
    }
}

function toggleAddForm() {
    let form = document.getElementById('newCityForm');

    form.style.display = form.style.display !== 'block' ? 'block' : 'none';
    form.scrollIntoView({ behavior: 'smooth' });
}