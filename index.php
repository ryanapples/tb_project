<?php

$name = Trim(stripslashes($_POST['name']));
$email = Trim(stripslashes($_POST['email']));

echo "$name <br> $email";

if(!empty($name) || !empty($email)) {
    $cvsData = $name . "," . $email ;

    $fp = fopen("formData.csv", "a");

    if($fp)
    {
        fwrite($fp, $cvsData."\n"); // write info to the file
        fclose($fp); // Close the file
    }
}
?> 

