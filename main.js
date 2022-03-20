var markers = [];

function initMap() {
    // set up map object by initializing the zoom index and the position: lat, lag
        map = new google.maps.Map(document.getElementById("map-canvas"),
            {
            zoom: 17, 
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.LEFT_BOTTOM,
            },
        fullscreenControl: false, 
        center: {lat:43.26264877904412, lng: -79.91941510031896}});
}

function showMarker() {
    clearmarker();
    let building = $('#selectbuilding').val();
    var la, lo;
    var data = '';

    $.ajax({
        type: "GET",
        url: "map/addmarker.php",
        data: {"building": building},
        dataType: "html",
        async: false,
        success : function(result) {
            console.log(result);
            data = eval("(" + result + ")");
            $.each(data, 
                function (i, item) {
                    la = item.latitude;
                    lo = item.longitude;
                }
            )
        }
    })

    for (var i = 0; i < data.length; i++) {
        var buildingname = data[i].shortname;
        markers [i] = new google.maps.Marker({
            map: map,
            url: "./bookings/get-booking-info/get-booking-info-page.html?name=" + buildingname
        });
        var la = data[i].latitude;
        var lo = data[i].longitude;
        position = new google.maps.LatLng(la,lo);
        markers[i].setPosition(position);
        map.setCenter(position);
        map.setZoom(17);
        google.maps.event.addListener(markers[i], 'click', function() {
            window.location.href = this.url;
        });
    }
}

function clearmarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }

function showBuilding() {
    alert("click");
}