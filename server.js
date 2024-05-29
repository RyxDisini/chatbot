// Import modul Express dan node-fetch
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// Inisialisasi aplikasi Express
const app = express();
const port = 3000; // Port server backend

// Gunakan middleware bodyParser untuk menguraikan JSON dari permintaan
app.use(bodyParser.json());

// Definisikan endpoint untuk menerima pesan dari klien (HTML/JavaScript)
app.post('/sendMessage', (req, res) => {
    // Ambil pesan dari permintaan POST
    const message = req.body.message;

    // Ganti 'YOUR_API_KEY' dengan kunci API OpenAI Anda
    const apiKey = 'sk-proj-9VqHONylbMwzqKyHyseoT3BlbkFJjnd7tZyku2zMhdPfdMww';
    const openaiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    // Kirim permintaan ke API OpenAI
    fetch(openaiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 50 // Jumlah token maksimum untuk respons
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Kirim respons dari API OpenAI kembali ke klien
        res.json({ message: data.choices[0].text.trim() });
    })
    .catch(error => {
        // Tangani kesalahan jika permintaan gagal
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    });
});

// Mulai server backend di port tertentu
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
