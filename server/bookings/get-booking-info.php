<?php

include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($_POST['arguments'][0] != "") {
    $building = $_POST['arguments'][0];
    $room_stmt = "SELECT `id`, `name` FROM " . $building; 
}

if ($db['status'] == '0') {
    die("Connection failed:" . $db['message']);
} else {
    $conn = $db['connection'];
    $result = $conn->query($stmt);

    if ($result) {
        $num = $result->num_rows;
        $i = 0;

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $jsonRow["id"] = $row["id"];
            $jsonRow["name"] = $row["name"];
            $data[strval($i)] = json_encode($jsonRow);
            $i++;
        } 

        $response_status = '1';
        $response_code = 200;
        $response_desc = "Query made successfully";
        $response_metadata = json_encode($metadata);
        $response_data = json_encode($data);
    } else {
        $response_status = '2';
        $response_code = 400;
        $response_desc = "Error: " . $stmt . " " . $conn->error;
        $response_data = "";
    }
    
    $conn->close(); // Close the connection
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;
    $response['response_metadata'] = $response_metadata;
    $response['response_data'] = $response_data;

    echo json_encode($response);
}

exit();

?>