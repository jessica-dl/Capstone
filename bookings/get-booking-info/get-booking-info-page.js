function getBuilding() {
    let params = new URLSearchParams(window.location.search);
    return params.get('name');
  }

var showresult =  function() {
    let building = getBuilding();

    $.ajax({
        type: "GET",
        url: "get-booking-info.php",
        data: {"building": building},
        async: false,
        success : function(result) {
            createTable(JSON.parse(result));  
        }
    })
}

window.onload=function(){
    showresult();
}

function createTable(data) {   
    data = JSON.parse(data["response_data"]);
    var timetable = "<table class='table'>";  
    timetable = timetable  
            + "<thead> <tr>"  
            + "<th scope='col'>Room</th>" 
            + "<th scope='col'></th>"    
            + "</tr> </thead>";  
    var len = data.length;  
    for (var i = 0; i < len; i++) {  
        row = JSON.parse(data[i]);
        console.log(row);
        timetable = timetable + "<tr>"  
            + "<td>"+ row["name"] + "</td>"  
            + "<td><input onclick='roomAvailability(" + row["id"] + ")' type='button' value='Book Room'></td>"  
            + "</tr>";  
    }  
    timetable = timetable + "</table>";  
    $("#roomtable").html(timetable);
}

function roomAvailability(roomId) {
    sessionStorage.setItem("building", getBuilding());
    sessionStorage.setItem("room", roomId);
    window.location = "../get-booking-times/get-booking-times-page.html";
}