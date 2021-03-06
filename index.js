"use strict";

let oMap;
let oService;
let oCoordinates = {
      lat: 10.3157,
      lng: 123.8854
    };
let aTypes = [ 'restaurant' ]

async function initializeMap () {
  oMap = new google.maps.Map(document.getElementById("map"), {
    center: oCoordinates,
    zoom: 14
  });
  await this.markPlaces();
  this.createCircle();
}

async function markPlaces () {
  oService = new google.maps.places.PlacesService(oMap);
  await oService.nearbySearch({
  	location : oCoordinates,
    radius : 5500,
    type : aTypes
  }, processPlaceResults);
}

function createCircle () {
  const iRadius = Math.sqrt(500) * 100;
  new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: oMap,
    center: oCoordinates,
    radius: iRadius
  });
}

async function processPlaceResults (oResults, oStatus) {
  if (oStatus == google.maps.places.PlacesServiceStatus.OK) {
    for await (let oValue of oResults) {
      createMarker(oValue.geometry.location);
    }
  }
}

function createMarker (aPosition) {
  new google.maps.Marker({
      position: aPosition,
      map: oMap
  });
}
