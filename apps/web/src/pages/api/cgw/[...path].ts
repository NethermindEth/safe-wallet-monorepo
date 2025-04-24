import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * This is a simple proxy server to bypass CORS issues with the Safe Gateway API
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get the path from the URL
    const { path } = req.query

    // Build the target URL
    const targetUrl = `https://safe-ui.surge.wtf/cgw/${Array.isArray(path) ? path.join('/') : path}`

    try {
        // Prepare headers to forward
        const headers: HeadersInit = {}

        // Forward only necessary headers, omitting those that might cause CORS issues
        for (const [key, value] of Object.entries(req.headers)) {
            if (
                value !== undefined &&
                !['host', 'origin', 'referer'].includes(key.toLowerCase())
            ) {
                headers[key] = value as string
            }
        }

        // Forward the request to the target URL
        const response = await fetch(targetUrl, {
            method: req.method,
            headers,
            body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
        })

        // Get the response data
        const data = await response.text()

        // Set the appropriate status and headers for the response
        res.status(response.status)

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

        // Forward necessary response headers
        for (const [key, value] of response.headers.entries()) {
            if (!['content-length', 'connection', 'content-encoding'].includes(key.toLowerCase())) {
                res.setHeader(key, value)
            }
        }

        // Send the response
        res.send(data)
    } catch (error) {
        console.error('Proxy error:', error)
        res.status(500).json({ error: 'Proxy server error' })
    }
}

// Handle OPTIONS requests for CORS preflight
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
        externalResolver: true,
    },
} 