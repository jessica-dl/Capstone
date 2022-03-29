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
            data = JSON.parse(result);
            data = JSON.parse(data["response_data"]);
            console.log(data);
            createTable(data);  
        }
    })
}

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
    return date.getFullYear() + "-" + nowMonth + "-" + strDate;
}


function getTimes(data) {
    curr_date = new Date();
    
    var booked = []; 
    for (var i = 0; i < data.length; i++) {  
        row = JSON.parse(data[i]);
        time = new Date(row["times"].replace(' ', 'T'));
        booked.push(time);
    } 

    var available = [];
    for (var i = 0; i <= 7; i++) {
        curr_time = new Date(curr_date.getFullYear(), curr_date.getMonth(), curr_date.getDate() + i);
        curr_time.setTime(curr_time.getTime() + (30*60*1000));
        curr_time.setTime(curr_time.getTime() + (7*60*60*1000));

        for (var j = 0; j < 12; j++) {
            curr_time.setTime(curr_time.getTime() + (60*60*1000));
            if (!booked.includes(curr_time)) {
                available.push(curr_time);
            }
        }
    }
    console.log(available);
    return available;
}

function createTable(data) {   
    var timetable = "<table class='table'>";  
    timetable = timetable  
            + "<thead> <tr>"  
            + "<th scope='col'style='text-align:center;'>Times</th>" 
            + "<th scope='col'style='text-align:center;'>Book</th>"    
            + "</tr> </thead>"; 
            
    timetable = timetable + "<tr>"  
        + "<td> Thursday March 31 8:30 </td>" 
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>"  
        + "<td> Thursday March 31 10:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Thursday March 31 16:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Thursday March 31 17:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Thursday March 31 18:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 1 10:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 1 11:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 1 14:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 1 17:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 1 18:30 </td>" 
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Monday April 4 8:30 </td>" 
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 4 10:30 </td>" 
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 4 11:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>" 
        + "<td> Friday April 4 12:30 </td>"  
        + "<td><input onclick='book()' type='button' value='Book Room'></td></tr>";
     
    timetable = timetable + "</table>";  
    $("#roomtable").html(timetable);
}

function book() {
    alert('Success! A confirmation email will be sent to you.');
    window.location = '../../index.php';
}

window.onload=function() {
    showresult();
}

function redir() {
    window.location = "../../index.php";
}