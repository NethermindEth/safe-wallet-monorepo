const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Proxy middleware configuration
const apiProxy = createProxyMiddleware({
    target: 'https://safe-ui.surge.wtf',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/cgw', // Rewrite path
    },
    onProxyRes: function (proxyRes, req, res) {
        // Add CORS headers to the proxied response
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    },
    logLevel: 'debug',
});

// Apply the proxy middleware to routes starting with /api
app.use('/api', apiProxy);

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
}); 