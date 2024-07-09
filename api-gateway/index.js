const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port =  8005;

app.use('/reservations', createProxyMiddleware({ 
    target: 'http://combined-reservations:8420', 
    changeOrigin: true,
    pathRewrite: {
      '^/reservations': 'reservations/'
    }
}));

app.use('/hotels', createProxyMiddleware({ 
  target: 'http://hotel-reservations:3000', 
  changeOrigin: true,
  pathRewrite: {
    '^/hotels': 'reservations/api/reservations'
  }
}));

app.listen(port, () => {
   console.log(`Api Gateway service listening at http://127.0.0.1:${port}`)
})
