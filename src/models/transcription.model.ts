import mongoose, { Schema, Document } from 'mongoose';

export interface Transcription extends Document {
    audioUrl: string;
    transcription: string;
    createdAt: Date;
    source?: string;
    language?: string;
}

const TranscriptionSchema: Schema = new Schema({
    audioUrl: { type: String, required: true, index: true },
    transcription: { type: String, required: true },
    source: { type: String, default: 'mock' },
    language: { type: String },
    createdAt: { type: Date, default: () => new Date(), index: true }
});

export const TranscriptionModel = mongoose.model<Transcription>('Transcription', TranscriptionSchema);
