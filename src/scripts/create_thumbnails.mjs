import fs from 'fs';
import path from 'path';
import { Worker } from 'worker_threads';
import sharp from 'sharp';

// Function to run a task in a worker
function runWorker(filePath, workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filePath, { workerData });

    worker.on('message', resolve);  // Resolve the promise with the worker's result
    worker.on('error', reject);    // Reject the promise if the worker encounters an error
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Main function to start multiple workers
async function runTasks() {
  const tasks = [1, 2, 3, 4, 5]; // Example tasks
  const workers = tasks.map((task) =>
    runWorker('./src/scripts/thumbnail_worker.mjs', task)
  );

  const results = await Promise.all(workers);
  console.log('All results:', results);
}

runTasks().catch((err) => console.error(err));

/*await sharp('./public/original.jpeg')
  .resize(4)
  .jpeg({ mozjpeg: true })
  //.toBuffer()
  .toFile('./public/thumbnails/image.jpeg', (err, info) => {
    if (err) {
      console.log('Error processing image:', err);
    } else {
      console.log('Image successfully saved:', info);
    }
  });*/

  try {
    fs.mkdirSync('./public/thumbnails2', { recursive: true });
    console.log('Directory created successfully!');
  } catch (err) {
    console.error('Error creating directory:', err);
  }

/*
try {
  fs.mkdirSync('./public/thumbnails', { recursive: true });
  console.log('Directory created successfully!');
} catch (err) {
  console.error('Error creating directory:', err);
}

try {
  const directoryPath = './public/images';
  const files = fs.readdirSync(directoryPath);
  console.log('Files in the directory:', files);
  files.forEach(file => {
    const filePath = path.join(directoryPath, file);  // Get the full path of each item
    const stats = fs.statSync(filePath);  // Get file or directory stats

    if (stats.isDirectory()) {
      console.log(`${file} is a directory.`);
    } else if (stats.isFile()) {
      console.log(`${file} is a file.`);
    }
  });
} catch (err) {
  console.error('Error reading the directory:', err);
}*/
/*
await sharp('./public/original.jpeg')
  .resize(4)
  .jpeg({ mozjpeg: true })
  //.toBuffer()
  .toFile('./public/thumbnails/image.jpeg', (err, info) => {
    if (err) {
      console.log('Error processing image:', err);
    } else {
      console.log('Image successfully saved:', info);
    }
  });
 */
