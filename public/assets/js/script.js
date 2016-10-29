'use strict';
const socket = io();

const options = {
    enableHighAccuracy: true
};

function success(pos) {
    let crd = pos.coords;

    socket.emit('my other event', { lat: crd.latitude , lon: crd.longitude });
}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

