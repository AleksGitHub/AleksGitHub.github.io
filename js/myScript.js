/**
 * Created by Admon on 15.03.2016.
 */
/***<google_map>***/

function initialize() {
    var myLatlng = new google.maps.LatLng(36.11573,-115.17055);
    var myOptions = {
        zoom: 19,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Go Sexy"
    });
}

initialize();

/***</google_map>***/