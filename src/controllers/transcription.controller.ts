import { Request, Response } from 'express';
import { createTranscription, getRecentTranscriptions } from '../services/transcription.service';

export async function handleCreateTranscription(req: Request, res: Response) {
    try {
        const { audioUrl } = req.body || {};

        if (!audioUrl) return res.status(400).json({ error: 'audioUrl is required' });

        const result = await createTranscription({ audioUrl });
        return res.status(201).json({ id: result.id });
        // return res.status(201).json(result);
    } catch (err: any) {
        console.error('createTranscription error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function handleGetTranscriptions(req: Request, res: Response) {
    try {
        const docs = await getRecentTranscriptions(30);
        return res.json({ count: docs.length, transcriptions: docs });
    } catch (err: any) {
        console.error('getTranscriptions error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
