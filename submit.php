<?php
header('Content-Type: application/json'); // Respond with JSON

$conn = new mysqli('localhost', 'root', '', 'project');

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$name    = $_POST['name'] ?? '';
$email   = $_POST['email'] ?? '';
$phone   = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

// Validate required fields
if (!$name || !$email || !$phone || !$message) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO query_form (name, email, phone, message) VALUES (?, ?, ?, ?)");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Statement prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssss", $name, $email, $phone, $message);

if ($stmt->execute()) {
    echo json_encode(["Query form submitted!" => true]);
} else {
    http_response_code(409); // Conflict, often used for duplicate
    echo json_encode(["error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
