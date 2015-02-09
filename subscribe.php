<?php

	//-----------------------------------------------------
	//-----------change address to xxx@yourdomainname ----------------------
	$address= "contact@naiknikunj.me";
	//-----------------------------------------------------
	//-----------------------------------------------------

	$email = $_POST["email"];
	$subject = "New subscription";
	$message_content = $_POST["message"];
	
	$headers = "From: $name <$email>\r\n";
	$headers .= "Reply-To: $subject <$email>\r\n";

	$message = "--$mime_boundary \r\n";
	
	$message .= "You have an email from your web site: \r\n";
	$message .= "New user subscription:  $email \r\n";
	$message .= "--$mime_boundary--\r\n";
	$mail_sent = mail($address, $subject, $message, $headers);
	if($mail_sent)
	{	
		echo $name. ": Thanks for subscription.";
	}
