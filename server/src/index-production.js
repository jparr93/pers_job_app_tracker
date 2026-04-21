import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import authRoutes from './routes/auth.js';
import jobsRoutes from './routes/jobs.js';
import { initDatabase } from './database/init.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initDatabase();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from client build in production
const clientPath = join(__dirname, '../../client/dist');
app.use(express.static(clientPath));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(join(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
