import { Router } from 'express';
import { handleCreateTranscription, handleGetTranscriptions } from '../controllers/transcription.controller';
import { handleAzureTranscription } from '../controllers/azure.controller';

const router = Router();

router.post('/transcription', handleCreateTranscription);
router.get('/transcriptions', handleGetTranscriptions);
router.post('/azure-transcription', handleAzureTranscription);

export default router;
