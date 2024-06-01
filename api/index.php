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

switch($method) {
    case "GET":
        $sql = "SELECT * FROM orders";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
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
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO orders(id, nomComplet, adresse,email,telephone ) VALUES(null, :nomComplet ,:adresse , :email,:telephone )";
        $stmt = $conn->prepare($sql);
        // $created_at = date('Y-m-d');
        $stmt->bindParam(':nomComplet', $user->nomComplet);
        $stmt->bindParam(':adresse', $user->adresse);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':telephone', $user->telephone);
       
       

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Account created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create account.'];
        }
        echo json_encode($response);
        break;
        case "PUT":
            // Handle PUT request to update records
            $input = json_decode(file_get_contents('php://input'), true);
            $sql = "UPDATE orders SET nomComplet = :nomComplet, adresse = :adresse, email = :email, telephone = :telephone  WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $input['id']);
            $stmt->bindParam(':nomComplet', $input['nomComplet']);
            $stmt->bindParam(':adresse', $input['adresse']);
            $stmt->bindParam(':email', $input['email']);
            $stmt->bindParam(':telephone', $input['telephone']);
           
            $stmt->execute();
            break;
    
        default:
            echo "Method not supported";
            break;
            case "DELETE": 
                $sql = "DELETE FROM orders WHERE id = :id";
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
                break;
}