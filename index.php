<!DOCTYPE html>
<html>
  <head>
    <title>Proximity</title>
    <link href="css/main.css"rel="stylesheet"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="main.js"></script>
  </head>
  <body>
    <div id='container'>
      <div class="select">
      <?php
            include_once 'database.php';
            // Connect to database by using PDO
            $database = new Database();
            $db = $database->getConnection();
            if ($db['status'] == '0') {
                echo "Connection to database failed: " . $db['message'];
            } else {
                try {
                    $conn = $db['connection'];
                    $sta = $conn->query("select * from capstone.buildings");     
                }
                catch (Exception $e) {
                    die("something went wrong".$e->getMessage());
                }
            }
          ?>
        <select id="selectbuilding" onchange="showMarker()">
          <option value="">--Building List--</option>
          <?php
            while($row =$sta->fetch(PDO::FETCH_ASSOC)){
              echo "<option value='".$row['buildingID']."'>".$row['fullname']."</option>";
            }   
          ?>
        </select>
      </div>
      <button id="login">Login</button>

      <script type="text/javascript">
          document.getElementById("login").onclick = function () {
              location.href = "./login/userLogin.html";
          };
      </script>
    </div>



    <div id='map-canvas'></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap"></script>
</html>