import express from 'express';
import userRoutes from './routes/user.routes.js';
import { logger } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    });
    
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'User Management API'
    });
});

// API Routes
app.use('/api/users', userRoutes);

// API documentation
app.get('/', (req, res) => {
    res.json({
        name: 'User Management API',
        version: '1.0.0',
        description: "A starter template for building a User Management API using  Express.js and Postgres with the MantaHQ JS SDK.",
        endpoints: {
            users: {
                create: {
                    method: 'POST',
                    path: '/api/users',
                    description: 'Create a new user',
                    body: {
                        name: 'string (required)',
                        email: 'string (required)',
                        age: 'number (optional)'
                    }
                },
                getAll: {
                    method: 'GET',
                    path: '/api/users',
                    description: 'Get all users',
                    query: {
                        minAge: 'number (optional)',
                        maxAge: 'number (optional)'
                    }
                }
            },
            health: {
                method: 'GET',
                path: '/health',
                description: 'Check API health status'
            }
        }
    });
});

// 404 handler - FIXED: Use regex or function
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.originalUrl
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
    console.log(`
╔════════════════════════════════════════════╗
║    🚀 User Management API                 ║
║    Port: ${PORT}                           ║
║    Mode: Development                        ║
╚════════════════════════════════════════════╝

📡 Available Endpoints:
   GET    /                 - API Documentation
   GET    /health          - Health Check
   POST   /api/users       - Create user
   GET    /api/users       - Get all users

📝 Example Usage:
   curl -X POST http://localhost:${PORT}/api/users \\
        -H "Content-Type: application/json" \\
        -d '{"name":"John Doe","email":"john@example.com"}'

   curl "http://localhost:${PORT}/api/users?minAge=20&maxAge=30"
    `);
});