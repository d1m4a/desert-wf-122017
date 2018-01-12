module.exports = googleMaps => {

GoogleMapsLoader.KEY = "AIzaSyDhQNTgjvezECxXDnOfqiL3S36LVJp01z4";

GoogleMapsLoader.load(function(google) {
    var map = new google.maps.Map(el, {
    zoom: 12,
    center: {lat: 56.026876, lng: 92.865734},
    mapTypeControl: false,
    disableDefaultUI: true,
    mapTypeId: "satellite"
    });
});

};