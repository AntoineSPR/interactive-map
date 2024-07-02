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
        addMarkers(city);
        createList(city);
    });
    addCityForm();
}

function toggleMap() {
    list.style.display = "none";
    map.style.display = "block";
}

function toggleList() {
    list.style.display = "flex";
    map.style.display = "none";
    legend.style.display = "none";
}
