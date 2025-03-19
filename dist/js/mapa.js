function initMap() {
  const ubicacion = { lat: -33.4489, lng: -70.6693 }; // Reemplaza con la latitud y longitud correctas
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: ubicacion,
  });

  new google.maps.Marker({
    position: ubicacion,
    map: map,
    title: "Ubicación del evento",
  });
}
