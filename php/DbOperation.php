<?php
  class DbOperation {
    private $con;

    function __construct() {
      require_once dirname(__FILE__).'\DbConnect.php';
      $db = new DbConnect();
      $this->con = $db->connect();
    }

    function insertTerm($term) {
      $stmt = $this->con->prepare("INSERT INTO terms (term) VALUES (?)");
      $stmt->bind_param("s", $term);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertStudent($studentemail, $password, $term, $instructoremail, $crncode, $role, $studentnumber, $workhours) {
      $stmt = this->con->prepare("INSERT INTO students (studentemail, password, term, instructoremail, crncode, role, studentnumber, workhours)
                                  VALUES (?,?,?,?,?,?,?,?)");
      $stmt->bind_param("ssssisii", $studentemail, $password, $term, $instructoremail, $crncode, $role, $studentnumber, $workhours);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertInstructor($instructoremail, $password, $term, $course) {
      $stmt = this->con->prepare("INSERT INTO instructors (instructoremail, password, term, course) VALUES (?,?,?,?)");
      $stmt->bind_param("ssss", $instructoremail, $password, $term, $course);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertCourse($term, $instructoremail, $starttime, $endtime, $course, $teachingassistant, $learningassistant, $section, $crncode) {
      $stmt = this->con->prepare("INSERT INTO courses
                                (term, instructoremail, starttime, endtime, course, teachingassistant, learningassistant, section, crncode)
                                VALUES (?,?,?,?,?,?,?,?,?)");
      $stmt->bind_param("ssssssssi", $term, $instructoremail, $starttime, $endtime, $course, $teachingassistant, $learningassistant, $section, $crncode);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertAssistantDeclaration($instructoremail, $crncode, $term, $studentnumber, $role, $workhours, $assistantscore) {
      $stmt = this->con->prepare("INSERT INTO assistantdeclarations
                                (instructoremail, crncode, term, studentnumber, role, workhours, assistantscore)
                                 VALUES (?,?,?,?,?,?,?)");
      $stmt->bind_param("sisisid", $instructoremail, $crncode, $term, $studentnumber, $role, $workhours, $assistantscore);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertAdmin($adminemail, $password, $term) {
      $stmt = this->con->prepare("INSERT INTO admins (adminemail, password, term) VALUES (?,?,?)");
      $stmt->bind_param("sss", $adminemail, $password, $term);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }
  }
?>
