// Sharable link to Google Apps Script:
// https://script.google.com/d/1BMgIgBuUw-pYf2Va4PKHhyRJKz629KhAjuRchuNmis-_lJzEdMRSnKBn/edit?usp=sharing

document.getElementById("btn").addEventListener("click", getData)

function getData() {
    const result = document.getElementById("result")
    const input = encodeURIComponent(document.getElementById("userInput").value)
    const url = "https://script.google.com/macros/s/AKfycbyl6Q5d5izTLnsmkUBmwT15bmD95dxbCBkBV6MTh7GQS4V8eYghNuzNwi4Wk7VoEOsi/exec"

    // Set the center coordinates for the map, and the inital zoom level
    const map = L.map('map').setView([33.7756222,-84.398479], 13)
    // Add the streetmap layer to make the map visible
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
    }).addTo(map);
    
    fetch(url,{
        method:'POST',
        body: JSON.stringify({location:input})
    })
        .then(response => response.json())
        .then(data => {
            try {
                coord = [data.coord.lat, data.coord.lon]
                // Center the map to the location
                map.setView(coord, 10);
                // Add popup to the marker
                const marker = L.marker(coord).addTo(map);
                marker.bindPopup(` 
                    <p>Temp: ${data.main.temp} &#8457;<br>
                    Wind: ${data.wind.speed} mph<br>
                    Description: ${data.weather[0].description}</p>
                    <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`)
            } catch (err) {
                console.log(err)
                result.innerHTML = err.message
            }
        })
        .catch(err => {
            console.log(err)
            result.innerHTML = err.message
        });
}

function formatHTML(data){
    return `
        <p>Temp: ${data.main.temp} &#8457;<br>
        Wind: ${data.wind.speed} mph<br>
        Description: ${data.weather[0].description}</p>
        <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`
}