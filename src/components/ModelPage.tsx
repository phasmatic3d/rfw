"use client"
import React from 'react';
import { Typography, Button, Box, Grid2 as Grid } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ModelRenderCard from "@/components/ModelRenderCard"
import styles from "./ModelPage.module.css";
import CompareIcon from '@mui/icons-material/Compare';
import Link from 'next/link'
import InfoIcon from '@mui/icons-material/Info';
//import README from "@/data/README.md"

const render_views = [
  {name: "three.js"},
  {name: "filament.js"},
  {name: "babylon.js"},
  {name: "gltf-sample-viewer"},
  {name: "three-gpu-pathtracer"},
  {name: "Dassault STELLAR"},
  {name: "Chaos Group V-Ray"},
  {name: "Blender Cycles"},
  {name: "test9"},
  {name: "test10"},
  {name: "test11"},
  {name: "test12"},
  {name: "test13"},
  {name: "test14"},
  {name: "test15"},
]

type ModelPageProps = {
  name: string,
  description: string
}

export default function ModelPage({name}: ModelPageProps) {  
  // Step 1: Set up state
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const [isVisible, setIsVisible] = React.useState(!isXs); 
  const [engineA, setEngineA] = React.useState(""); 
  const [engineB, setEngineB] = React.useState(""); 
  const [nextEngine, setNextEngine] = React.useState(0); 
  
  // Step 2: Toggle function
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  const toggleSelection = (engine: string) => {
    if (engineA === engine) {
      setEngineA("");
      setNextEngine(0);
      return;
    } else if (engineB === engine) {
      setEngineB("");
      setNextEngine(1);
      return;
    }

    if (nextEngine === 0 ) {
      setEngineA(engine);
      setNextEngine(1);
    } else  {
      setEngineB(engine);
      setNextEngine(0);
    }
  };

  const count = Number(engineA === "") + Number(engineB === "");
  
  const description = <Box>
    <Typography variant='h6'>Description</Typography>
    <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
  </Box>;

  return (
    <>
      <Button
        sx={{position:"fixed", height: "50px", zIndex:1,  right: "4vw", bottom: "10vh"}}
        component={Link}
        role={undefined}
        variant="contained"
        tabIndex={-1}
        href={`/compare/${name}?engine1=${engineA}&engine2=${engineB}`}
        startIcon={<CompareIcon />}
      > {(count == 0) ? "compare" : `select ${count} image(s) to compare`} </Button>
      <Grid container direction="column" className={styles.main}>
        <Box sx={{overflow: "auto"}} className={styles.description}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" }}> 
            <Typography variant='h6'>{name}</Typography>
            <Box onClick={toggleDiv} display={{ xs: 'inline-block', sm: 'none' }}>
              <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                {isXs && <InfoIcon />}
              </Box>
            </Box>
          </Box>
          {(!isXs) && description}
          {(isXs && isVisible) && description}
        </Box>
        <Grid className={styles.selection} sx={{overflow: "auto"}} container spacing={2}>
          {render_views.map((e,i) => { return <ModelRenderCard key={e.name} name={e.name} marked={(engineA === e.name || engineB === e.name)} onSelection={toggleSelection}/>})}
        </Grid>
      </Grid>
    </>
  )
}
