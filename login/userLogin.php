<?php
include_once '../database.php';

if ($_POST['arguments'] != null) {
    $vals = json_decode($_POST['arguments'], true);
    $email = $vals['email'];
    $password = $vals['password'];
}
else {
    exit();
}

$database = new Database();
$db = $database->getConnection();
$get_user = "SELECT `userID`, `email`, `password` FROM capstone.users WHERE `email` <=> '$email' AND `password` <=> '$password'";

if ($db['status'] == '0') {
    die("Connection failed:" . $db['message']);
} else {
    try {
        $conn = $db['connection'];
        $request = $conn->prepare($get_user);
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