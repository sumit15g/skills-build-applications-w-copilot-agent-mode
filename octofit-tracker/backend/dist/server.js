import express from 'express';
import { connectDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
const host = '0.0.0.0';
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-${port}.app.github.dev`
        : `http://localhost:${port}`;
};
// Middleware
app.use(express.json());
// CORS configuration
const getCorsOrigin = () => {
    // Check if running in Codespaces
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`;
    }
    // Default for local development
    return 'http://localhost:5173';
};
app.use((request, response, next) => {
    const origin = request.headers.origin;
    const allowedOrigin = getCorsOrigin();
    // Allow the determined origin
    if (origin === allowedOrigin || origin === 'http://localhost:5173') {
        response.setHeader('Access-Control-Allow-Origin', origin || allowedOrigin);
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        response.sendStatus(200);
        return;
    }
    next();
});
// Health check endpoint
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        apiUrl: getApiBaseUrl(),
    });
});
// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
// 404 handler
app.use((_request, response) => {
    response.status(404).json({ error: 'Not found' });
});
// Error handler
app.use((error, _request, response) => {
    console.error('Server error:', error);
    response.status(500).json({ error: 'Internal server error' });
});
// Start the API only after MongoDB is ready so database-backed requests cannot hang during startup.
async function startServer() {
    try {
        await connectDatabase();
        app.listen(port, host, () => {
            console.log(`OctoFit API listening at ${getApiBaseUrl()}`);
            console.log(`Frontend URL: ${getCorsOrigin()}`);
            if (process.env.CODESPACE_NAME) {
                console.log(`Running in Codespace: ${process.env.CODESPACE_NAME}`);
            }
        });
    }
    catch (error) {
        console.error('Error connecting to octofit_db:', error);
        process.exit(1);
    }
}
startServer();
