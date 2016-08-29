function initialize() {
    var myLatlng = new google.maps.LatLng(40.7592967,-73.9971685);
    var myOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}
initialize();