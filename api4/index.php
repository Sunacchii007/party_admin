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
        $sql = "SELECT * FROM pets";
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

        break;

        case "POST":
            $pet = json_decode(file_get_contents('php://input'));
        
            // Check if all required fields are present
            if (isset($pet->genre, $pet->sexe, $pet->age, $pet->description, $pet->prix)) {
                $sql = "INSERT INTO pets (genre, sexe, age, description, prix) VALUES (:genre, :sexe, :age, :description, :prix)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':genre', $pet->genre);
                $stmt->bindParam(':sexe', $pet->sexe);
                $stmt->bindParam(':age', $pet->age);
                $stmt->bindParam(':description', $pet->description);
                $stmt->bindParam(':prix', $pet->prix);
        
                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Pet added successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to add pet.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Invalid input. All fields are required.'];
            }
        
            echo json_encode($response);
            break;
        
        
        

    case "PUT":
        $input = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE pets SET genre = :genre, sexe = :sexe, age = :age, description = :description, image = :image, prix = :prix WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':genre', $input['genre']);
        $stmt->bindParam(':sexe', $input['sexe']);
        $stmt->bindParam(':age', $input['age']);
        $stmt->bindParam(':description', $input['description']);
        $stmt->bindParam(':image', $input['image']);
        $stmt->bindParam(':prix', $input['prix']);
        $stmt->bindParam(':id', $input['id']);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Pet updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update pet.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM pets WHERE id = :id";
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
