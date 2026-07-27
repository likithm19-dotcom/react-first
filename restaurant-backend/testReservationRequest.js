const http = require('http');
const data = JSON.stringify({
  name: 'Test',
  email: 'test@example.com',
  phone: '1234567890',
  date: '2026-07-30',
  time: '18:00',
  guests: '4',
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/reservations',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  console.log('HEADERS', res.headers);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('BODY', body);
  });
});

req.on('error', (e) => {
  console.error('REQUEST ERROR', e.message);
});

req.write(data);
req.end();
