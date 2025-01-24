"use client"
import React from 'react'
import { Box } from "@mui/material";

export type ImageComparisonSliderProps = {
  imgSrc1: string,
  imgSrc2: string
}

export default function ImageDifferenceView({imgSrc1, imgSrc2}: ImageComparisonSliderProps) {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {

    if(canvasRef == null || canvasRef.current == null) { return; }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const processImages = async () => {

      // Load the images
      const loadImage = (src: string) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.crossOrigin = '';
          img.onload = () => resolve(img);
        }
      );
      const [img1, img2] = await Promise.all([loadImage(imgSrc1), loadImage(imgSrc2)]) as HTMLImageElement[];

      //const width = img1.width;
      //const height = img1.height;

      const parent = canvas.parentNode as ParentNode;
      const { width } = parent.getBoundingClientRect(); 

      const imgWidth = img1.width;
      const imgHeight = img1.height;

      const height = (imgHeight / imgWidth) * width; 
      
      console.log({width, height});

      // Set canvas size to match parent size
      canvas.width = width;
      canvas.height = height;

      // Set canvas size to match the images
      //canvas.width = img1.width;
      //canvas.height = img1.height;

      // Draw images onto the canvas
      context.drawImage(img1, 0, 0, width, height);
      const img1Data = context.getImageData(0, 0, width, height);
      context.drawImage(img2, 0, 0, width, height);
      const img2Data = context.getImageData(0, 0, width, height);

      const factor = 10;

      // Compute the difference
      const diffData = context.createImageData(width, height);
      for (let i = 0; i < img1Data.data.length; i += 4) {
        diffData.data[i] = Math.min(255, Math.abs(img1Data.data[i] - img2Data.data[i]) * factor); // Red
        diffData.data[i + 1] = Math.min(255, Math.abs(img1Data.data[i + 1] - img2Data.data[i + 1]) * factor); // Green
        diffData.data[i + 2] = Math.min(255, Math.abs(img1Data.data[i + 2] - img2Data.data[i + 2]) * factor); // Blue
        diffData.data[i + 3] = 255; // Alpha
      }

      // Draw the difference on the canvas
      context.putImageData(diffData, 0, 0);
    }

    processImages();
  }, [imgSrc1, imgSrc2]);
  
    return (
      <Box width='100%' height='100%' position='relative'>
        <canvas ref={canvasRef} width='200px' height='200px'/>
      </Box>
    );
};
