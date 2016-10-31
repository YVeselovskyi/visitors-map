'use strict';
const socket = io();
let map;
let userLattitude;
let userLongitude;

socket.on('all visitors', function (data) {
    let allVisitors = data.visitors;

    allVisitors.forEach( function (i) {
        createMarker(i.coordinates.lat, i.coordinates.lng);
    })
});

const options = {
    enableHighAccuracy: true
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49, lng: 28},
        zoom: 4
    });
}

function createMarker(lattitude, longitude) {
    var marker = new google.maps.Marker({
        position: {lat: lattitude, lng: longitude},
        map: map,
        title: 'Hello World!'
    });
}

function success(pos) {
    let crd = pos.coords;

    userLattitude = crd.latitude;
    userLongitude = crd.longitude;

    saveUserOnMap();
}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function saveUserOnMap() {
    socket.emit('new visitor', { lat: userLattitude , lng: userLongitude });
}

socket.on('show new visitor', function (data) {
    createMarker(data.user.coordinates.lat, data.user.coordinates.lng );
});

socket.emit('new-user-connected');








