<?php
// Path to the JSON file where data will be stored
$jsonFilePath = 'data.json';

// Get the JSON data from the request
$jsonData = file_get_contents('php://input');

// Verify if the JSON data is valid
if ($jsonData !== false) {
    // Attempt to decode the JSON data
    $decodedData = json_decode($jsonData);

    if ($decodedData !== null) {
        // Write the JSON data to the file
        if (file_put_contents($jsonFilePath, $jsonData) !== false) {
            echo "Data successfully saved to $jsonFilePath";
        } else {
            echo "Error: Unable to save data to $jsonFilePath";
        }
    } else {
        echo "Error: Invalid JSON data";
    }
} else {
    echo "Error: Failed to retrieve JSON data from the request";
}
?>