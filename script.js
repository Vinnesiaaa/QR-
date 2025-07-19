// scripts.js
let qrCodeInstance = null;

function generateQR() {
    const input = document.getElementById('qrInput').value;
    const qrCodeDiv = document.getElementById('qrCode');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadCodeBtn = document.getElementById('downloadCodeBtn');
    const errorMsg = document.getElementById('errorMsg');
    const fgColor = document.getElementById('fgColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const qrSize = parseInt(document.getElementById('qrSize').value);

    errorMsg.classList.add('hidden');
    qrCodeDiv.innerHTML = '';
    downloadBtn.classList.add('hidden');
    downloadCodeBtn.classList.add('hidden');

    if (!input) {
        errorMsg.textContent = 'Please enter text or URL!';
        errorMsg.classList.remove('hidden');
        return;
    }

    if (qrSize < 100 || qrSize > 1000) {
        errorMsg.textContent = 'Size must be between 100 and 1000 pixels!';
        errorMsg.classList.remove('hidden');
        return;
    }

    try {
        if (qrCodeInstance) qrCodeInstance.clear();
        qrCodeInstance = new QRCode(qrCodeDiv, {
            text: input,
            width: qrSize,
            height: qrSize,
            colorDark: fgColor,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel.H
        });
        downloadBtn.classList.remove('hidden');
        downloadCodeBtn.classList.remove('hidden');
    } catch (e) {
        errorMsg.textContent = 'Error generating QR code: ' + e.message;
        errorMsg.classList.remove('hidden');
    }
}

function downloadQR() {
    const qrCodeDiv = document.getElementById('qrCode');
    const canvas = qrCodeDiv.getElementsByTagName('canvas')[0];
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } else {
        alert('No QR code to download. Generate one first!');
    }
}

function downloadCode() {
    const input = document.getElementById('qrInput').value;
    const fgColor = document.getElementById('fgColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const qrSize = document.getElementById('qrSize').value;

    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QR Code</title>
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
</head>
<body>
    <div id="qrcode"></div>
    <script>
        new QRCode(document.getElementById("qrcode"), {
            text: "${input}",
            width: ${qrSize},
            height: ${qrSize},
            colorDark: "${fgColor}",
            colorLight: "${bgColor}",
            correctLevel: QRCode.CorrectLevel.H
        });
    </script>
</body>
</html>
    `;

    const blob = new Blob([code], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qrcode-generator.html';
    link.click();
}

document.getElementById('menuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});
