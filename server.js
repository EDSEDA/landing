import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import fs from 'fs';
import https from 'https';


dotenv.config();

function initMailTransporter() {
  const transporter = nodemailer.createTransport({
    auth: {
        user: process.env.ROBOT_LOGIN,
        pass: process.env.ROBOT_PASSWORD,
    },
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: true,
  });

  return new Promise((res, rej) => {
    transporter.verify(function (error, success) {
      if (error) {
        rej(error.message);
      } else {
        console.log("Mail transporter is ready");
        res(transporter);
      }
    });
  });
}

const transporter = await initMailTransporter();

const port = process.env.PORT || 443;

const options = {
  cert: fs.readFileSync('./ssl/cert.pem'),
  key: fs.readFileSync('./ssl/key.pem'),
};

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));

app.post('/request', async (req, res) => {
  const body = req.body;
  const { name, mail, comment } = body;
  console.log(`Got request with data: name=${name}; mail=${mail}; comment=${comment}`);

  try {
    const result = await transporter.sendMail({
      from: process.env.ROBOT_LOGIN,
      to: process.env.RECIEVERS_LOGINS,
      subject: '[NEW_REQUEST]',
      html:
        `<h3>New request:</h3>
        <ul>
          <li>Name: ${comment}</li>
          <li>Mail: ${mail}</li>
          <li>Comment: ${comment}</li>
        </ul>`,
    });
  
    console.log(`Message sent: name=${name}; mail=${mail}; comment=${comment}`);
    res.sendStatus(200);
  } catch(e) {
    console.log(`Error while sending message: name=${name}; mail=${mail}; comment=${comment}\nError:${e.message}`);
    res.sendStatus(500);
  }
});

https
  .createServer(options, app)
  .listen(port, () => {
  console.log(`Listening on port ${port}`);
});
