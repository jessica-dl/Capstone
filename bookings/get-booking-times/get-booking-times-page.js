var building = sessionStorage.getItem("building");
var room = sessionStorage.getItem("room");

var showresult = function() {
    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    $.ajax({
        type: "GET",
        url: "get-booking-times.php",
        data: {"arguments": [building, room]},
        async: false,
        success : function(result) {
            console.log(result);
            createTable(JSON.parse(result));  
        }
    })
}

/**
function currentdate() {
    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
         }
    if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
         }
    var nowDate = date.getFullYear() + "-" + nowMonth + "-" + strDate;
}
**/

window.onload=function() {
    showresult();
}

function createTable(data) {   
    data = JSON.parse(data["response_data"]);
    var timetable = "<table class='table'>";  
    timetable = timetable  
            + "<thead> <tr>"  
            + "<th scope='col'style='text-align:center;'>Room</th>" 
            + "<th scope='col'style='text-align:center;'>Times</th>"    
            + "</tr> </thead>";  
    var len = data.length;  
    for (var i = 0; i < len; i++) {  
        row = JSON.parse(data[i]);
        console.log(row);
        timetable = timetable + "<tr>"  
            + "<td>"+ row["name"] + "</td>"  
            + "<td></td>"  
            + "</tr>";  
    }  
    timetable = timetable + "</table>";  
    $("#roomtable").html(timetable);
}