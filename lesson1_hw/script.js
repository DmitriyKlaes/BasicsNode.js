const http = require('http');

let mainCounter = 0;
let aboutCounter = 0;
let errorCounter = 0;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      mainCounter++;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(
        `<a href="/about">Перейти на страницу обо мне!<a/><p>Счетчик посещений главной страницы: ${mainCounter}`
      );
      break;
    case '/about':
      aboutCounter++;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(
        `<a href="/">Перейти на страницу главная!<a/><p>Счетчик посещений информационной страницы: ${aboutCounter}`
      );
      break;
    default:
      errorCounter++;
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(
        `<h1>Страница 404<h1/><a href="/">Перейти на страницу главная!<a/><p>Счетчик ваших ошибок: ${errorCounter}`
      );
      break;
  }
});

const port = '3000';

server.listen(port);
