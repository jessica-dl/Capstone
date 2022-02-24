<?php

include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($db['status'] == '0') {
    die("Connection failed:" . $db['message']);
}

if ($_GET['building'] != null) {
    $building = $_GET['building'][0];
    $stmt = "SELECT * FROM capstone." . $building;     

    try {
        $i = 0;
        $conn = $db['connection'];
        $request = $conn->prepare($stmt);
        $request->execute();

        while ($row = $request->fetch(PDO::FETCH_ASSOC)) {
            $jsonRow["id"] = $row["id"];
            $jsonRow["name"] = $row["name"];
            $data[strval($i)] = json_encode($jsonRow);
            $i++;
        } 
        $response_status = '1';
        $response_code = 200;
        $response_desc = "Query made successfully";
        $response_data = json_encode($data);
    } catch (Exception $e) {
        die("something went wrong".$e->getMessage());
    }
    
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;
    $response['response_data'] = $response_data;

    echo json_encode($response);
} else {
    $response_status = '2';
    $response_code = 400;
    $response_desc = "Input not received";
    $response_data = $_GET['building'];
    
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;
    $response['response_data'] = $response_data;

    echo json_encode($response);
}

exit();

?>