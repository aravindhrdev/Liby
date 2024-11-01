<?php
include_once 'dbcon.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = [];

if (isset($_GET['search'])) {
    $search = $_GET['search'];
    $searchT = '%' . $search . '%';
    $tables = ['e_t', 'elec', 'lit', 'math', 'mech', 'med_sci', 'soc'];
    $found = false;

    foreach ($tables as $tbl) {
        $stmt = $conn->prepare("SELECT Title, Author, Publisher, ISBN, P_Year AS Year, Type, Access_Type FROM $tbl WHERE Title LIKE ?");
        $stmt->bind_param('s', $searchT);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $found = true;
            while ($row = $result->fetch_assoc()) {
                $response[] = [
                    'Title' => htmlspecialchars($row['Title']),
                    'Author' => htmlspecialchars($row['Author']),
                    'Publisher' => htmlspecialchars($row['Publisher']),
                    'ISBN' => htmlspecialchars($row['ISBN']),
                    'Year' => htmlspecialchars($row['Year']),
                    'Type' => ($row['Type'] === 'P' ? 'Print Book' : 'E-book'),
                    'Access_Type' => ($row['Access_Type'] === 'S' ? 'Subscribed' : 'Open Type')
                ];
            }
            break; // Exit loop after first match
        }
        $stmt->close();
    }
    if (!$found) {
        $response['message'] = 'Book not Available';
    }
} else {
    $response['message'] = 'Book Title should not be Empty!';
}

echo json_encode($response);
$conn->close();
