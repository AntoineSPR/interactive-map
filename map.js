function addMarkers(city) {
  let marker = document.createElement("gmp-advanced-marker");
  marker.setAttribute("position", `${city.coordinates.lat}, ${city.coordinates.lng}`);
  marker.setAttribute("title", city.name);
  map.appendChild(marker);
  marker.addEventListener("click", (event) => {
    displayLegend(event, city);
  }
  );
}

function displayLegend(event, city) {
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

function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      let userMarker = document.createElement("gmp-advanced-marker");
      userMarker.setAttribute("position", `${userLocation.lat}, ${userLocation.lng}`);
      userMarker.setAttribute("title", "Votre position");
      map.appendChild(userMarker);

      map.setAttribute("center", `${userLocation.lat}, ${userLocation.lng}`);
      map.setAttribute("zoom", "10");
    });
  } else {
    alert('Votre navigateur ne prend pas en charge la géolocalisation');
  }
}