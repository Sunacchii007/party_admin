<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;

        case "POST":
            // Read the input data from the request body
            $inputData = json_decode(file_get_contents('php://input'), true);
        
            // Log the received data for debugging
            error_log(print_r($inputData, true));
        
            // Prepare dynamic SQL statement
            $fields = [];
            $values = [];
            $params = [];
            foreach ($inputData as $key => $value) {
                $fields[] = $key;
                $values[] = ':' . $key;
                $params[$key] = $value;
            }
        
            if (!empty($fields)) {
                // Generate the SQL query dynamically
                $sql = "INSERT INTO products (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $values) . ")";
                $stmt = $conn->prepare($sql);
        
                // Bind the parameters dynamically
                foreach ($params as $key => $value) {
                    $stmt->bindParam(':' . $key, $params[$key]);
                }
        
                if ($stmt->execute()) {
                    // If insertion is successful
                    $response = ['status' => 1, 'message' => 'Product added successfully.'];
                } else {
                    // If insertion fails, provide error message
                    $errorInfo = $stmt->errorInfo();
                    $response = ['status' => 0, 'message' => 'Failed to add product: ' . $errorInfo[2]];
                }
            } else {
                // If no fields are provided
                $response = ['status' => 0, 'message' => 'No valid fields provided.'];
            }
        
            // Return response as JSON
            echo json_encode($response);
            break;
        
        
        

    // Other cases remain unchange


    case "PUT":
        $input = json_decode(file_get_contents('php://input'), true);
        $imagePath = basename($input['image']); // Extract filename from the image path
        $sql = "UPDATE products SET nom = :nom, prix = :prix, image = :image WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nom', $input['nom']);
        $stmt->bindParam(':prix', $input['prix']);
        $stmt->bindParam(':image', $imagePath); // Use the extracted filename
        $stmt->bindParam(':id', $input['id']);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Product updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update product.'];
        }
        echo json_encode($response);
        break;
    

    case "DELETE":
        $sql = "DELETE FROM products WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Invalid ID.'];
        }
        echo json_encode($response);
        break;

    default:
        echo json_encode(['status' => 0, 'message' => 'Method not supported']);
        break;
}
?>
