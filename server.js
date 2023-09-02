// import all we need 
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const path = require('path');
const userRoutes = require('./user'); // 導入 user.js 模組

// 使用 JSON 解析中間件
app.use(express.json());
//new one
app.use(express.urlencoded());
app.use(express.static('public'));

// 使用 userRoutes 模組處理用戶相關路由
app.use('/', userRoutes);


app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
});

// testing code

// const express = require('express');
// const path = require('path');

// const app = express();
// const port = 3000;

// // 使用 express.static 中间件来提供静态文件
// app.use(express.static('public'));

// // 设置 login.html 为根页面
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.listen(port, () => {
//   console.log(`伺服器運行在 http://localhost:${port}`);
// });
