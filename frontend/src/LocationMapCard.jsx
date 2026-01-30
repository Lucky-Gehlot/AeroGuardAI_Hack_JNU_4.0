// //because i link leaflet so now it will basically work by using L object

// //I need to feed user location to show map of that location that's why I will use OpenStreetMap API

// //initialize map 

// function LocationMapCard() {


//     return ( <div id="map">

//         </div> );
// }


// const map = L.map('map').setView([51.505, -0.09], 13); //default location

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution:'© OpenStreetMap'
// }).addTo(map); //set map data source and associate it with map object

// navigator.geolocation.watchPosition(success,error); //watch user location

// function success(pos){

//     const lat=pos.coords.latitude;
//     const lon=pos.coords.longitude;
//     const accuracy=pos.coords.accuracy;

//     //Add marker and circle to map
//     const marker = L.marker([lat,lon]).addTo(map); //add marker to user location
//     const circle = L.circle([lat,lon],{radius:accuracy}).addTo(map); //add accuracy circle

//     //set zoom to user location
//     const zoomed = map.fitBounds(circle.getBounds());

//     map.setView([lat,lon]); //set map focus to user location
// }

// function error(err){
//     if(err.code==1){
//         alert("Please allow geolocation access");
//     }else{
//         alert("Error getting location: "+err.message);
//     }
// }

// export default LocationMapCard;


import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css'; // Don't forget to import the CSS!

function LocationMapCard() {
    //store the map and other refs so that every time component re-renders it doesn't reinitialize everything
    const mapRef = useRef(null); // Stores the Leaflet map object
    const mapContainerRef = useRef(null); // Stores the div reference, iy will leaflet exactly where to draw the map 
    const watchIdRef = useRef(null); // Stores the watchPosition ID for cleanup
    // Add a ref to store the marker
    const markerRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        // 1. Initialize map only once
        if (!mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

            //download the actual map images from openstreet map 
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);
        }

        // 2. Success callback for location
        const success = (pos) => {
            const { latitude: lat, longitude: lon, accuracy } = pos.coords;

            // Clear existing markers if needed, or update them
            if (markerRef.current) {
                // If marker exists, just move it
                markerRef.current.setLatLng([lat, lon]);
            } else {
                // If it's the first time, create it
                markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
            }
            mapRef.current.panTo([lat, lon]);

            if (circleRef.current) {
                //if circle exists, update it
                circleRef.current.setLatLng([lat, lon]);
                circleRef.current.setRadius(accuracy);
            } else {
                //if first time, create it
                circleRef.current = L.circle([lat, lon], { radius: accuracy }).addTo(mapRef.current);
            }
            mapRef.current.fitBounds(circleRef.current.getBounds());

            mapRef.current.setView([lat, lon], 15);
        };

        const error = (err) => {
            console.error("Error getting location: ", err.message);
        };

        // 3. Start watching position
        const options = {
            enableHighAccuracy: true, // Forces the device to use GPS if available
            timeout: 10000,           // Wait up to 10 seconds for a better fix
            maximumAge: 0             // Don't use a old, cached location
        };
        watchIdRef.current = navigator.geolocation.watchPosition(success, error, options);


        // 4. Cleanup: Runs when component unmounts
        return () => {
            if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
            if (mapRef.current) {
                mapRef.current.remove(); // Removes map instance from memory
                mapRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
            <div className='p-2 pb-6 flex flex-row items-center justify-center gap-2 text-amber-300 text-2xl font-bold'>
                <MapPin className="text-red-600" size={32} />
                <span>Your live location</span>
            </div>
            <div ref={mapContainerRef}
            //leaflet map will have by default 0px height that's why we need to define the height manually
            className="w-full h-96" // Must have a height!
        />
        </div>
    );
}

export default LocationMapCard;