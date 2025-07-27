const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// API routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Proxy Converter API is running' });
});

// Serve the application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Proxy Converter запущен на порту ${PORT}`);
    console.log(`📱 Откройте http://localhost:${PORT} в браузере`);
});