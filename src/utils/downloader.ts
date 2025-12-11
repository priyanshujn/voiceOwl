/**
 * Mock downloader
 */
export async function mockDownloadAudio(audioUrl: string): Promise<Buffer> {
    // simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // simulating an error for certain URLs -- failure case
    if (audioUrl.includes('fail')) {
        throw new Error('Simulated persistent download error');
    }

    // return dummy audio data as Buffer
    const dummy = `AUDIO-DATA-FROM:${audioUrl}`;
    return Buffer.from(dummy);
}
