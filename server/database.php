<?php

class Database {
    private $host = "localhost";
    private $db_name = "capstone";
    private $username = "root";
    private $password = "password";
    public $conn;


    public function getConnection() {
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            //status = '1' for connect to the database properly status = '0' for connect to the databse failed
            $response['status'] = '1';
            $response['connection'] = $this->conn;
            return $response;
         } catch (PDOException $e) {
            $response['status'] = '0';
            $response['message'] = $e->getMessage();
            return $response;
        }
    }
}

?>