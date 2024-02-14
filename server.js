const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: 'uelpllhrokxsl0tt',
    host: 'bzsnyu38dyrnenundoay-mysql.services.clever-cloud.com',
    password: 'uzp7hswUDvwMdihnumiB',
    database: 'bzsnyu38dyrnenundoay',
})

app.post('/valentines', (req, res) => {
    const agree = req.body.agree
    const type = req.body.type
    const date = req.body.date;
    const day = req.body.day;
    const time = req.body.time;
    db.query(`INSERT INTO valentines_data (is_agree, type, date, day, time) VALUES (?, ?, ?, ?, ?)`, 
    [agree, type, date, day, time], 
    (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Successfully inserted into database.');
        res.status(200).json({ success: true });
        sendEmailVerification(agree, type, date, day, time)
    })
})


// Sending email verification
function sendEmailVerification(agree, type, date, day, time) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'imageinterior03@gmail.com',
        pass: 'tvtbvntxnmhproet',
      },
    });
  
    const mailOptions = {
      from: 'imageinterior03@gmail.com',
      to: 'awgenrobles6@gmail.com',
      subject: 'Valentines Day',
      text: 
      
      `     Did she Agree?: ${agree}
       What type of Date?: ${type}
       when will it be?: ${date}, ${day}, ${time}.`
    };

  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed: ' + error.message);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }



app.listen(3306), () => {
    console.log('listening...')
}