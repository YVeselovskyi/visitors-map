'use strict';
const socket = io();

socket.on('all visitors', function (data) {
    let allVisitors = data.visitors;

    allVisitors.forEach( function (i) {
        createMarker(i.coordinates.lat, i.coordinates.lng);
    })
});

const options = {
    enableHighAccuracy: true
};

let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
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

    socket.emit('new visitor', { lat: crd.latitude , lng: crd.longitude });

    createMarker(crd.latitude, crd.longitude );

}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);







