
# VoiceOwl - Backend Developer Task

## Node.js + TypeScript + Express + MongoDB + Mongoose


# Project Structure

src/
    - config/          # DB connection
    - controllers/     # Request handlers
    - models/          # Mongoose schemas (DB table schema)
    - routes/          # API routes
    - services/        # Business logic
    - types/           # Interfaces
    - utils/           # Helpers (downloader, retry, azure mocks)
    - app.ts           # Express APP initialization
    - index.ts         # Application entry point


# Installation & Setup

## 1. Install dependencies

### npm install

## 2. Environment Variables

### PORT=3000
### MONGODB_URI=mongodb://localhost:27017/voiceowl_dev

### update values as per the availabile resources

## 3. Run in development mode
### npm run dev


## 4. Build & run in production

### npm run build
### npm start


# API Endpoints

## POST /api/transcription
Creates a mock transcription.

### Curl Request:
curl -X POST http://localhost:3000/api/transcription \
     -H "Content-Type: application/json" \
     -d '{
            "audioUrl": "https://voiceowl.com/audio/sample1.mp3",
            "language": "en-US"
        }'


## GET /api/transcriptions
Fetches transcriptions from the last 30 days.

### Curl Request:
curl -X GET http://localhost:3000/api/transcriptions


## POST /api/azure-transcription
Creates a transcription using Azure Speech-to-Text (mocked).

### Curl Request:
curl -X POST http://localhost:3000/api/azure-transcription \
     -H "Content-Type: application/json" \
     -d '{
            "audioUrl": "https://voiceowl.com/audio/english.mp3",
            "language": "en-US"
        }'



# Database Indexing
Added a single field index on createdAt column. As GET API fetches the transcriptions from last 30 days, this index will speed up the API execution.



## for 100M+ records
-> We can create 
    - TTL indexes if old entries can expire
    - compound indexs if filtering by multiple fields { createdAt: 1, source: 1 }
-> We can use sharding (e.g. on _id or createdAt)



# Scalability

We have many ways to optimise the system to handle 10k+ concurrent request.

## Move transcription to a Queue (Most needed)
Instead of doing transcription synchronously inside the API request:

### New workflow:
    -> User calls POST /transcription
    -> API validates input and pushes a job into a queue (Redis/RabbitMQ)
    -> API immediately returns a jobId
    -> Background worker service:
        -> Downloads audio
        -> Calls Azure STT (or mock)
        -> Saves result to MongoDB
    -> User polls /status/:jobId or receives WebSocket updates

## Advantages:
    -> API becomes extremely fast
    -> Heavy processing is offloaded to workers
    -> Workers can be scaled independently
    -> Prevents Node.js event-loop blocking
    
This design alone allows the system to scale from hundreds to tens of thousands of concurrent requests.


## Horizontal Scaling of API Servers
Use a load balancer + multiple Node.js instances

## MangoDB Scalability
Database indexing, sharding, connection pooling.

## Caching Layer (Redis)
Cache common read endpoints. It can dramatically reduces DB load under high concurrency.

# Observability: Logging, Metrics, Alerts
To maintain performance at 10k+ concurrency:
    -> Structured logs (Winston)
    -> Metrics (Prometheus)
    -> Dashboards (Grafana)
    -> Alerts on:
        - DB latency
        - Error spikes
        - Worker crash loops


# Summary

This project demonstrates:
    - Clean API design
    - SOLID backend structure
    - MongoDB modeling & indexing
    - Scalable architecture thinking
    - Cloud-ready deployment patterns
    - Azure STT integration strategy
    