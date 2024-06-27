const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/order', async (req, res) => {
  const { cart, userInfo } = req.body;

  // Create a transporter for sending email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'harrachi.yahya0@gmail.com',
      pass: '612yahyaharrachi612',
    },
  });

  // Construct the email content
  const mailOptions = {
    from: 'harrachi.yahya0@gmail.com',
    to: userInfo.email,
    subject: 'Thank you for your order',
    text: `Dear ${userInfo.name},\n\nThank you for your order. Your total is $${cart.reduce((total, item) => total + item.productPrice * item.productQuantity, 0)}.\n\nWe will contact you soon.\n\nBest regards,\nYour Company`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Order processed and email sent.');
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).send('Error processing order.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
