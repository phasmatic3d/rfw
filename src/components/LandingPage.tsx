"use client"
import React from 'react'
import { Box, Chip, Typography, Grid2 as Grid, useMediaQuery } from "@mui/material";
import Search from "@/components/Search";
import ModelCard from "@/components/ModelCard";
import tagsFile from "@/data/tags.json"
import styles from "./LandingPage.module.css";

type ModelType = {
  name: string
}

type LandingPageProps = {
  models: Array<ModelType>
}

const tags = tagsFile.tags.map(t => {return {name: t, selected: false, index: 0}}).sort((a, b) => b.name.length - a.name.length);

export default function LandingPage({models}: LandingPageProps) {

  const [selectedTags, setSelectedTags] = React.useState(tags);
  const scrollWrapperRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  const handleSearchValueChange = (e:string) => {
    setSearchValue(e);
  }

  const handleHorizontalScrolling = (event: WheelEvent) => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollLeft += event.deltaY/3;
      // Prevent vertical scrolling
      event.preventDefault();
    }
  };

  React.useEffect(() => {
    if(scrollWrapperRef && scrollWrapperRef.current) { 
      scrollWrapperRef.current.addEventListener('wheel', handleHorizontalScrolling, {passive: false});
    }
  }, []);

  const handleChipDelete = (tag: {name: string, selected: boolean}) => {
    console.log("Delete", tag);
    setSelectedTags(prevItems => {
      const item = prevItems.find(e => e.name == tag.name);
      if(item)
      {
        item.selected = false;
      }
      console.log([...prevItems])
      return [...prevItems]
    })
  }
  const handleChipSelection = (tag: {name: string, selected: boolean}) => {
    console.log("Add", tag);
    setSelectedTags(prevItems => {
      const item = prevItems.find(e => e.name == tag.name);
      if(item)
      {
        item.selected = true;
      }
      console.log([...prevItems])
      return [...prevItems]
    })
  }

  const boxChip = (
    <Box ref={scrollWrapperRef} className={styles.chip_container}
            sx={{
              display: "flex",
              gap: 1,
              p: 1,
              overflowX: "auto",
              overflowY: "hidden",
              justifyContent: "flex-start",
              width: '100%',
              maxHeight: "96px",
              "&::-webkit-scrollbar": { height: 8, width: 8 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#aaa",
                borderRadius: 4,
              },
              alignItems: "flex-start", // Align chips to the top for better appearance
            }}
          >
            {selectedTags.map((t,i) => {return (<Chip key={t.name} sx={{fontWeight: 'bold'}} label={t.name} color={t.selected? "success" : "default"} clickable onClick={() => handleChipSelection(t)} onDelete={t.selected? () => handleChipDelete(t) : undefined}/>)})}
          </Box>
  )

  return (
    <>
        <Box display='flex' flexDirection='column' alignItems='center' gap={2} >
          <Box>
            <Search searchValueChange={handleSearchValueChange}/>
          </Box>
          {boxChip}
        </Box>

        <Typography sx={{textAlign:'justify'}}>
            The purpose of glTF is to standardize Physically-Based Rendering (PBR) materials such that you 
            can be confident your model will appear as intended in any lighting environment in any renderer. 
            This is a very ambitious goal, as real-time rendering at this level of quality is still very much 
            an area of active research with improvements being made constantly. This site demonstrates where 
            we are on that path to convergence and highlights areas that could still use improvement. 
            We are comparing the most popular real-time web renderers as well as path tracers 
            (a rendering technique that uses far fewer approximations than are required by real-time renderers).
        </Typography>

        {/* Components */}
        <Grid container spacing={2} sx={{ justifyContent: "space-evenly"}}>
        {/*Object.entries(models).filter((e,i) => searchValue.length <= i).map((e,i) => { return <ModelCard key={e.name} name={e.name}/>})*/}
        {Object.values(models).map((e,i) => { return <ModelCard key={e.name} name={e.name}/>})}
        </Grid>                        
    </>
  );
}
