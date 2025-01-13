import { parentPort, workerData } from 'worker_threads';

// Simulate a time-consuming task
const result = workerData * 2; // Example task: double the input
parentPort.postMessage(result); // Send the result back to the main thread