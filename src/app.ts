import express from 'express';
import bodyParser from 'body-parser';
import transcriptionRoutes from './routes/transcription.route';

export function createApp() {
    const app = express();
    app.use(bodyParser.json({ limit: '2mb' }));

    app.use('/api', transcriptionRoutes);

    app.get('/health', (req, res) => res.json({ status: 'ok' }));

    app.use((err: any, req: any, res: any, next: any) => {
        console.error('Unhandled error:', err);
        res.status(500).json({ error: 'Unhandled server error' });
    });

    return app;
}