// sources: see file README.md

// a function for fetching GeoJSON data
async function fetchGeoJSON() {
  try {
    const address = 'https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326';
    const response = await fetch(address);
    if (!response.ok) {
      throw new Error("Something went wrong while attempting to fetch data.");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Something else went wrong while attempting to fetch data: ", error);
  }
}

// main function
async function main() {
  // initialize the map
  var map = L.map('map', {
      center: [51.505, -0.09],
      minZoom: -3
  });
  // fetch the GeoJSON data
  var geoJSONData = await fetchGeoJSON(); 
  // add GeoJSON layer to the map
  var geoJsonLayer = L.geoJSON(geoJSONData, {
      style: {
        weight: 2
      }
  }).addTo(map);
  // fit the map to the GeoJSON data bounds
  map.fitBounds(geoJsonLayer.getBounds());
}

// run app
main()