<?php
header('Content-Type: application/json');

include_once 'dbcon.php';
error_log("Query: " . $query);

if (isset($_POST['query']))
{
    $query = $_POST['query'];
    
    $searchTerm = '%' . $query . '%';

    $tables = ['e_t', 'elec', 'lit', 'math', 'mech', 'med_sci', 'soc'];
    $found = false;
    foreach ($tables as $table) {
        $stmt = $conn->prepare("SELECT Title FROM $table WHERE Title LIKE ?");
        $stmt->bind_param("s", $searchTerm);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $found = true;
            while ($row = $result->fetch_assoc()) {
                echo '<li>' . htmlspecialchars($row["Title"]) . '</li>';
            }
        } else {
            echo 'No suggestions available';
        }

        $stmt->close();
    }
    if(!$found){
        echo '<li>Error preparing the SQL query</li>';
    }
} else {
    echo '<li>No query parameter provided</li>';
}

$conn->close();
