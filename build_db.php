<?php
	set_time_limit(0);
	
	include_once "mysql_config.php";

	$sql = "CREATE TABLE `phonetab` (
		`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		`phone` VARCHAR(5) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci NOT NULL,
		`text` VARCHAR(1) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci NOT NULL
	)";
	if ( !mysql_query($sql) )
		die("Could not create table: " . mysql_error());

	$phonetab = fopen("meta/phonetab.txt", "r") or die("Unable to open file!");

	while ( ($line = fgets($phonetab)) !== false ) {
		$data = explode(" ", $line, 2);
		$phone = $data[0];
		$texts = explode(" ", $data[1]);

		foreach ( $texts as $text ) {
			$sql = "INSERT INTO `phonetab` (`phone`, `text`) VALUES ('$phone', '$text')";
			if ( !mysql_query($sql) )
				die("Could not insert data: " . mysql_error());
			echo "($phone,$text) ";
		}
	}
	
	fclose($phonetab);
	mysql_close();

	echo "database has been built";
?>