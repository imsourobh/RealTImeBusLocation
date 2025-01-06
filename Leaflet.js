<!DOCTYPE html>
<html>
  <head>
    <title>Bus Location Tracker</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    />
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
    <style>
      #map {
        height: 100vh;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <h1>Real-Time Bus Location</h1>
    <div id="map"></div>
    <script>
      // Initialize Leaflet map
      const map = L.map("map").setView([23.8103, 90.4125], 12); // Default center (e.g., Dhaka)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Store markers for buses
      const markers = {};

      // Function to fetch and update bus locations
      function fetchBusLocations() {
        setInterval(async () => {
          try {
            const response = await fetch("https://realtimebuslocation-production.up.railway.app/locations");
            const buses = await response.json();

            buses.forEach((bus) => {
              const { id, latitude, longitude } = bus;

              // If marker exists, update position; else, create a new marker
              if (markers[id]) {
                markers[id].setLatLng([latitude, longitude]);
              } else {
                markers[id] = L.marker([latitude, longitude])
                  .addTo(map)
                  .bindPopup(`Bus ${id}`);
              }
            });
          } catch (error) {
            console.error("Error fetching bus locations:", error);
          }
        }, 5000); // Fetch every 5 seconds
      }

      // Start fetching bus locations
      fetchBusLocations();
    </script>
  </body>
</html>
