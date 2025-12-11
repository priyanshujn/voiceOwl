import dotenv from 'dotenv';
import { createApp } from './app';
import { connectDB } from './config/db';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

async function start() {
    await connectDB();
    const app = createApp();

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
