export interface TranscriptionRecord {
    _id?: string;
    audioUrl: string;
    transcription: string;
    createdAt?: Date;
    source?: string;
}

export interface TranscriptionRequestBody {
    audioUrl: string;
}

export interface AzureTranscriptionRequestBody {
    audioUrl: string;
    language?: string; // e.g., en-US
}