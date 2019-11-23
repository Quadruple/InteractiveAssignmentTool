<?php
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
          isTheseParametersAvailable(array('studentemail', 'password', 'term', 'instructoremail', 'crncode', 'role', 'studentnumber', 'workhours'));
          $db = new DbOperation();
          $result = $db->insertStudent(
            $_POST['studentemail'],
            $_POST['password'],
            $_POST['term'],
            $_POST['instructoremail'],
            $_POST['crncode'],
            $_POST['role'],
            $_POST['studentnumber'],
            $_POST['workhours']
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
          isTheseParametersAvailable(array('instructoremail', 'password', 'term', 'course'));
          $result = $db->insertInstructor(
            $_POST['instructoremail'],
            $_POST['password'],
            $_POST['term'],
            $_POST['course']
          );
          if($result) {
            $response['error'] = false;
            $response['message'] = "Term added to database succesfully.";
          }else {
            $response['error'] = true;
            $response['message'] = "Some error occured. Please try again.";
          }
        break;
        case 'insertCourse':
        isTheseParametersAvailable(array('term', 'instructoremail', 'starttime',
                                          'endtime', 'course', 'teachingassistant', 'learningassistant', 'section', 'crncode'));
        $result = $db->insertCourse(
          $_POST['term'],
          $_POST['instructoremail'],
          $_POST['starttime'],
          $_POST['endtime'],
          $_POST['course'],
          $_POST['teachingassistant'],
          $_POST['learningassistant'],
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
        isTheseParametersAvailable(array('instructoremail', 'crncode', 'term', 'studentnumber', 'role', 'workhours', 'assistantscore'));
        $result = $db->insertAssistantDeclaration(
            $_POST['instructoremail'],
            $_POST['crncode'],
            $_POST['term'],
            $_POST['studentnumber'],
            $_POST['role'],
            $_POST['workhours'],
            $_POST['assistantscore']
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
        isTheseParametersAvailable(array('adminemail', 'password', 'term'));
        $result = $db->insertAdmin(
          $_POST['adminemail'],
          $_POST['password'],
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
      }
  }
?>
