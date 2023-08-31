const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const nodeMailer = require('nodemailer'); // use for mailing
const {google} = require('googleapis'); // get the google oauth

// set the required, the refresh token has to refresh by "google oauth playground"
const CLIENT_ID = '419975539241-k9bm6mfnspdahahapsntu14o2ke0meja.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//042lLF8HdSWZoCgYIARAAGAQSNwF-L9IrMs7GalN3W7uGU6N2pAdfW7UK2aG7F_hV4sKK8d0oZjsIbJb1Z02VJ4AMpVcv0EStxF8';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

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


async function sendMail(tomailer, name) {
  try {
      const accessToken = await oAuth2Client.getAccessToken()

      const transport = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: '71614dennis@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken
          }
      })

      const mailOptions = {
          from: '71614DENNIS<71614dennis@gmail.com>',
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
});

module.exports = router;
