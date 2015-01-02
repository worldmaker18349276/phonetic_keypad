<?php

	if ( isset($_POST['zhuyin']) ) {

		$phonetab = fopen("meta/phonetab.txt", "r") or die("Unable to open file!");

		while ( ($line = fgets($phonetab)) !== false ) {
			$pair = explode(' ', $line, 2);
			if ( $pair[0] === $_POST['zhuyin'] ) {
				print $pair[1];
				break;
			}
		}
		
		fclose($phonetab);
		
	}

?>