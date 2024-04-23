// reroute.js
import { createProxyMiddleware } from 'http-proxy-middleware';

const routeMappings = {
    '/': 'https://erozgaar.azurewebsites.net/getAllJobs',
    '/login': 'https://erozgaar.azurewebsites.net/login',
    '/regWorker': 'https://erozgaar.azurewebsites.net/regWorker',
    '/getAllJobs': 'https://erozgaar.azurewebsites.net/getAllJobs'
};

export default async function reroute(req, res) {
    const { method, url } = req;
    
    const route = Object.keys(routeMappings).find(r => url.startsWith(r));
    if (!route) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
    }

    const destination = routeMappings[route];
    
    const proxy = createProxyMiddleware({
        target: destination,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: '',
        },
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*"
        }
    });

    if (method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
    } else {
        await new Promise((resolve, reject) => {
            proxy(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
