document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([23.8103, 90.4125], 12); // Default Dhaka

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var busMarkers = {}; // Store markers by bus number

    function updateBusLocations() {
        fetch('/data')
            .then(response => response.json())
            .then(busData => {
                Object.keys(busData).forEach(busNumber => {
                    let { latitude, longitude } = busData[busNumber];

                    if (busMarkers[busNumber]) {
                        busMarkers[busNumber].setLatLng([latitude, longitude]);
                    } else {
                        busMarkers[busNumber] = L.marker([latitude, longitude])
                            .addTo(map)
                            .bindPopup(`Bus ${busNumber}`);
                    }
                });
            })
            .catch(error => console.error('Error fetching bus data:', error));
    }

    setInterval(updateBusLocations, 2000); // Fetch new data every 2 seconds
});
