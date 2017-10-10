<?php
	class AiJobsManager {
		private $dbConnection;
		private $fields = [
			"jobopeningid",
			"job_opening_id",
			"smownerid",
			"account_manager",
			"job_type",
			"is_hot_job_opening",
			"publish",
			"no_of_candidates_associated",
			"posting_title",
			"last_activity_time",
			"job_opening_status",
			"date_opened",
			"target_date",
			"clientid",
			"client_name",
			"contactid",
			"contact_name",
			"recruiterid",
			"assigned_recruiter",
			"state",
			"number_of_positions",
			"smcreatorid",
			"created_by",
			"modifiedby",
			"modified_by",
			"created_time",
			"modified_time",
			"work_experience",
			"revenue_per_position",
			"stage",
			"probability",
			"job_description",
			"is_attachment_present",
			"country",
			"upper_salary_range",
			"location",
			"no_of_candidates_hired",
			"zip_code"
		];
		private $publicFields = [
			"jobopeningid",
			"job_opening_id",
			"job_type",
			"posting_title",
			"date_opened",
			"client_name",
			"contact_name",
			"number_of_positions",
			"work_experience",
			"job_description",
			"country",
			"upper_salary_range",
			"location",
			"zip_code"
		];		

		function __construct($dbConnection) {
			$this->dbConnection = $dbConnection;
		}

		function normaliseField($field) {
			return strtolower(str_replace(" ", "_", $field));
		}

		function storeJobsInDatabase($jobs) {
			$this->dbConnection->query("DELETE FROM `jobs`") or die($this->dbConnection->error);

			foreach($jobs as $job) {
				$query = "INSERT INTO `jobs` SET";

				foreach($job->FL as $data) {
					$field = $this->normaliseField($data->val);
					
					if (!in_array($field, $this->fields))
						continue;

					$query .= " `" . $this->dbConnection->escape_string($field) . 
						"`='" . $this->dbConnection->escape_string($data->content) . "',";
				}

				$query = substr($query, 0, -1);

				$this->dbConnection->query($query) or die($this->dbConnection->error);
				$this->dbConnection->query("UPDATE `settings` SET lastUpdated = " . time());
			}
		}

		function getLastJobsUpdate() {
			$result = $this->dbConnection->query("SELECT lastUpdated FROM `settings`") or die($this->dbConnection->error);
			
			if ($row = $result->fetch_array(MYSQLI_ASSOC))
				return $row['lastUpdated'];

			return null;
		}

		function getJobsFromDatabase($fields = null) {
			$fields_arr = is_null($fields) ? $this->publicFields : explode(",", $fields);
			$selectFields = $this->buildSelectFieldsString($fields_arr);

			$jobs = [];

			$result = $this->dbConnection->query("SELECT {$selectFields} FROM `jobs`") or die($this->dbConnection->error);

			while($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$jobs[] = $row;
			}

			return $jobs;
		}

		function getJobFromDatabase($id, $fields = null) {
			if (!isset($id) || !is_numeric($id))
				return null;

			$fields_arr = is_null($fields) ? $this->publicFields : explode(",", $fields);
			$selectFields = $this->buildSelectFieldsString($fields_arr);

			$result = $this->dbConnection->query(
				"SELECT {$selectFields} FROM `jobs` WHERE job_opening_id = '{$id}' LIMIT 1") or die($this->dbConnection->error);

			if ($row = $result->fetch_array(MYSQLI_ASSOC))
				return $row;

			return null;
		}

		function buildSelectFieldsString($fields_arr) {
			$selectFields = "";
			
			foreach($fields_arr as $field)
				if (in_array($field, $this->publicFields))
					$selectFields .= "{$field},";
			
			$selectFields = substr($selectFields, 0, -1);

			return $selectFields;
		}

		function restoreDatabase() {
			$jobsTable = "CREATE TABLE `jobs` (";
			foreach($this->fields as $field) {
				$type = $field == "job_description" ? "TEXT" : "VARCHAR(255)";
				$jobsTable .= "`{$field}` {$type},";
			}
			$jobsTable = substr($jobsTable, 0, -1) . ");";

			$this->dbConnection->query("DROP TABLE IF EXISTS `jobs`");
			$this->dbConnection->query($jobsTable);

			$this->dbConnection->query("DROP TABLE IF EXISTS `settings`");
			$this->dbConnection->query("CREATE TABLE `settings` (lastUpdated int)");
			$this->dbConnection->query("INSERT INTO `settings` SET lastUpdated = NULL");
		}
	}

	class ZohoRecruitApi {		
		private $apiKey;
		private $jobs;

		function __construct($apiKey) {
			$this->apiKey = $apiKey;
		}
		
		function getJobsFromApi($location = null) {
			if (is_null($location)) // if we want to use a mock location
				$location = "https://recruit.zoho.com/recruit/private/json/JobOpenings/getSearchRecords?authtoken={$this->apiKey}&scope=recruitapi&version=2&newFormat=1&selectColumns=All&searchCondition=(Job%20Opening%20Status%7Ccontains%7C*progress*)";

			$response = file_get_contents($location);
			
			$data = json_decode($response);

			if (isset($data->response->error))
				die($data->response->error->message);

			$this->jobs = $data->response->result->JobOpenings->row;

			return $this->jobs;
		}

		function getJobs() {
			return $this->jobs;
		}

		function getColumnsFromJob($index = 0) {
			if (is_null($this->jobs))
				return false;

			$columns = [];
			
			foreach ($this->jobs[$index]->FL as $column => $value)
				$columns[] = $value->val;

			return $columns;
		}

		function getNormalisedColumnsFromJob($index = 0) {
			if (is_null($this->jobs))
				return false;
			
			$columns = [];
			
			foreach ($this->jobs[$index]->FL as $column => $value)
				$columns[] = $this->normaliseField($value->val);

			return $columns;
		}

		function normaliseField($field) {
			return strtolower(str_replace(" ", "_", $field));
		}
	}
