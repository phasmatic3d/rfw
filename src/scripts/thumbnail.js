//const fs = require('fs');
//const path = require('path');
//const sharp = require("sharp");

console.log("Hello World")

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
