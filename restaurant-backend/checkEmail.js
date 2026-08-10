const transporter = require('./config/email');
console.log('EMAIL_USER=', process.env.EMAIL_USER);
transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'Backend Email Test',
  text: 'This is a direct test email from the reservation backend.'
}, (err, info) => {
  if (err) {
    console.error('SEND ERROR');
    console.error(err);
    process.exit(1);
  }
  console.log('SEND SUCCESS');
  console.log(info.response);
  process.exit(0);
});
