const express = require('express');
const app = express();

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api', (req, res) => res.send('Welcome to HR Hiring API'));

module.exports = app;