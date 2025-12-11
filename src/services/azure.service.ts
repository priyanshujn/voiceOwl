/**
 * Azure Speech service integration (mock)
 */
import { TranscriptionModel } from '../models/transcription.model';
import { retry } from '../utils/retry';
import { AzureTranscriptionRequestBody } from '../types';

async function callAzureSpeechMock(audioUrl: string, language?: string) {
    // return a fake transcription text
    return `azure-transcribed (${language || 'en-US'}) for ${audioUrl}`;
}
export async function azureTranscribe(payload: AzureTranscriptionRequestBody) {
    const { audioUrl, language } = payload;
    // Use retry to call the mocked Azure API
    const transcription = await retry(() => callAzureSpeechMock(audioUrl, language), 2, 300);
    const doc = await TranscriptionModel.create({ audioUrl, transcription, source: 'azure', language, createdAt: new Date() });
    return { id: doc._id.toString(), audioUrl: doc.audioUrl, transcription: doc.transcription, createdAt: doc.createdAt };
}
