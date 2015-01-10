<?php

	if ( isset($_POST['zhuyin']) ) {
		$zhuyin = $_POST['zhuyin'];

		include_once 'mysql_config.php';
		$result = mysql_query("SELECT `text` FROM `phonetab` WHERE phone='$zhuyin'");
		while ( $rows = mysql_fetch_array($result, MYSQL_ASSOC) )
			echo $rows['text'];

		mysql_close();
	}

?>