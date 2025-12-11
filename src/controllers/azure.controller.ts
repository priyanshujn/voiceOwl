import { Request, Response } from 'express';
import { azureTranscribe } from '../services/azure.service';

export async function handleAzureTranscription(req: Request, res: Response) {
    try {
        const { audioUrl } = req.body || {};

        if (!audioUrl) return res.status(400).json({ error: 'audioUrl is required' });

        const result = await azureTranscribe({ audioUrl });
        return res.status(201).json({ id: result.id });
    } catch (err: any) {
        console.error('azureTranscription error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
