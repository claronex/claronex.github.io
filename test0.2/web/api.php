<?php
	//includes
	include("db.php");
	include("AiJobsManager.php");


	// objects
	$api = new ZohoRecruitApi($zohoApiKey);
	$manager = new AiJobsManager($dbConnection);
	
	
	// functions
	function restoreDatabase() {
		global $manager, $apiKey;

		$response = ["success" => "false"];

		if (isset($_GET['key']) && $_GET['key'] == $apiKey) {
			$manager->restoreDatabase();
			$response["success"] = true;
		} else {
			$response["message"] = "Invalid API Key";
			http_response_code(401);
		}

		echo json_encode($response);
	}

	function updateJobs($force = false) {
		global $api, $manager;

		$update = false;

		if ($force) {
			$update = true;
		} else {
			$lastUpdated = $manager->getLastJobsUpdate();
			$thirtyMinutes = 60 * 30;

			if (is_null($lastUpdated) || ((time() - $lastUpdated) >= $thirtyMinutes))
				$update = true;
		}

		if (!$update)
			return;

		$jobs = $api->getJobsFromApi();
		$manager->storeJobsInDatabase($jobs);
	}

	function forceUpdateJobs() {
		global $manager, $apiKey;

		$response = ["success" => "false"];

		if (isset($_GET['key']) && $_GET['key'] == $apiKey) {
			updateJobs(true);
			$response["success"] = true;
		} else {
			$response["message"] = "Invalid API Key";
			http_response_code(401);
		}

		echo json_encode($response);
	}

	function getJobs() {
		global $manager;

		updateJobs();

		$fields = isset($_GET['fields']) ? $_GET['fields'] : null;

		$result = isset($_GET['id']) ? 
			$manager->getJobFromDatabase($_GET['id'], $fields) : 
			$manager->getJobsFromDatabase($fields);

		if (is_null($result))
			http_response_code(404);

		echo json_encode($result);
	}


	function routeNotFound() {
		http_response_code(404);
		echo json_encode(["error" => "Not Found"]);
	}

	function getActionFromRestRequest($request) {
		$request = explode('/', $_GET['url']);

		if (!in_array(count($request), [1,2])) // expecting 1 or 2 parts in the requested route
			return null;

		if (count($request) == 2)
			$_GET['id'] = $request[1];

		return $request[0];
	}


	// set api response content type
	header('Content-Type: application/json');

	
	// routes
	$action = 	isset($_GET['url']) ? getActionFromRestRequest($_GET['url']) :
				(isset($_GET['action']) ? $_GET['action'] : 
				null);

	switch ($action) {
		case "jobs":
			getJobs(); break;
		case "updateJobs":
			updateJobs(); break;
		case "restoreDatabase":
			restoreDatabase(); break;
		default:
			routeNotFound(); break;
	}
