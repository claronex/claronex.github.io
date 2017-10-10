<?php
	include("credentials.php");

	$dbConnection = new mysqli($server, $username, $password, $database);

	if ($dbConnection->connect_errno)
		die("Error connecting to database");