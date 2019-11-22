<?php
  //Get operations
  require_once dirname(__FILE__).'\DbOperation.php'

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
        case 'insertStudent':
        case 'insertInstructor':
        case 'insertCourse':
        case 'insertAssistantDeclaration':
        case 'insertAdmin':
      }
  }
?>
