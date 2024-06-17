<?php
$zip = new ZipArchive;
$res = $zip->open('carlpage.zip');
if ($res === TRUE) {
    $zip->extractTo('.');
    $zip->close();
    echo 'Extraction successful!';
} else {
    echo 'Extraction failed!';
}
?>
