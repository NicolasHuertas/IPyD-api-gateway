const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port =  8005;

app.use('/reservations', createProxyMiddleware({ 
    target: 'http://combined-reservations:8420', 
    changeOrigin: true,
    pathRewrite: {
      '^/reservations': 'reservations'
    }
}));

app.use('/hotels', createProxyMiddleware({ 
  target: 'http://hotel-reservations:3000', 
  changeOrigin: true,
  pathRewrite: {
    '^/hotels': 'api/reservations'
  }
}));

app.use('/seats', createProxyMiddleware({
  target: 'http://flight-reservations:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/seats': 'api/reservations'
  }
}));

app.use('/flights', createProxyMiddleware({
  target: 'http://flight-reservations:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/flights': 'api/flights'
  }
}));

app.listen(port, () => {
   console.log(`Api Gateway service listening at http://127.0.0.1:${port}`)
})
