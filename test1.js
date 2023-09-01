const mysql = require('mysql2');
const app = require('express');
const port = 3000;

//資料庫連線
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'member'
});

const inputemail = 'a109222048@mail.shu.edu.tw';
var results = [];

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users WHERE email = ?", [inputemail], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0){console.log("已經有帳號了，請輸入原有帳號");}
    else{console.log("謝謝註冊");}
  });
});



  