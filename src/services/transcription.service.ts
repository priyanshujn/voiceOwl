import { TranscriptionModel } from '../models/transcription.model';
import { mockDownloadAudio } from '../utils/downloader';
import { retry } from '../utils/retry';
import { TranscriptionRequestBody } from '../types';

export async function createTranscription(payload: TranscriptionRequestBody) {
    const { audioUrl } = payload;

    // download with retries
    const buffer = await retry(() => mockDownloadAudio(audioUrl), 3, 200);

    const transcription = `transcribed text for ${audioUrl} (size=${buffer.length})`;

    const doc = await TranscriptionModel.create({ audioUrl, transcription, source: 'mock' });
    return { id: doc._id.toString(), audioUrl: doc.audioUrl, transcription: doc.transcription, createdAt: doc.createdAt };
}

export async function getRecentTranscriptions(days = 30) {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const docs = await TranscriptionModel.find({ createdAt: { $gte: cutoff } }).sort({ createdAt: -1 }).limit(1000).lean();
    return docs;
}
