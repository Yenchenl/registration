const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const path = require('path');
const userRoutes = require('./user'); // 導入 user.js 模組

// 建立與資料庫的連線
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'member'
// });

// // 測試資料庫連線
// db.connect(err => {
//   if (err) {
//     console.error('資料庫連線失敗：', err);
//   } else {
//     console.log('資料庫連線成功');
//   }
// });

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
