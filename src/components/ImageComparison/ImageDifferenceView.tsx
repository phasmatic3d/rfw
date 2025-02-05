"use client"
import React from 'react'
import { Box } from "@mui/material";

// Load the images
const loadImage = (src: string) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = '';
    img.onload = () => resolve(img);
  }
);

export type ImageComparisonSliderProps = {
  imgSrc1: string,
  imgSrc2: string
}

export default function ImageDifferenceView({imgSrc1, imgSrc2}: ImageComparisonSliderProps) {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(canvasRef == null || canvasRef.current == null) { return; }
    if(canvasContainerRef == null || canvasContainerRef.current == null) { return; }
    
    const canvas = canvasRef.current;
    const canvasContainer = canvasContainerRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const vhToPixels = (vh: number) => (vh * window.innerHeight) / 100;
    const vwToPixels = (vw: number) => (vw * window.innerWidth) / 100;

    const processImages = async () => {
      
      const [img1, img2] = await Promise.all([loadImage(imgSrc1), loadImage(imgSrc2)]) as HTMLImageElement[];

      const width = img1.width;
      const height = img1.height;
      const ar = width / height;
      
      const drawCanvas = () => {      
        //context.putImageData(img1Data, 0, 0, 0, 0, canvas.width, canvas.height);
      }
  
      const resizeObserver = new ResizeObserver(() => {
        if (canvasContainer.clientWidth == 0 || canvasContainer.clientHeight == 0) return;
        if ( canvas.style.width === `${canvasContainer.clientWidth}px` ) return;
          canvas.width = canvasContainer.clientWidth; // Update the actual width
          canvas.height = canvasContainer.clientWidth; // Update the actual height
          
          console.log("Style", canvas.style.width, canvas.style.height);
          console.log("Client", canvas.clientWidth, canvas.clientHeight);
          //console.log("Canvas", canvas.width, canvas.height);

          canvas.style.width = `${canvasContainer.clientWidth}px`;
          canvas.style.height = `${canvasContainer.clientWidth}px`;
          //canvas.style.maxHeight = `${vhToPixels(70)}px`;
          //canvas.style.maxWidth = `${vhToPixels(70)}px`;

          const maxWidth = canvas.width;  // Set max width
          const maxHeight = vhToPixels(70);//canvas.height; // Set max height
  
          // Create a temporary canvas to resize the image
          const tempCanvas = document.createElement("canvas");
          const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
          
          // Calculate new dimensions while maintaining aspect ratio
          let width = img1.width;
          let height = img1.height;
          const aspectRatio = width / height;
          if(width > maxWidth)
          {
            width = maxWidth;
            height = maxWidth / aspectRatio;
          }
          if(height > maxHeight)
          {
            height = maxHeight;
            width = maxHeight * aspectRatio;
          }

          canvas.width = width;
          canvas.height = height;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
  
          // Resize the image on the temporary canvas
          tempCanvas.width = width;
          tempCanvas.height = height;
          tempCtx.drawImage(img1, 0, 0, width, height);
          const img1Data = tempCtx.getImageData(0, 0, width, height);
          tempCtx.drawImage(img2, 0, 0, width, height);
          const img2Data = tempCtx.getImageData(0, 0, width, height);
  
          const factor = 10;

          // Compute the difference
          const diffData = context.createImageData(width, height);
          for (let i = 0; i < img1Data.data.length; i += 4) {
            diffData.data[i] = Math.min(255, Math.abs(img1Data.data[i] - img2Data.data[i]) * factor); // Red
            diffData.data[i + 1] = Math.min(255, Math.abs(img1Data.data[i + 1] - img2Data.data[i + 1]) * factor); // Green
            diffData.data[i + 2] = Math.min(255, Math.abs(img1Data.data[i + 2] - img2Data.data[i + 2]) * factor); // Blue
            diffData.data[i + 3] = 255; // Alpha
          }
          context.putImageData(diffData, 0, 0);
      });
        
      // Observe the canvas
      resizeObserver.observe(canvasContainer);
      console.log(resizeObserver)
    }

    processImages();
  }, [imgSrc1, imgSrc2]);
  
    return (
      <Box ref={canvasContainerRef} width='100%' sx={{textAlign: "center", margin: "auto", width: "100%"}}>
        <canvas ref={canvasRef}/>
      </Box>
    );
};
