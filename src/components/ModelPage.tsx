"use client"
import React from 'react';
import { Typography, Box, Grid2 as Grid } from "@mui/material";
import ModelCard from "@/components/ModelCard";
import styles from "./ModelPage.module.css";

const render_views = [
  {name: "test1"},
  {name: "test2"},
  {name: "test3"},
  {name: "test4"},
  {name: "test5"},
  {name: "test6"},
  {name: "test7"},
  {name: "test8"},
  {name: "test9"},
  {name: "test10"},
  {name: "test11"},
  {name: "test12"},
  {name: "test13"},
  {name: "test14"},
  {name: "test15"},
]

export default function ModelPage() {  
  // Step 1: Set up state
  const [isVisible, setIsVisible] = React.useState(true);

  // Step 2: Toggle function
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Grid container direction="column" className={styles.main}>
        <Grid className={styles.description}>
          <Typography variant='h6'>Helmet</Typography>
          <Typography variant='h6'>Description</Typography>
          <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
        </Grid>
        <Grid className={styles.selection} container spacing={2}>
          {render_views.map((e,i) => { return <ModelCard key={e.name} name={e.name}/>})}
        </Grid>
      </Grid>
    </>
  )
}
