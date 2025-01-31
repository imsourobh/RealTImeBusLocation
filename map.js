// Initialize the map
var map = L.map('map').setView([24.919897878476, 91.82930635337908], 15); 

// Load OpenStreetMap tiles (Free alternative to Google Maps)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Store bus markers
var busMarkers = {};

// Function to fetch bus data and update markers
function updateBusLocations() {
    fetch('/data')
        .then(response => response.json())
        .then(busData => {
            Object.keys(busData).forEach(busNumber => {
                let bus = busData[busNumber];
                let lat = parseFloat(bus.latitude);
                let lon = parseFloat(bus.longitude);
                
                if (busMarkers[busNumber]) {
                    // Move existing marker
                    busMarkers[busNumber].setLatLng([lat, lon])
                        .bindPopup(`Bus ${busNumber}<br>Lat: ${lat}<br>Lon: ${lon}`)
                        .openPopup();
                } else {
                    // Add new marker
                    busMarkers[busNumber] = L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`Bus ${busNumber}<br>Lat: ${lat}<br>Lon: ${lon}`)
                        .openPopup();
                }
            });
        })
        .catch(error => console.error('Error fetching bus data:', error));
}

// Update every 5 seconds
setInterval(updateBusLocations, 5000);

// Initial call
updateBusLocations();
