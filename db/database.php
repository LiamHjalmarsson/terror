<?php
    ini_set("display_errors", 1);

    function sendJSON($data, $statuscode = 200) {
        header("Content-Type: application/json");
        http_response_code($statuscode);
        $json = json_encode($data);
        echo $json;
        exit();
    } 

    $file_Name = "./database.json";
    
    $database = [];

    $requestFile = file_get_contents("php://input");
    $json_Data = json_decode($requestFile, true);
    
    if (file_exists($file_Name)){
        $request_File = file_get_contents($file_Name); 
        $database = json_decode($request_File, true);
    }
    
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    if ($requestMethod == "GET") {
        sendJSON($database);
    }
    
    if ($requestMethod == "PATCH") {

        $id = $json_Data["id"];
        $terror = $json_Data["terror"];

        foreach ($database as $index => $person) {
            if ($person["id"] == $id) {

                $person["terror"] = $terror;
                $database[$index] = $person;

                $json = json_encode($database, JSON_PRETTY_PRINT);
                file_put_contents($file_Name, $json);
                sendJSON($person);
            }
        }
    }
    
    if ($json_Data["name"] == "") {
        $error = ["error" => "Please try again! input is empety"];
        sendJSON($error);
    }

    $name = strtolower($json_Data["name"]); 
    $terror = $json_Data["terror"];
    
    $heighst_Id = 0; 
        
    foreach ($database as $data) {

        if ($data["id"] > $heighst_Id) {
            $heighst_Id = $data["id"];
        }
        
        if ($data["name"] == $name) {
            $error = ["error" => "$name already exists in database!"];
            sendJSON($error, 405);
        }

    }
    
    $next_Id = $heighst_Id + 1;
    $new = ["id" => $next_Id, "name" => $name, "terror" => $terror];
    
    $database[] = $new;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents($file_Name, $json);
    sendJSON($new);
