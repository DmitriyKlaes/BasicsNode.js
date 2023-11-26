// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//     res.send('<h1>Добро пожаловать!!!</h1><a href="/about">Информация</a>');
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>Информация</h1><a href="/">Главная</a>');
// });

// app.listen(3000);

const express = require('express');

const app = express();

app.use(express.static('static'))

app.listen(3000);