<?php

// uni file for their pc availability data
echo file_get_contents('http://openacc-web-01.uni.ds.port.ac.uk/api/v1/buildings/openaccess');

/*

	old data:
	
	print file_get_contents('http://openacc-web-01.uni.ds.port.ac.uk/dsign/oaa.php');

	example of what the oaa.php file prints out:
	"[1,251,258,1,1,31,71,1,1,15,45,1,1,1,12,1]"

	every four elements is a building
	e.g 1, 251, 258, 1 is the library

	1. boolean for whether the building is open or not
	2. amount of pcs available
	3. amount of pcs in total
	4. can be either 1, 2 or 3:
			in the building the amount of computers available are
			+ 1: > 25%
			+ 2: < 25%
			+ 3: 0%

	   i dont see why this is here as you can calculate it from 2 & 3

*/

?>