"use client"
import React from 'react'
import { Box } from "@mui/material";

export type ImageComparisonSliderProps = {
    imgA: string,
    imgB: string
}

const ImageComparison2 = ({imgA, imgB}: ImageComparisonSliderProps) => {
    const [sliderPosition, setSliderPosition] = React.useState(50); // Initial slider position (50%)
    const containerRef = React.useRef<HTMLDivElement>(null);
  
    const handleDrag = (clientX : number) => {
      const container = containerRef.current;
      if (!container) return;
  
      // Get the bounds of the container
      const rect = container.getBoundingClientRect();
      const offsetX = clientX - rect.left; // Mouse position relative to the container
      const newSliderPosition = (offsetX / rect.width) * 100;
  
      // Clamp the value between 0 and 100
      if (newSliderPosition >= 0 && newSliderPosition <= 100) {
        setSliderPosition(newSliderPosition);
      }
    };
  
    const handleMouseDown = (event: React.MouseEvent) => {
      event.preventDefault();
      const onMouseMove = (e: MouseEvent) => handleDrag(e.clientX);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMouseMove);
      });
    };
    const handleTouchStart = (event: React.TouchEvent) => {
        event.preventDefault();
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches && e.touches[0]) {
              handleDrag(e.touches[0].clientX);
            }
        };
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", () => {
          document.removeEventListener("touchmove", onTouchMove);
        });
      };
  
    return (
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          background: "red",
          width: "80vw",
          height: "40vh",
          overflow: "hidden",
          cursor: "pointer",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Background Image */}
        <img
          src={imgA}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
  
        {/* Foreground Image */}
        <img
          src={imgB}
          alt="Foreground"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, // Adjust visible area
          }}
        />
  
        {/* Slider */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: `${sliderPosition}%`,
            transform: "translateX(-50%)",
            width: "3px",
            height: "100%",
            backgroundColor: "white",
            pointerEvents: "none", // Avoid slider intercepting mouse events
          }}
        />
  
        {/* Drag Handle */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: `${sliderPosition}%`,
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            backgroundColor: "white",
            borderRadius: "50%",
            border: "2px solid black",
            zIndex: 11,
            pointerEvents: "none", // Avoid drag handle intercepting mouse events
          }}
        />
      </Box>
    );
  };


  export default ImageComparison2;