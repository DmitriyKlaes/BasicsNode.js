// const http = require('http');
// const server = http.createServer((req, res) => {
//   console.log('Запрос получен');

//   if (req.url === '/') {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
//     res.end('<a href="/about">Перейти на страницу обо мне!<a/>');
//   }
//   if (req.url === '/about') {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
//     res.end('<a href="/">Перейти на страницу главная!<a/>');
//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
//     res.end('<h1>Страница 404<h1/>');
//   }
// });
// const port = 3000;

// server.listen(port, () => {
//   console.log(`Сервер запущен на порту ${port}`);
// });

const http = require('http');

const server = http.createServer((req, res) => {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/html; charset=utf-8',
  //   });
  //   res.end('<h1>Да</h1>');
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end('<a href="/about">Перейти на страницу обо мне!<a/>');
      break;
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end('<a href="/">Перейти на страницу главная!<a/>');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end('<h1>Страница 404<h1/><a href="/">Перейти на страницу главная!<a/>');
      break;
  }
});

const port = '3000';

server.listen(port);
