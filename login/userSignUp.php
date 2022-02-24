<?php
include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($_POST['arguments'][0] != null) {
    $vals = json_decode($_POST['arguments'][0]);
    $email = $vals['email'];
    $password = $vals['password'];
    $insert_vals = "'" . $email . "','" . $password . "'";
    $stmt = "INSERT INTO `users` (`email`, `password`) VALUES (" . $insert_vals .")";
}

if ($db['status'] == '0') {
    die("Connection failed: " .$db['message']);
} else {

    if ($conn->connect_error) {
        $response_status = '2';
        $response_code = 400;
        $response_data = $conn->connect_error;
    }

    if ($conn->query($stmt)) {
        $response_status = '1';
        $response_code = 200;
        $response_data = "Success";
    }
    else {
        $response_status = '2';
        $response_code = 400;
        $response_data = "Failed to execute";
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