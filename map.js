let map = document.querySelector("gmp-map");

function loadJSON(callback) {
  let xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'cities.json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  }
  xhr.send();
};

loadJSON(function(response) {
  let cities = JSON.parse(response);
  cities.forEach(function(city) {
    let marker = document.createElement("gmp-advanced-marker");
    marker.setAttribute("position", `${city.coordinates.lat}, ${city.coordinates.lng}`);
    marker.setAttribute("title", city.name);
    map.appendChild(marker);
    console.log(city);
  });
});