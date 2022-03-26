<?php
include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($_POST['arguments'] != null) {
    $vals = json_decode($_POST['arguments'], true);
    $name = $vals['first_name'];
    $email = $vals['email'];
    $password = $vals['password'];

    $insert_vals = "'" . $name . "','" . $email . "','" . $password . "'";
    $stmt = "INSERT INTO capstone.users (`name`, `email`, `password`) VALUES (" . $insert_vals .")";
}

if ($db['status'] == '0') {
    die("Connection failed: " .$db['message']);
} else {
    try {
        $conn = $db['connection'];
        $request = $conn->prepare($stmt);
        $request->execute();

        $response_status = '1';
        $response_code = 200;
        $response_desc = "Query made successfully";
    } catch (Exception $e) {
        die("Something went wrong".$e->getMessage());
    }
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    echo json_encode($response);
}

exit();

?>