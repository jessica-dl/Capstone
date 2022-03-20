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

function redir() {
  window.location="../../index.php";
}

function createTable(data) {   
    data = JSON.parse(data["response_data"]);
    var timetable = "<table class='table'>";  
    timetable = timetable  
            + "<thead> <tr>"  
            + "<th scope='col' style='text-align:center;'>Room</th>" 
            + "<th scope='col' style='text-align:center;'>Book</th>"    
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

function getCookie(username) {
    let name = username + "=";
    let spli = document.cookie.split(';');
    for(var j = 0; j < spli.length; j++) {
      let char = spli[j];
      while (char.charAt(0) == ' ') {
        char = char.substring(1);
      }
      if (char.indexOf(name) == 0) {
        return char.substring(name.length, char.length);
      }
    }
    return "";
  }


function checkCookie() {
    var user = getCookie("user");
    // if user is null reroute to sign in page
    if (user == "" || user == null) {
      window.location = "../login/userLogin.html#signin";
    }
  }


function roomAvailability(roomId) {
    checkCookie();
    sessionStorage.setItem("building", getBuilding());
    sessionStorage.setItem("room", roomId);
    window.location = "../get-booking-times/get-booking-times-page.html";
}