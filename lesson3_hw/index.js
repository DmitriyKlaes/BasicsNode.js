const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const pathCounter = path.join(__dirname, 'counter.json');


app.get('/', (req, res) => {
    const counterData = JSON.parse(fs.readFileSync(pathCounter, 'utf-8'));
    counterData.main += 1;
    res.send(
      `<h1>Добро пожаловать!!!</h1><a href="/about">Информация</a><p>Счетчик посещений: ${counterData.main}`
    );
    fs.writeFileSync(pathCounter, JSON.stringify(counterData, null, 2));
});

app.get('/about', (req, res) => {
    const counterData = JSON.parse(fs.readFileSync(pathCounter, 'utf-8'));
    counterData.about += 1;
    res.send(
      `<h1>Информация</h1><a href="/">Главная</a><p>Счетчик посещений: ${counterData.about}`
    );
    fs.writeFileSync(pathCounter, JSON.stringify(counterData, null, 2));
});

app.listen(3000);