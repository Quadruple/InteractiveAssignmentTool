<?php
  header('Access-Control-Allow-Origin: *');
  
  class DbOperation {
    private $con;

    function __construct() {
      require_once dirname(__FILE__).'\DbConnect.php';
      $db = new DbConnect();
      $this->con = $db->connect();
    }

    //-------------------- ADMIN FUNCTIONS START ----------------------
    function insertTerm($term) {
      $stmt = $this->con->prepare("INSERT INTO terms (term) VALUES (?)");
      $stmt->bind_param("s", $term);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function deleteTerm($term)
    {
      $stmt = $this->con->prepare("DELETE FROM terms WHERE term = ?");
        $stmt->bind_param("s", $term);
        if($stmt->execute())
        {
          return true;
        }
        return false;
    }

    function instructorAddsCourse($instructoremail, $coursename)
    {
      $stmt = $this->con->prepare("INSERT INTO instructoraddedcourse (instructoremail, course) VALUES (?,?)");
      $stmt->bind_param("ss", $instructoremail, $coursename);
      if($stmt->execute()) {
          return true;
      }
      return false;
    }

    function insertInstructor($instructoremail, $instructorname, $term, $coursename) {
      $stmt = $this->con->prepare("INSERT INTO instructors (instructoremail, instructorname, term, coursename) VALUES (?,?,?,?)");
      $stmt->bind_param("ssss", $instructoremail, $instructorname, $term, $coursename);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function deleteInstructor($instructoremail)
    {
      $stmt = $this->con->prepare("DELETE FROM instructors WHERE instructoremail = ?");
        $stmt->bind_param("s", $instructoremail);
        if($stmt->execute())
        {
          return true;
        }
        return false;
    }

    function insertCourse($term, $course) {
      $stmt = $this->con->prepare("INSERT INTO courses
                                (term, course)
                                VALUES (?,?)");
      $stmt->bind_param("ss", $term, $course);
      if($stmt->execute()) {
        return true;
      }
      return false;
    }

    function deleteCourse($course)
    {
      $stmt = $this->con->prepare("DELETE FROM courses WHERE course = ?");
        $stmt->bind_param("s", $course);
        if($stmt->execute())
        {
          return true;
        }
        return false;
    }
    
    // ------------------------- ADMIN FUNCTIONS END ---------------------------


    function insertStudent($studentemail, $studentname, $role, $studentnumber, $workhours, $assistantscore, $course) {
      $stmt = $this->con->prepare("INSERT INTO students (studentemail, studentname, role, studentnumber, workhours, 
                                  assistantscore, course)
                                  VALUES (?,?,?,?,?,?,?)");
      $stmt->bind_param("sssiids", $studentemail, $studentname, $role, $studentnumber, $workhours, $assistantscore, $course);
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

    function insertStudentPreference($studentemail, $preferencedegree, $preferencestring, $coursename)
    {
      $deleteStmt = $this->con->prepare("DELETE FROM studentpreference WHERE studentemail = ?");
      $deleteStmt->bind_param("s", $studentemail);
      if($deleteStmt->execute())
      {

        $stmt = $this->con->prepare("INSERT INTO studentpreference (studentemail, preferencedegree, preferencestring, coursename) 
                VALUES (?,?,?,?)");
        $stmt->bind_param("ssss", $studentemail, $preferencedegree, $preferencestring, $coursename);
        if($stmt->execute()) {
          return true;
        }
        return false;
      }
      return false;
    }

    function getInstructors()
    {
      $stmt = $this->con->prepare("SELECT instructoremail, instructorname, term, coursename FROM instructors");
      $stmt->execute();
      $stmt->bind_result($instructoremail, $instructorname, $term, $coursename);
		
      $instructors = array(); 
      
      while($stmt->fetch()){
        $instructor  = array();
        $instructor['instructoremail'] = $instructoremail; 
        $instructor['instructorname'] = $instructorname; 
        $instructor['term'] = $term; 
        $instructor['coursename'] = $coursename;

        array_push($instructors, $instructor);
      }
      
      return $instructors; 
    }

    function getCourses()
    {
      $stmt = $this->con->prepare("SELECT term, course FROM courses");
      $stmt->execute();
      $stmt->bind_result($term, $coursename);

      $courses = array();

      while($stmt->fetch())
      {
        $course = array();
        $course['term'] = $term;
        $course['course'] = $coursename;

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

    function getStudentInformation($studentemail)
    {
      $stmt = $this->con->prepare("SELECT studentemail, studentname, role, studentnumber, workhours, assistantscore, course 
                                  FROM students WHERE studentemail = ?");
      $stmt->bind_param("s", $studentemail);
      $stmt->execute();
      $stmt->bind_result($studentemail, $studentname, $role, $studentnumber, $workhours, $assistantscore, $course);

      $studentArray = array();

      while($stmt->fetch())
      {
        $studentArray['studentemail'] = $studentemail;
        $studentArray['studentname'] = $studentname;
        $studentArray['role'] = $role;
        $studentArray['studentnumber'] = $studentnumber;
        $studentArray['workhours'] = $workhours;
        $studentArray['assistantscore'] = $assistantscore;
        $studentArray['course'] = $course;
      }

      return $studentArray;
    }

    function getStudents($coursename)
    {
      $stmt = $this->con->prepare("SELECT studentemail, studentname, role, studentnumber, workhours, assistantscore
                                  FROM students WHERE course = ?");
      $stmt->bind_param("s", $coursename);
      $stmt->execute();
      $stmt->bind_result($studentemail, $studentname, $role, $studentnumber, $workhours, $assistantscore);

      $students = array();

      while($stmt->fetch())
      {
        $studentArray = array();
        $studentArray['studentemail'] = $studentemail;
        $studentArray['studentname'] = $studentname;
        $studentArray['role'] = $role;
        $studentArray['studentnumber'] = $studentnumber;
        $studentArray['workhours'] = $workhours;
        $studentArray['assistantscore'] = $assistantscore;
        array_push($students, $studentArray);
      }

      return $students;
    }

    function getPreferences($studentemail)
    {
      $stmt = $this->con->prepare("SELECT preferencedegree, preferencestring
                                  FROM studentpreference WHERE studentemail = ?");
      $stmt->bind_param("s", $studentemail);
      $stmt->execute();
      $stmt->bind_result( $preferencedegree, $preferencestring);

      $preferences = array();

      while($stmt->fetch())
      {
        $preferenceArray = array();
        $preferenceArray['preferencedegree'] = $preferencedegree;
        $preferenceArray['preferencestring'] = $preferencestring;

        array_push($preferences, $preferenceArray);
      }

      return $preferences;
    }

    function getCoursesOfInstructor($instructoremail)
    {
      $stmt = $this->con->prepare("SELECT coursename FROM instructors WHERE instructoremail = ?");

      $stmt->bind_param("s", $instructoremail);
      $stmt->execute();
      $stmt->bind_result($coursename);

      $courses = array();

      while($stmt->fetch())
      {
        $course = array();
        $course['coursename'] = $coursename;

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
          $stmt = $this->con->prepare("SELECT studentemail FROM students WHERE studentemail = ?");

          $stmt->bind_param("s", $email);
          $stmt->execute();
          $row = $stmt->fetch();

          if(! $row)
          {
            return "Not-Registered";
          }

          return "Student";
        }

        return "Instructor";
      }

      return "Admin";
    }

    function editStudent($studentemail, $studentname, $role, $studentnumber, $workhours, $assistantscore, $course)
    {
        $stmt = $this->con->prepare("UPDATE students SET studentname = ?, role = ?, studentnumber = ?,
                                    workhours = ?, assistantscore = ?, course = ? WHERE studentemail = ?");

        $stmt->bind_param("ssiidss", $studentname, $role, $studentnumber, $workhours, $assistantscore, $course, $studentemail);
        if($stmt->execute())
        {
          return true;
        }

        return false;
    }

    function deleteStudent($studentemail)
    {
        $stmt = $this->con->prepare("DELETE FROM students WHERE studentemail = ?");
        $stmt->bind_param("s", $studentemail);
        if($stmt->execute())
        {
          return true;
        }
        return false;
    }

    function getStudentsSubmittedPreferences($studentemail)
    {
      $stmt = $this->con->prepare("SELECT preferenceid FROM studentdeclaredpreference WHERE studentemail = ?");
      $stmt->bind_param("s", $studentemail);
      $stmt->execute();
      $stmt->bind_result($preferenceid);

      $preferenceids = array();

      while($stmt->fetch())
      {
        array_push($preferenceids, $preferenceid);
      }

      return $this->getPreferences($preferenceids[0]);
    }

    function saveAssignments($coursename, $sectionname, $sectiontime, $studentemail, $studentname, $totalscore)
    {
      $deleteStmt = $this->con->prepare("DELETE FROM assignments WHERE studentemail = ?");
        $deleteStmt->bind_param("s", $studentemail);
        if($deleteStmt->execute())
        {
          $stmt = $this->con->prepare("INSERT INTO assignments (coursename, sectionname, sectiontime, studentemail, studentname, totalscore) 
                                  VALUES (?,?,?,?,?,?)");
          $stmt->bind_param("sssssi", $coursename, $sectionname, $sectiontime, $studentemail, $studentname, $totalscore);
          if($stmt->execute()) {
            return true;
          }
          return false;  
        }
        return false;
    }

    function getAssignmentsOfCourse($coursename)
    {
      $stmt = $this->con->prepare("SELECT coursename, sectionname, sectiontime, studentemail, studentname, totalscore
                                  FROM assignments WHERE coursename = ?");
      $stmt->bind_param("s", $coursename);
      $stmt->execute();
      $stmt->bind_result($coursename, $sectionname, $sectiontime, $studentemail, $studentname, $totalscore);

      $assignments = array();

      while($stmt->fetch())
      {
        $assignment = new stdClass();
        $assignment->coursename = $coursename;
        $assignment->sectionname = $sectionname;
        $assignment->sectiontime = $sectiontime;
        $assignment->studentemail = $studentemail;
        $assignment->studentname = $studentname;
        $assignment->totalscore = $totalscore;

        array_push($assignments, $assignment);
      }

      return $assignments;
    }

    function getStudentPreferencesOfCourse($coursename)
    {
      $stmt = $this->con->prepare("SELECT studentemail, preferencedegree, preferencestring
                                  FROM studentpreference WHERE coursename = ?");
      $stmt->bind_param("s", $coursename);
      $stmt->execute();
      $stmt->bind_result( $studentemail, $preferencedegree, $preferencestring);

      $preferences = array();

      while($stmt->fetch())
      {
        $preferenceArray = array();
        $preferenceArray['studentemail'] = $studentemail;
        $preferenceArray['preferenceScore'] = $preferencedegree;
        $preferenceArray['preferenceHour'] = $preferencestring;

        array_push($preferences, $preferenceArray);
      }

      return $preferences;
    }

    function getCourseOfStudent($studentemail)
    {
      $stmt = $this->con->prepare("SELECT studentname, role, studentnumber, workhours, assistantscore, course
                                  FROM students WHERE studentemail = ?");
      $stmt->bind_param("s", $studentemail);
      $stmt->execute();
      $stmt->bind_result($studentname, $role, $studentnumber, $workhours, $assistantscore, $course);

      $students = array();

      while($stmt->fetch())
      {
        $student = array();
        $student['studentname'] = $studentname;
        $student['role'] = $role;
        $student['studentnumber'] = $studentnumber;
        $student['workhours'] = $workhours;
        $student['assistantscore'] = $assistantscore;
        $student['course'] = $course;

        array_push($students, $student);
      }

      return $students;
    }
  }
?>
