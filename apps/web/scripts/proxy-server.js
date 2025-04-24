// Simple proxy server to bypass CORS issues
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Proxy middleware configuration
const apiProxy = createProxyMiddleware({
    target: 'https://safe-ui.surge.wtf',
    changeOrigin: true,
    pathRewrite: {
        '^/api/cgw': '/cgw', // rewrite path
    },
    onProxyRes: (proxyRes) => {
        // Add CORS headers to the proxy response
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    },
});

// Apply the proxy middleware to all paths starting with /api/cgw
app.use('/api/cgw', apiProxy);

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
    console.log(`Proxying requests from http://localhost:${PORT}/api/cgw to https://safe-ui.surge.wtf/cgw`);
}); 