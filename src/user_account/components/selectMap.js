






// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

// mapboxgl.accessToken = 'pk.eyJ1Ijoic3Jpbml2YXN5cjIwMDAiLCJhIjoiY20ydDN2bzQ0MDQ0cTJxcGRlMGUxb3NmOCJ9.R6H0GnCJISBk0upFIFSF6A';
// const geocoderService = MapboxGeocoder({ accessToken: mapboxgl.accessToken });

// const MapComponent = () => {
//   const mapContainer = useRef(null);
//   const [map, setMap] = useState(null);
//   const [address, setAddress] = useState("Fetching address...");
//   const markerRef = useRef(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const userLocation = [position.coords.longitude, position.coords.latitude];

//         // Fetch address for the user's initial location
//         const response = await geocoderService
//           .reverseGeocode({
//             query: userLocation,
//             limit: 1,
//           })
//           .send();

//         if (response && response.body.features.length) {
//           const initialAddress = response.body.features[0].place_name;
//           setAddress(initialAddress);
//         } else {
//           setAddress("Address not found");
//         }

//         // Initialize the map and marker
//         const initializeMap = new mapboxgl.Map({
//           container: mapContainer.current,
//           style: 'mapbox://styles/mapbox/streets-v11',
//           center: userLocation,
//           zoom: 12,
//         });

//         setMap(initializeMap);

//         // Initialize marker at user's location
//         markerRef.current = new mapboxgl.Marker()
//           .setLngLat(userLocation)
//           .addTo(initializeMap);

//         // Handle map click to update marker and fetch address
//         initializeMap.on('click', async (event) => {
//           const { lng, lat } = event.lngLat;
//           markerRef.current.setLngLat([lng, lat]);

//           const response = await geocoderService
//             .reverseGeocode({
//               query: [lng, lat],
//               limit: 1,
//             })
//             .send();

//           if (response && response.body.features.length) {
//             const selectedAddress = response.body.features[0].place_name;
//             setAddress(selectedAddress);

//             new mapboxgl.Popup()
//               .setLngLat([lng, lat])
//               .setHTML(`<p>${selectedAddress}</p>`)
//               .addTo(initializeMap);
//           } else {
//             setAddress("Address not found");
//           }
//         });

//         // Cleanup on unmount
//         return () => initializeMap.remove();
//       },
//       () => alert("Unable to retrieve your location")
//     );
//   }, []);

//   return (
//     <div>
//       <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
//       <p>Selected Address: {address}</p>
//     </div>
//   );
// };

// export default MapComponent;




import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Jpbml2YXN5cjIwMDAiLCJhIjoiY20ydDN2bzQ0MDQ0cTJxcGRlMGUxb3NmOCJ9.R6H0GnCJISBk0upFIFSF6A';
const geocoderService = MapboxGeocoder({ accessToken: mapboxgl.accessToken });

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState("Fetching address...");
  const markerRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLocation = [position.coords.longitude, position.coords.latitude];

        // Fetch initial address for the user's location
        const response = await geocoderService
          .reverseGeocode({
            query: userLocation,
            limit: 1,
          })
          .send();

        if (response && response.body.features.length) {
          const initialAddress = response.body.features[0].place_name;
          setAddress(initialAddress);
        } else {
          setAddress("Address not found");
        }

        // Initialize the map and marker
        const initializeMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: userLocation,
          zoom: 12,
        });

        setMap(initializeMap);

        // Initialize marker at user's location
        markerRef.current = new mapboxgl.Marker()
          .setLngLat(userLocation)
          .addTo(initializeMap);

        // Handle map click to update marker and fetch address
        initializeMap.on('click', async (event) => {
          const { lng, lat } = event.lngLat;
          markerRef.current.setLngLat([lng, lat]);

          const response = await geocoderService
            .reverseGeocode({
              query: [lng, lat],
              limit: 1,
            })
            .send();

          if (response && response.body.features.length) {
            const selectedAddress = response.body.features[0].place_name;
            setAddress(selectedAddress);

            new mapboxgl.Popup()
              .setLngLat([lng, lat])
              .setHTML(`<p>${selectedAddress}</p>`)
              .addTo(initializeMap);
          } else {
            setAddress("Address not found");
          }
        });

        return () => initializeMap.remove();
      },
      () => alert("Unable to retrieve your location")
    );
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await geocoderService
      .forwardGeocode({
        query: searchQuery,
        limit: 1,
      })
      .send();

    if (response && response.body.features.length) {
      const { center, place_name } = response.body.features[0];
      setAddress(place_name);

      // Move the marker and center map to the searched location
      markerRef.current.setLngLat(center);
      map.flyTo({ center, zoom: 14 });

      // Display a popup with the search result address
      new mapboxgl.Popup()
        .setLngLat(center)
        .setHTML(`<p>${place_name}</p>`)
        .addTo(map);
    } else {
      setAddress("Location not found");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a location"
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '8px', marginLeft: '5px' }}>Search</button>
      </form>
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
      <p>Selected Address: {address}</p>
    </div>
  );
};

export default MapComponent;

