let currentFileName = '';

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.txt')) {
        alert('Povolený je pouze .txt formát!');
        return;
    }

    currentFileName = file.name;
    document.getElementById('fileName').textContent = file.name;

    const reader = new FileReader();
    reader.onload = function(ev) {
        document.getElementById('content').value = ev.target.result;
    };
    reader.readAsText(file);
});

async function signDocument() {
    const content = document.getElementById('content').value.trim();
    const signer = document.getElementById('signatureSelect').value;

    if (!content) {
        alert('Nejdříve nahrajte textový soubor!');
        return;
    }

    const status = document.getElementById('status');
    status.innerHTML = 'Podepisuji...';

    // SHA-256 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    // Vlastní klíče pro každého signatáře
    const keys = {
        "Bc. Šimon Novák": "RSA2048_JN_8F3K9X2M7P4Q",
        "Tomáš Jedno MBA": "ECDSA_PS_9L2M7N4B8V6X",
        "Dis. Musat Isik": "ED25519_XYZ_3P9Q2W7R5T8V",
        "Ing. Martin Beneš": "RSA2048_MB_4K7P9X2M5Q8W"
    };

    const key = keys[signer] || "UNKNOWN_KEY";

    // Simulace podpisu
    const signatureInput = key + content + Date.now();
    const sigBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(signatureInput));
    const sigArray = Array.from(new Uint8Array(sigBuffer));
    const signature = sigArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    // Patička podpisu
    const footer = `\n\n` + "=".repeat(70) + `\n` +
        `PODPIS DOKUMENTU\n` +
        `Signature     : ${signer}\n` +
        `Key          : ${key}\n` +
        `Hash (SHA-256): ${hash}\n` +
        `Signature    : ${signature}\n` +
        `Datum        : ${new Date().toLocaleString('cs-CZ')}\n` +
        "=".repeat(70);

    const signedContent = content + footer;

    // Přepis obsahu
    document.getElementById('content').value = signedContent;

    // Stažení souboru
    const blob = new Blob([signedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName.replace('.txt', '_podepsano.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    status.innerHTML = `<span style="color:green">✅ Dokument byl úspěšně podepsán a stažen!</span>`;
}