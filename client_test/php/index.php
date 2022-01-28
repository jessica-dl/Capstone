<?php 
    //Database class for connect to the database
    include_once 'databaseconnection.php';
    
    //$buildingname = $_GET["buildingname"]
    $i = 0;

    //Connect to database by using PDO
    $database = new Database();
    $db = $database->getConnection();
    if($db['status'] == '0'){
        echo "Connection to database failed: " . $db['message'];
    }else{
        try {
            $conn = $db['connection'];
            //$query = "select name from rooms WHERE name LIKE 'JHE%'";
            //$rooms = $conn->query("select name from rooms WHERE name LIKE 'JHE%'");
            $time = $conn->query("select time from times");
            //$request->execute();
            while($times =$time->fetch(PDO::FETCH_ASSOC)){
                $arrays[$i]=$times;
                $i++;
            }        
            echo json_encode($arrays);    
        }
        catch (Exception $e) {
            die("something went wrong".$e->getMessage());
        }
    }
//get buildingname from title eg: JHE.
//select * from rooms WHERE name LIKE '$buildingname%' to get data that start with JHE output array or json.  

/**one roomname has one full time table(times) -> compare table(times), array(rooms) and table (using) 
-> to get availiable time for each room ????  inner join? **/  

//send json data back to ajax and generate tables


?>
