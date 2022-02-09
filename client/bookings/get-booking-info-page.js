var showresult =  function(){
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
    
    //after calender is availiable, need to get the date data otherwise use current date to use in database.

    let building = $('#building').val();

    $.ajax({
            type:"GET",
            url:"././server/bookings/get-booking-info.php",
            data: {"buildingname": building},
            dataType: "html",
            async : false,
            success:function(result){
                    createTable(result);  
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

function createTable(result) {  
    var data = JSON.parse(result);
    var timetable = "<table class='timetable'>";  
    timetable = timetable  
            + "<tr>"  
            +"<th>Time</th>" 
            +"<th>Check</th>"    
            +"</tr>";  
    var len = data.length;  
    for ( var i = 0; i < len; i++) {  
            timetable = timetable + "<tr>"  
                +"<td>"+ data[i].time + "</td>"  
                +"<td><input type='checkbox' value=''></td>"  
                +"</tr>";  
    }  
    timetable = timetable + "</table>";  
    $("#roomtable").html(timetable);
}
