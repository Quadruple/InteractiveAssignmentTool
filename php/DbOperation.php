<?php
  header('Access-Control-Allow-Origin: *');
  
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

    function insertStudent($studentemail, $studentname, $term, $role, $studentnumber, $workhours, $assistantscore, $course) {
      $stmt = $this->con->prepare("INSERT INTO students (studentemail, studentname, term, role, studentnumber, workhours, 
                                  assistantscore, course)
                                  VALUES (?,?,?,?,?,?,?,?)");
      $stmt->bind_param("ssssiids", $studentemail, $studentname, $term, $role, $studentnumber, $workhours, $assistantscore, $course);
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

    function studentDeclaresPreference($studentemail)
    {
      $stmt = $this->con->prepare("INSERT INTO studentdeclaredpreference (studentemail) VALUES (?)");
      $stmt->bind_param("s", $studentemail);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function insertStudentPreference($preferenceid, $preferencedegree, $term)
    {
      $stmt = $this->con->prepare("INSERT INTO studentpreference (preferenceid, preferencedegree, term) 
              VALUES (?,?,?)");
      $stmt->bind_param("iis", $preferenceid, $preferencedegree, $term);
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

    function getStudents()
    {
      $stmt = $this->con->prepare("SELECT studentemail, studentname, term, role, studentnumber, workhours, assistantscore 
                                  FROM students");
      $stmt->execute();
      $stmt->bind_result($studentemail, $studentname, $term, $role, $studentnumber, $workhours, $assistantscore);

      $students = array();

      while($stmt->fetch())
      {
        $studentArray = array();
        $studentArray['studentemail'] = $studentemail;
        $studentArray['studentname'] = $studentname;
        $studentArray['term'] = $term;
        $studentArray['role'] = $role;
        $studentArray['studentnumber'] = $studentnumber;
        $studentArray['workhours'] = $workhours;
        $studentArray['assistantscore'] = $assistantscore;

        array_push($students, $studentArray);
      }

      return $students;
    }

    function getPreferences()
    {
      $stmt = $this->con->prepare("SELECT preferenceid, preferencedegree, term
                                  FROM studentpreference");
      $stmt->execute();
      $stmt->bind_result($preferenceid, $preferencedegree, $term);

      $preferences = array();

      while($stmt->fetch())
      {
        $preferenceArray = array();
        $preferenceArray['preferenceid'] = $preferenceid;
        $preferenceArray['preferencedegree'] = $preferencedegree;
        $preferenceArray['term'] = $term;

        array_push($preferences, $preferenceArray);
      }

      return $preferences;
    }

    function getCoursesOfInstructor($instructoremail)
    {
      $stmt = $this->con->prepare("SELECT crncode FROM instructoraddedcourse WHERE instructoremail = ?");

      $stmt->bind_param("s", $instructoremail);
      $stmt->execute();
      $stmt->bind_result($crncode);

      $courses = array();

      while($stmt->fetch())
      {
        $course = array();
        $course['crncode'] = $crncode;

        array_push($courses, $course);
      }

      return $courses;
    }

    function getStudentsOfInstructor($instructoremail)
    {
      $stmt = $this->con->prepare("SELECT studentemail FROM instructoraddedstudent WHERE instructoremail = ?");

      $stmt->bind_param("s", $instructoremail);
      $stmt->execute();
      $stmt->bind_result($studentemail);

      $students = array();

      while($stmt->fetch())
      {
        $student = array();
        $student['studentemail'] = $studentemail;

        array_push($students, $student);
      }

      return $students;
    }

    function getPreferenceIdOfStudent($studentemail)
    {
      $stmt = $this->con->prepare("SELECT preferenceid FROM studentdeclaredpreference WHERE studentemail = ?");

      $stmt->bind_param("s", $studentemail);
      $stmt->execute();
      $stmt->bind_result($preferenceid);

      $preferences = array();

      while($stmt->fetch())
      {
        $preference = array();
        $preference['preferenceid'] = $preferenceid;

        array_push($preferences, $preference);
      }

      return $preferences;
    }

    function getAssistantsOfInstructor($instructoremail)
    {
      $stmt = $this->con->prepare("SELECT studentemail FROM instructordeclaredassistant WHERE instructoremail = ?");

      $stmt->bind_param("s", $instructoremail);
      $stmt->execute();
      $stmt->bind_result($studentemail);

      $assistants = array();

      while($stmt->fetch())
      {
        $assistant = array();
        $assistant['studentemail'] = $studentemail;

        array_push($assistants, $assistant);
      }

      return $assistants;
    }

    function checkAccountType($email)
    {
      $stmt = $this->con->prepare("SELECT adminemail FROM admins WHERE adminemail = ?");

      $stmt->bind_param("s", $email);
      $stmt->execute();
      $row = $stmt->fetch();

      if(! $row)
      {
        $stmt = $this->con->prepare("SELECT instructoremail FROM instructors WHERE instructoremail = ?");

        $stmt->bind_param("s", $email);
        $stmt->execute();
        $row = $stmt->fetch();

        if(! $row)
        { 
          return "Student";
        }

        return "Instructor";
      }

      return "Admin";
    }
  }
?>
