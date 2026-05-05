<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$content = $data['content'] ?? '';
$signer = $data['signer'] ?? 'Neznámý';

if (empty($content)) {
    echo json_encode(['success' => false, 'message' => 'Prázdný obsah']);
    exit;
}

$hash = hash('sha256', $content);

// Vlastní klíče pro jednotlivé signatáře
$keys = [
    'Jan Novák'          => 'RSA2048_JN_8F3K9X2M7P4Q',
    'Petra Svobodová'    => 'ECDSA_PS_9L2M7N4B8V6X',
    'Firma XYZ s.r.o.'   => 'ED25519_XYZ_3P9Q2W7R5T8V',
    'Ing. Martin Beneš'  => 'RSA2048_MB_4K7P9X2M5Q8W'
];

$key = $keys[$signer] ?? 'UNKNOWN_KEY_' . strtoupper(substr(md5($signer), 0, 12));

$signature = hash('sha256', $key . $content . time());

$footer = "\n\n" . str_repeat("=", 70) . "\n";
$footer .= "PODPIS DOKUMENTU\n";
$footer .= "Signatář   : " . $signer . "\n";
$footer .= "Key         : " . $key . "\n";
$footer .= "Hash (SHA-256): " . strtoupper($hash) . "\n";
$footer .= "Signature   : " . strtoupper($signature) . "\n";
$footer .= "Datum       : " . date('d.m.Y H:i:s') . "\n";
$footer .= str_repeat("=", 70);

$signedContent = $content . $footer;

echo json_encode([
    'success' => true,
    'signedContent' => $signedContent
]);