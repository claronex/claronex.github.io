<?php

	//-----------------------------------------------------
	$address= "dave.green@clevara.com";
	//-----------------------------------------------------

	$name = $_POST["name"];
	$email = $_POST["email"];
	$phone = $_POST["phone"];
	$subject = "New Email";
	$message_content = $_POST["comments"];
	

	$headers = "From: $name <$email>\r\n";
	$headers .= "Reply-To: $subject <$email>\r\n";

	$message = "--$mime_boundary \r\n";
	
	$message .= "Sarge - Someone has sent you an Email, Check it out: \r\n";
	$message .= "Name: $name \r\n";
	$message .= "Email: $email \r\n";
	$message .= "phone: $phone \r\n";
	$message .= "Message: $message_content \r\n";
	$message .= "--$mime_boundary--\r\n";
	$mail_sent = mail($address, $subject, $message, $headers);
	if($mail_sent)
	{	
		echo "success";
	}
