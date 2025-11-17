const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Для парсинга данных формы
app.use(bodyParser.urlencoded({ extended: true }));

// Отдаём HTML страницу
app.use(express.static(path.join(__dirname, 'public')));

// Обрабатываем POST запрос с формы
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const entry = `Имя: ${username}, Email: ${email}, Пароль: ${password}\n`;
    fs.appendFile('users.txt', entry, err => {
        if (err) {
            res.status(500).send("Ошибка сохранения");
            return;
        }
        res.send("Регистрация успешна! Данные записаны.");
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
