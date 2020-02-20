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

    function insertStudentPreference($preferencedegree, $preferencestarttime, $preferenceendtime, $term, $course)
    {
      $stmt = $this->con->prepare("INSERT INTO studentpreference (preferencedegree, preferencestarttime, 
                                  preferenceendtime, term, course) 
              VALUES (?,?,?,?,?)");
      $stmt->bind_param("issss", $preferencedegree, $preferencestarttime, $preferenceendtime, $term, $course);
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

    function getCourses()
    {
      $stmt = $this->con->prepare("SELECT term, starttime, endtime, course, section, crncode FROM courses");
      $stmt->execute();
      $stmt->bind_result($term, $starttime, $endtime, $course, $section, $crncode);

      $courses = array();

      while($stmt->fetch())
      {
        $course = array();
        $course['term'] = $term;
        $course['starttime'] = $starttime;
        $course['endtime'] = $endtime;
        $course['course'] = $course;
        $course['section'] = $section;
        $course['crncode'] = $crncode;

        array_push($courses, $course);
      }

      return $courses;
    }

    function getAdmins()
    {
      $stmt = $this->con->prepare("SELECT adminemail, term, adminname FROM admins");
      $stmt->execute();
      $stmt->bind_result($adminemail, $term, $adminname);

      $admins = array();

      while($stmt->fetch())
      {
        $admin = array();
        $admin['adminemail'] = $adminemail;
        $admin['term'] = $term;
        $admin['adminname'] = $adminname;

        array_push($admins, $admin);
      }

      return $admins;
    }

    function getTerms()
    {
      $stmt = $this->con->prepare("SELECT term FROM terms");
      $stmt->execute();
      $stmt->bind_result($term);

      $terms = array();

      while($stmt->fetch())
      {
        $termArray = array();
        $termArray['term'] = $term;

        array_push($terms, $termArray);
      }

      return $terms;
    }
  }
?>
