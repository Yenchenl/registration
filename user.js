const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const app = express();

const nodeMailer = require('nodemailer'); // use for mailing
const {google} = require('googleapis'); // get the google oauth

// set the required, the refresh token has to refresh by "google oauth playground"
const CLIENT_ID = 'your client id';
const CLIENT_SECRET = 'your client secret';
const REDIRECT_URI = 'your redirect uri';
const REFRESH_TOKEN = 'your refresh token';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

// 建立與資料庫的連線
const db = mysql.createConnection({
  host: 'your host',
  user: 'user',
  password: 'password',
  database: 'database'
});

// 測試資料庫連線
db.connect(err => {
  if (err) {
    console.error('資料庫連線失敗：', err);
  } else {
    console.log('資料庫連線成功');
  }
});

// sending email with nodemailer and gmail api
async function sendMail(tomailer, name) {
  try {
      const accessToken = await oAuth2Client.getAccessToken()

      const transport = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: 'example@email',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken
          }
      })

      const mailOptions = {
          from: 'example<example@com>',
          to: tomailer,
          subject: 'Thank you for your using',
          text: 'Thank you for using the registration system,'+name,
      };

      const result = await transport.sendMail(mailOptions)
      return result

  }  catch (error) {
     return error;
  }
}


// 處理註冊請求
router.post('/formPost', (req, res) => {
  const { firstname, lastname, email, newpassword } = req.body;
  console.log(req.body);
  console.log(email);

  //const inputemail = 'a109222048@mail.shu.edu.tw';
  var results = [];
  // checking email isn't registered
  db.connect(function(err) {
  if (err) throw err;
  db.query("SELECT * FROM users WHERE email = ?", [email], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0){
      console.log("已經有帳號了，請輸入原有帳號");
      res.json({ message: '已經有帳號了，請輸入原有帳號' });}
    else{
      sendMail(email, firstname)
      .then((result) => console.log('Email sent...', result))
      .catch((error) => console.log(error.message));  
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
    }
    });
  });
});

router.post('/loginPost', (req, res) => {
  const { inemail, inpassword } = req.body;
  // console.log(req.body);
  // console.log(inemail);

  // 查询数据库以检查是否存在具有给定电子邮件和密码的用户
  const query = 'SELECT email, firstname FROM users WHERE email = ? AND newpassword = ?';
  db.query(query, [inemail, inpassword], (err, result) => {
    if (err) {
      console.error('資料庫查詢錯誤：', err);
      res.status(500).json({ message: '資料庫錯誤' });
    } else if (result.length === 0) {
      // 未找到匹配的用户
      res.status(404).json({ message: '未找到用戶或帳號密碼不正確' });
    } else {
      // 找到用户，您可以继续登录逻辑
      // 找到用户，您可以继续登录逻辑
      const user = result[0];
      console.log('找到用户：', user);
      // 您可以在这里创建会话或JWT进行身份验证
      // res.json({ message: '登录成功', user });

      const responseHtml = `
        <html>
        <head>
          <link rel="stylesheet" href="./public/styles.css" />
          <title>Login Success</title>
        </head>
        <body>
          <h1>Login Sucess</h1>
          <p>Hello there, welcome to my website</p>
          <p>Your email: ${user.email}</p>
          <p>Your name: ${user.firstname}</p>
        </body>
       </html>
  
      `;

      // 发送 HTML 响应
      res.send(responseHtml);
    }
  });
});

module.exports = router;
