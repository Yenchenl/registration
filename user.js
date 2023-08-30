const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// 建立與資料庫的連線
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'member'
});

// 測試資料庫連線
db.connect(err => {
  if (err) {
    console.error('資料庫連線失敗：', err);
  } else {
    console.log('資料庫連線成功');
  }
});

// 處理註冊請求
router.post('/formPost', (req, res) => {
  const { firstname, lastname, email, newpassword } = req.body;
  console.log(req.body);
  
  // 插入資料到資料庫
  const query = 'INSERT INTO users (firstname, lastname, email, newpassword) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, email, newpassword], (err, result) => {
    if (err) {
      console.error('資料庫操作失敗：', err);
      res.status(500).json({ message: '註冊失敗' });
    } else {
      console.log('註冊成功');
      res.json({ message: '註冊成功' });
    }
  });
});

module.exports = router;
