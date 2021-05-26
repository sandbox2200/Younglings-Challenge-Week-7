let userData = {};

let map;
let locationRadius;

let loginLat = -33.95731388064655;
let loginLon = 18.403097568540552;
let userLocation;
let userDistance = 0;
let allowAccess = true;

updateForm = (name, data) => {
    userData[name] = data;
}
// let loginLon = position.coords.longitude;

haversine_distance = (user) => {
    let km = 6371.0710; // Radius of the Earth in miles
    let areaLat = loginLat * (Math.PI / 180); // Convert degrees to radians
    let userLocationLat = user.coords.latitude * (Math.PI / 180); // Convert degrees to radians
    let radianDiffLat = userLocationLat - areaLat; // Radian difference (latitudes)
    let radianradianDiffLon = (user.coords.longitude - loginLon) * (Math.PI / 180); // Radian difference (longitudes)

    let distanceKm = 2 * km * Math.asin(Math.sqrt(Math.sin(radianDiffLat / 2) * Math.sin(radianDiffLat / 2) + Math.cos(areaLat) * Math.cos(userLocationLat) * Math.sin(radianradianDiffLon / 2) * Math.sin(radianradianDiffLon / 2)));
    
    console.log(distanceKm)
    return distanceKm
};

getLocation = () => {
    alert("Email: admin@gmail.com\nPassword: admiin123");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
           
            // Returns the users latitiude and longitude in decimal degrees.
            let userLat = position.coords.latitude;
            let userLon = position.coords.longitude;

            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: userLat, lng: userLon },
                zoom: 15,
                mapTypeId: "terrain"
            });

            /* 
                This adds a blue circle around the area where the user has to be in order to 
                login. StrokeColor determines the color of the square, map determines the way
                the map is presented and the zoom distance and radius determines the size of 
                the circle.
            */ 
            new google.maps.Circle(
                {
                    strokeColor: "rgb(3, 42, 168)",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "rgb(11, 241, 222)",
                    fillOpacity: 0.1,
                    map: map,
                    center: { lat: loginLat, lng: loginLon },
                    radius: 5000.0
                }
            );

            // This adds a green circle around the users location
            new google.maps.Circle(
                {
                    strokeColor: "rgb(57, 189, 5)",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "rgb(57, 189, 5)",
                    fillOpacity: 0.1,
                    map: map,
                    center: { lat: userLat, lng: userLon },
                    radius: 100.0
                }
            );

            // new google.maps.Polyline({
            //     path: flightPlanCoordinates,
            //     geodesic: true,
            //     strokeColor: "#FF0000",
            //     strokeOpacity: 1.0,
            //     map: map,
            //     strokeWeight: 2,
            // });
            // [{lat: userLat, lng: userLon}, {lat: loginLat, lng: loginLon}].setMap(map);
            
            userDistance = haversine_distance(position);
        });
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

login = () => {
    if (userDistance < 5.0) {
        /* 
            If the distance is less than 5km, email is 'admin@gmail', and password is admin123
            then the user will succesfully login.
        */
        allowAccess = true;
        if (userData["email"] == "admin@gmail.com" && userData["password"] == "admin123") {
            alert("You've successfully logged in.");
        }
    }
    else {
        allowAccess = false;
        alert("You cannot login, you are not in the required area.");
    }
};


// sendToDb = () => {
//     // POST request with body equal on data in JSON format
//     fetch('https://portfolio-api-2200.herokuapp.com/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.parse(userData),
//     })
//         .then((response) => response.json())
//         .then((messages) => { console.log("messages"); })

//         // If error occurs then it'll be recorded
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }