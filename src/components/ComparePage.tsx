"use client"
import React from 'react';
import { Typography, Box, Grid2 as Grid } from "@mui/material";
import ModelRenderCard from "@/components/ModelRenderCard"
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import styles from "./ComparePage.module.css";
import InfoIcon from '@mui/icons-material/Info';

const render_views = [
  {name: "three.js"},
  {name: "filament.js"},
  {name: "babylon.js"},
  {name: "gltf-sample-viewer"},
  {name: "three-gpu-pathtracer"},
  {name: "Dassault STELLAR"},
  {name: "Chaos Group V-Ray"},
  {name: "Blender Cycles"},
]

type ComparePageProps = {
  name: string,
  description: string
}

export default function ComparePage({name}: ComparePageProps) {  
  // Step 1: Set up state
  const [isDescriptionVisible, setDescriptionVisible] = React.useState(true); 
  const [isSelectionVisible, setSelectionVisible] = React.useState(true); 
  const [width, setWidth] = React.useState(60); // Default width of 200px

  // Step 2: Toggle function
  const toggleDescription = () => {
    //setWidth(100);
    setDescriptionVisible(!isDescriptionVisible);
  };
  const toggleSelection = () => {
    //setWidth(100);
    setSelectionVisible(!isSelectionVisible);
  };

  return (
    <>
       <Grid container direction="column" className={styles.main}>
        {isDescriptionVisible && <Grid className={styles.description}>
          <Typography variant='h6'>{name}</Typography>
          <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
          <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
        </Grid>}
        <Grid className={styles.tool} sx={{width: `${width}%`}} container spacing={1}>
          <Box flex={1} sx={{display:'flex', width: "100%", justifyContent: 'space-between'}}>
            <InfoIcon onClick={toggleDescription} sx={{cursor: "pointer" }} />
            <Typography>Compaing {name}</Typography>
            <InfoIcon onClick={toggleSelection}  sx={{cursor: "pointer"}} />
          </Box>

          <ImageComparisonSlider imgSrc1={"/thumbnails/original.thumb.webp"} imgSrc2={"/thumbnails/image.jpeg"}/>                        
        </Grid>
        {isSelectionVisible && <Grid className={styles.side} sx={{overflow: "auto"}} container spacing={2}>
          {render_views.map((e,i) => { return <ModelRenderCard key={e.name} name={e.name}/>})}
        </Grid>}
      </Grid>
    </>
  )
}
