<?php

  header('Access-Control-Allow-Origin: *');

  //Get operations
  require_once dirname(__FILE__).'\DbOperation.php';

  // Function for controlling if variables are $available
  function isTheseParametersAvailable($params){
		//assuming all parameters are available
		$available = true;
		$missingparams = "";

		foreach($params as $param){
			if(!isset($_POST[$param]) || strlen($_POST[$param])<=0){
				$available = false;
				$missingparams = $missingparams . ", " . $param;
			}
		}

		//if parameters are missing
		if(!$available){
			$response = array();
			$response['error'] = true;
			$response['message'] = 'Parameters ' . substr($missingparams, 1, strlen($missingparams)) . ' missing';

			//displaying error
			echo json_encode($response);

			//stopping further execution
			die();
		}
	}

  //an array to display response
	$response = array();

	//if it is an api call
	//that means a get parameter named api call is set in the URL
	//and with this parameter we are concluding that it is an api call
  if(isset($_GET['apicall'])) {
      //Now switch for every case(database operation) and then call the right operation
      switch ($_GET['apicall']) {
        case 'insertTerm':
          isTheseParametersAvailable(array('term'));
          $db = new DbOperation();
          $result = $db->insertTerm(
            $_POST['term']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Term added to database succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'insertStudent':
          isTheseParametersAvailable(array('studentemail', 'studentname', 'term', 'role', 'studentnumber', 'workhours', 'assistantscore',
                                          'course'));
          $db = new DbOperation();
          $result = $db->insertStudent(
            $_POST['studentemail'],
            $_POST['studentname'],
            $_POST['term'],
            $_POST['role'],
            $_POST['studentnumber'],
            $_POST['workhours'],
            $_POST['assistantscore'],
            $_POST['course'],
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Term added to database succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'insertInstructor':
          isTheseParametersAvailable(array('instructoremail', 'instructorname', 'term'));
          $db = new DbOperation();
          $result = $db->insertInstructor(
            $_POST['instructoremail'],
            $_POST['instructorname'],
            $_POST['term']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Instructor added to database succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'insertCourse':
          isTheseParametersAvailable(array('term', 'starttime',
                                            'endtime', 'course', 'section', 'crncode'));
          $db = new DbOperation();
          $result = $db->insertCourse(
            $_POST['term'],
            $_POST['starttime'],
            $_POST['endtime'],
            $_POST['course'],
            $_POST['section'],
            $_POST['crncode']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Term added to database succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'insertAssistantDeclaration':
          isTheseParametersAvailable(array('crncode', 'term', 'studentemail'));
          $db = new DbOperation();
          $result = $db->insertAssistantDeclaration(
              $_POST['crncode'],
              $_POST['term'],
              $_POST['studentemail']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Term added to database succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'insertAdmin':
          isTheseParametersAvailable(array('adminemail', 'term', 'adminname'));
          $db = new DbOperation();
          $result = $db->insertAdmin(
            $_POST['adminemail'],
            $_POST['term'],
            $_POST['adminname']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Term added to database succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'instructorAddsCourse':
          isTheseParametersAvailable(array('instructoremail', 'crncode'));
          $db = new DbOperation();
          $result = $db->instructorAddsCourse(
            $_POST['instructoremail'],
            $_POST['crncode']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Instructors addition recorded succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'instructorAddsStudent':
          isTheseParametersAvailable(array('instructoremail', 'studentemail'));
          $db = new DbOperation();
          $result = $db->instructorAddsStudent(
            $_POST['instructoremail'],
            $_POST['studentemail']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Instructors addition recorded succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'instructorDeclaresAssistant':
          isTheseParametersAvailable(array('instructoremail', 'studentemail'));
          $db = new DbOperation();
          $result = $db->instructorDeclaresAssistant(
            $_POST['instructoremail'],
            $_POST['studentemail']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Instructors assistant declaration recorded succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'studentDeclaresPreference':
          isTheseParametersAvailable(array('studentemail'));
          $db = new DbOperation();
          $result = $db->studentDeclaresPreference(
            $_POST['studentemail']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Students declaration recorded succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'insertStudentPreference':
          isTheseParametersAvailable(array('preferenceid', 'preferencedegree', 'term'));
          $db = new DbOperation();
          $result = $db->insertStudentPreference(
            $_POST['preferenceid'],
            $_POST['preferencedegree'],
            $_POST['term']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Students preference recorded succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'getInstructors':
          $db = new DbOperation();
				  $response['error'] = false; 
				  $response['message'] = 'Request successfully completed';
				  $response['instructors'] = $db->getInstructors();
        break; 
        case 'getCourses':
          $db = new DbOperation();
				  $response['error'] = false; 
				  $response['message'] = 'Request successfully completed';
				  $response['courses'] = $db->getCourses();
        break;
        case 'getAdmins':
          $db = new DbOperation();
				  $response['error'] = false; 
				  $response['message'] = 'Request successfully completed';
				  $response['admins'] = $db->getAdmins();
        break;
        case 'getTerms':
          $db = new DbOperation();
				  $response['error'] = false; 
				  $response['message'] = 'Request successfully completed';
				  $response['terms'] = $db->getTerms();
        break;
        case 'getStudents':
          $db = new DbOperation();
				  $response['error'] = false; 
				  $response['message'] = 'Request successfully completed';
				  $response['students'] = $db->getStudents();
        break;
        case 'getPreferences':
          $db = new DbOperation();
          $response['error'] = false; 
				  $response['message'] = 'Request successfully completed';
				  $response['preferences'] = $db->getPreferences(); 
        break;
        case 'getCoursesOfInstructor':
          if(isset($_GET['instructoremail']))
          {
            $db = new DbOperation();
            $response['error'] = false;
            $response['message'] = 'Request succesfully completed';
            $response['courses'] = $db->getCoursesOfInstructor($_GET['instructoremail']);
          }
        break;
        case 'getStudentsOfInstructor':
          if(isset($_GET['instructoremail']))
          {
            $db = new DbOperation();
            $response['error'] = false;
            $response['message'] = 'Request succesfully completed';
            $response['students'] = $db->getStudentsOfInstructor($_GET['instructoremail']);
          }
        break;
        case 'getPreferenceIdOfStudent':
          if(isset($_GET['studentemail']))
          {
            $db = new DbOperation();
            $response['error'] = false;
            $response['message'] = 'Request succesfully completed';
            $response['preferenceid'] = $db->getPreferenceIdOfStudent($_GET['studentemail']);
          }
        break;
        case 'getAssistantsOfInstructor':
          if(isset($_GET['instructoremail']))
          {
            $db = new DbOperation();
            $response['error'] = false;
            $response['message'] = 'Request succesfully completed';
            $response['assistants'] = $db->getAssistantsOfInstructor($_GET['instructoremail']);
          }
        break;
        case 'checkAccountType':
          if(isset($_GET['email']))
          {
            $db = new DbOperation();
            $response['error'] = false;
            $response['message'] = 'Request succesfully completed';
            $response['accounttype'] = $db->checkAccountType($_GET['email']);
          }
        break;
        case 'editStudent':
          isTheseParametersAvailable(array('studentemail', 'studentname', 'term', 'role', 'studentnumber', 'workhours', 'assistantscore'));
          $db = new DbOperation();
          $result = $db->editStudent(
            $_POST['studentemail'],
            $_POST['studentname'],
            $_POST['term'],
            $_POST['role'],
            $_POST['studentnumber'],
            $_POST['workhours'],
            $_POST['assistantscore'],
          );

          if($result)
          {
            $response['error'] = false;
            $response['message'] = "Student updated successfully.";
          }
          else
          {
            $response['error'] = true;
            $response['message'] = "An error occured during update process.";
          }
        break;
        case 'deleteStudent':
          if(isset($_GET['studentemail']))
          {
            $db = new DbOperation();
            if($db->deleteStudent($_GET['studentemail']))
            {
              $response['error'] = false;
              $response['message'] = 'Student deleted successfully.';
            } 
            else
            {
              $response['error'] = true;
              $response['message'] = 'Some error occured during delete procedure.';
            } 
          }
          else
          {
            $response['error'] = true; 
					  $response['message'] = 'Nothing to delete, provide an id please';
          }
        break;
      }
  }

  echo json_encode($response)
?>
