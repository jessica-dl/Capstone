var showresult =  function() {
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
    
    // after calender is available, need to get the date data otherwise use current date to use in database.

    // let building = $('#building').val();
    let building = 'JHE';

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

window.onload=function(){
    showresult();
}

function createTable(data) {   
    data = JSON.parse(data["response_data"]);
    var timetable = "<table class='timetable'>";  
    timetable = timetable  
            + "<tr>"  
            +"<th>Room</th>" 
            +"<th></th>"    
            +"</tr>";  
    var len = data.length;  
    for (var i = 0; i < len; i++) {  
        row = JSON.parse(data[i]);
        console.log(row);
        timetable = timetable + "<tr>"  
            +"<td>"+ row["name"] + "</td>"  
            +"<td><input type='button' value='Book Room'></td>"  
            +"</tr>";  
    }  
    timetable = timetable + "</table>";  
    $("#roomtable").html(timetable);
}
