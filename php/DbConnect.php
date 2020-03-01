<?php
  header('Access-Control-Allow-Origin: *');
class DbConnect{
  private $con;

  function __construct() {}

  function connect() {
    include_once dirname(__FILE__).'\Constants.php';
    $this->con = new mysqli($DB_SERVER, $DB_USER, $DB_PASS, $DB_NAME);

    if(mysqli_connect_errno()) {
      echo "Failed to connect to the database.".mysqli_connect_error();
    }

    return $this->con;
  }
}
?>
