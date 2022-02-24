<?php 
    // Database class for connect to the database
    include_once '../database.php';
    
    $building = $_GET["building"];
    $i = 0;
    // Connect to database by using PDO
    $database = new Database();
    $db = $database->getConnection();
    if ($db['status'] == '0') {
        echo "Connection to database failed: " . $db['message'];
    } else {
        try {
            $conn = $db['connection'];
            $query = "select * from buildings where name ='$building' ";
            $request = $conn->prepare($query);
            $request->execute();
            while($row =$request->fetch(PDO::FETCH_ASSOC)){
                $arrays[$i]=$row;
                $i++;
            }        
            echo json_encode($arrays);    
        }
        catch (Exception $e) {
            die("something went wrong".$e->getMessage());
        }
    }
?>