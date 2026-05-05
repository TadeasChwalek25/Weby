<?php
header('Content-Type: application/json');

if ($_FILES['file']) {
    $file = $_FILES['file'];
    
    if ($file['error'] === 0 && pathinfo($file['name'], PATHINFO_EXTENSION) === 'txt') {
        $content = file_get_contents($file['tmp_name']);
        
        echo json_encode([
            'success' => true,
            'content' => $content,
            'filename' => $file['name']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Neplatný soubor']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Žádný soubor nenahrán']);
}