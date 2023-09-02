// import all we need 
// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// const port = 3000;
// const path = require('path');
// const userRoutes = require('./user'); // 導入 user.js 模組

// // 使用 JSON 解析中間件
// app.use(express.json());
// //new one
// app.use(express.urlencoded());
// app.use(express.static('public/login.html'));

// // 使用 userRoutes 模組處理用戶相關路由
// // 设置 login.html 为根页面
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });
// // app.get('/', (req, res) => {
// //   res.sendFile(__dirname + '/public/login.html');
// // });

// app.listen(port, () => {
//   console.log(`伺服器運行在 http://localhost:${port}`);
// });


// test1

// const express = require('express');
// const path = require('path');

// const app = express();
// const port = 3000;

// // 使用 express.static 中间件来提供静态文件
// app.use(express.static('public/login.html'));

// // 设置 login.html 为根页面
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.listen(port, () => {
//   console.log(`伺服器運行在 http://localhost:${port}`);
// });


//test2

// const express = require('express');
// const app = express();
// const port = 3000;
// const path = require('path');

// // 使用 JSON 解析中间件
// app.use(express.json());
// app.use(express.urlencoded());

// // 设置静态文件目录
// app.use(express.static('private'));

// // 设置 login.html 为根页面
// app.get('/', (req, res) => {
//   res.sendFile(__dirname+'/login2.html');
// });

// app.listen(port, () => {
//   console.log(`伺服器運行在 http://localhost:${port}`);
// });

//test3

// const express = require('express');
// const app = express();
// const port = 5050;

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// app.get('/regis', function (req, res){
//   res.sendFile('/public/regis.html');
// })

// app.post('/', (req, res) => {
//   res.send('POST request to the homepage');
// });

// app.listen(port, () => {
//   console.log(`伺服器運行在 http://localhost:${port}`);
// });

// test4: Hello World
// var express = require('express');
// var app = express();
// var port = 5000;

// app.get('/', function(req, res) {
// // 如果有收到/就在頁面上回傳 Hello World 
//   res.send('Hello World');
// });

// app.listen(port, () => {
//   console.log(`伺服器運行在 http://localhost:${port}`);
// })

// test5: router

var express = require('express');
var app = express();
var port = 5000;
const path = require('path');

app.get('/', function(req, res) {
  res.send('Hello world');
});

// This is error code
// app.get('/ream', function(req, res) {
//   res.sendFile('ream.html');
// });

app.use(express.static('public'));

// This is correct code, it used the absolute path
app.get('/ream', function(req, res){
  res.sendFile(path.join(__dirname, './public/regis.html'));
});


app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
})