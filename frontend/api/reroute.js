// reroute.js
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

app.use(cors());

// Define routes and corresponding destination URLs
const routeMappings = {
    '/': 'https://erozgaar.azurewebsites.net/getAllJobs',
    '/login': 'https://erozgaar.azurewebsites.net/login',
    '/regWorker': 'https://erozgaar.azurewebsites.net/regWorker',
    '/getAllJobs': 'https://erozgaar.azurewebsites.net/getAllJobs'
};

// Create proxy middleware for each route mapping
Object.entries(routeMappings).forEach(([route, destination]) => {
    app.use(route, createProxyMiddleware({
        target: destination,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: '', // Remove route prefix from destination URL
        },
    }));
});

// Catch-all route for unmatched routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default async function (req, res) {
    await app(req, res);
}