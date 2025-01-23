"use client"
import React from 'react';
import { Typography, Box, Grid2 as Grid } from "@mui/material";
import ModelRenderCard from "@/components/ModelRenderCard"
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import styles from "./ComparePage.module.css";
import InfoIcon from '@mui/icons-material/Info';
import CompareIcon from '@mui/icons-material/Compare';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EngineSelection from './EngineSelection';

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
  
  const [isMagnified, setMagnified] = React.useState(false);
  const [engine1, setEngine1] = React.useState('three.js');
  const [engine2, setEngine2] = React.useState('filament.js');

  return (
    <>
       <Grid container direction="column" className={styles.main} spacing={1}>
        {!isMagnified && <Grid className={styles.description}>
          <Typography variant='h6'>{name}</Typography>
          <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
          <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
        </Grid>}
        {/* Main */}
        <Grid className={styles.tool} container spacing={1}>
          <Box flex={1} sx={{display:'flex', width: "100%", justifyContent: 'space-between'}}>
            {isMagnified && <CloseFullscreenIcon onClick={() => setMagnified(false)} sx={{cursor: "pointer" }} /> }
            {!isMagnified && <OpenInFullIcon onClick={() => setMagnified(true)} sx={{cursor: "pointer" }} /> }
            <CompareIcon />
          </Box>
          <ImageComparisonSlider imgSrc1={"/images/other/babylon-golden.png"} imgSrc2={"/images/other/model-viewer-golden.png"}/>                     
          <Box display='flex' justifyContent='space-between' width='100%'>
            <Box flex={1}><EngineSelection engineName={engine1} engineList={render_views.map(e=> e.name)} handleChange={(name) => { setEngine1(name) }}/></Box>
            <Box flex={1} display='flex' justifyContent='flex-end'><EngineSelection engineName={engine2} engineList={render_views.map(e=> e.name)} handleChange={(name) => { setEngine2(name) }}/></Box>
          </Box>
        </Grid>
        {!isMagnified && <Box className={styles.side} display={{xs:'none', sm:'flex'}} flexDirection='column' justifyContent='flex-start' alignItems='center'>
          {render_views.map((e,i) => { return <ModelRenderCard key={e.name} name={e.name}/>})}
        </Box>}
      </Grid>
    </>
  )
}
