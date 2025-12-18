// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем запросы с любого фронтенда (для разработки)
app.use(cors());
app.use(express.json());

// Твой ключ deepseek.ai
const DEEPSEEK_KEY = "sk-dc673cd7cee441f6927eae40ae6187d4"; //
app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.deepseek.com/chat/completions',
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // ИСПОЛЬЗУЕМ ПЕРЕМЕННУЮ, А НЕ САМ ТЕКСТ КЛЮЧА ТУТ
                    'Authorization': `Bearer ${DEEPSEEK_KEY}` 
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        // Это выведет реальную причину в консоль (терминал)
        console.error("ОШИБКА API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});


