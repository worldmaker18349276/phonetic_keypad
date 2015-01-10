<?php
	$db_host="db_host";
	$db_user="db_user";
	$db_pw="db_pw";
	$db="db";
	if(!mysql_connect($db_host,$db_user,$db_pw)) {die("Could not connect: " . mysql_error());}
	mysql_query("SET NAMES 'utf8'");
	if(!mysql_select_db($db)) {die("Connect database fail!");}
?>