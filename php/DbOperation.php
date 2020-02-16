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

    function insertStudent($studentemail, $studentname, $term, $role, $studentnumber, $workhours, $assistantscore) {
      $stmt = $this->con->prepare("INSERT INTO students (studentemail, studentname, term, role, studentnumber, workhours, assistantscore)
                                  VALUES (?,?,?,?,?,?,?)");
      $stmt->bind_param("ssssiid", $studentemail, $studentname, $term, $role, $studentnumber, $workhours, $assistantscore);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertInstructor($instructoremail, $instructorname, $term) {
      $stmt = $this->con->prepare("INSERT INTO instructors (instructoremail, instructorname, term) VALUES (?,?,?)");
      $stmt->bind_param("sss", $instructoremail, $instructorname, $term);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertCourse($term, $starttime, $endtime, $course, $section, $crncode) {
      $stmt = $this->con->prepare("INSERT INTO courses
                                (term, starttime, endtime, course, section, crncode)
                                VALUES (?,?,?,?,?,?)");
      $stmt->bind_param("sssssi", $term, $starttime, $endtime, $course, $section, $crncode);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertAssistantDeclaration($crncode, $term, $studentemail) {
      $stmt = $this->con->prepare("INSERT INTO assistantdeclarations
                                (crncode, term, studentemail)
                                 VALUES (?,?,?)");
      $stmt->bind_param("iss", $crncode, $term, $studentemail);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertAdmin($adminemail, $term, $adminname) {
      $stmt = $this->con->prepare("INSERT INTO admins (adminemail, term, adminname) VALUES (?,?,?)");
      $stmt->bind_param("sss", $adminemail, $term, $adminname);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function instructorAddsCourse($instructoremail, $crncode)
    {
      $stmt = $this->con->prepare("INSERT INTO instructoraddedcourse (instructoremail, crncode) VALUES (?,?)");
      $stmt->bind_param("si", $instructoremail, $crncode);
      if($stmt->execute()) {
          return true;
      }
      return false;
    }

    function instructorAddsStudent($instructoremail, $studentemail)
    {
      $stmt = $this->con->prepare("INSERT INTO instructoraddedstudent (instructoremail, studentemail) VALUES (?,?)");
      $stmt->bind_param("ss", $instructoremail, $studentemail);
      if($stmt->execute()) {
          return true;
      }
      return false;
    }

    function instructorDeclaresAssistant($instructoremail, $studentemail)
    {
      $stmt = $this->con->prepare("INSERT INTO instructordeclaredassistant (instructoremail, studentemail) VALUES (?,?)");
      $stmt->bind_param("ss", $instructoremail, $studentemail);
      if($stmt->execute()) {
          return true;
      }
      return false;
    }

    function studentDeclaresPreference($studentemail, $preferenceid)
    {
      $stmt = $this->con->prepare("INSERT INTO studentdeclaredpreference (studentemail, preferenceid) VALUES (?,?)");
      $stmt->bind_param("si", $studentemail, $preferenceid);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertStudentPreference($preferenceid, $preferencedegree, $preferencestarttime, $preferenceendtime, $term, $course)
    {
      $stmt = $this->con->prepare("INSERT INTO studentpreference (preferenceid, preferencedegree, preferencestarttime, 
                                  preferenceendtime, term, course) 
              VALUES (?,?,?,?,?,?)");
      $stmt->bind_param("iissss", $preferenceid, $preferencedegree, $preferencestarttime, $preferenceendtime, $term, $course);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function getInstructors()
    {
      $stmt = $this->con->prepare("SELECT instructoremail, instructorname, term FROM instructors");
      $stmt->execute();
      $stmt->bind_result($instructoremail, $instructorname, $term);
		
      $instructors = array(); 
      
      while($stmt->fetch()){
        $instructor  = array();
        $instructor['instructoremail'] = $instructoremail; 
        $instructor['instructorname'] = $instructorname; 
        $instructor['term'] = $term; 
        
        array_push($instructors, $instructor); 
      }
      
      return $instructors; 
    }
  }
?>
