"use client"
import React from 'react';
import { Typography, Button, Box, Grid2 as Grid } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ModelRenderCard from "@/components/ModelRenderCard"
import styles from "./../ModelPage.module.css";
import CompareIcon from '@mui/icons-material/Compare';
import Link from 'next/link'
import InfoIcon from '@mui/icons-material/Info';
import ModelCard from '../ModelCard';
//import README from "@/data/README.md"

const render_views = [
  {name: "DragonAttenuation", thumbnail: ""},
  {name: "IridescentDishWithOlives", thumbnail: ""},
  {name: "ToyCar", thumbnail: ""}
]

type Props = {
  name: string,
  description: string
}

export default function ModelPage({name}: Props) {  
  // Step 1: Set up state
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const [isVisible, setIsVisible] = React.useState(!isXs); 
  
  // Step 2: Toggle function
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  const description = <Box>
    <Typography variant='h6'>Description</Typography>
    <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
  </Box>;

  return (
    <>
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
          {render_views.map((e,i) => { return <ModelCard key={e.name} thumbnail={e.thumbnail} name={e.name}/>})}
        </Grid>
      </Grid>
    </>
  )
}
