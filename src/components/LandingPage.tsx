"use client"
import React from 'react'
import { Box, Chip, Typography, Grid2 as Grid, useMediaQuery } from "@mui/material";
import Search from "@/components/Search";
import Fuse from 'fuse.js'
import ModelCard from "@/components/ModelCard";
import tagsFile from "@/data/tags.json"
import styles from "./LandingPage.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import Image from 'next/image'
import { basePath } from '@/lib/paths';

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
  const [tagsExpanded, setTagsExpanded] = React.useState(false);

  const tags2 = [tags[0], tags[1], tags[2]];

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

  const accordionChips = (
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      {tags2.map((t,i) => {return (<Chip key={t.name} sx={{fontWeight: 'bold'}} label={t.name} color={t.selected? "success" : "default"} clickable onClick={() => handleChipSelection(t)} onDelete={t.selected? () => handleChipDelete(t) : undefined}/>)})}

    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      {selectedTags.map((t,i) => {return (<Chip key={t.name} sx={{fontWeight: 'bold'}} label={t.name} color={t.selected? "success" : "default"} clickable onClick={() => handleChipSelection(t)} onDelete={t.selected? () => handleChipDelete(t) : undefined}/>)})}
      </Typography>
    </AccordionDetails>
  </Accordion>
  )
  const otherChips = (
    <Box display={"flex"} flexWrap={"wrap"} flexDirection={"row-reverse"} height={tagsExpanded ? "100%" : 37} justifyContent={"flex-end"} style={{overflow: "hidden" }}>
      <Box display={"flex"} alignItems={"center"} sx={{position: "relative"}}>
        <ExpandMoreIcon onClick={() => setTagsExpanded(!tagsExpanded)} style={{/*position: "absolute", right: 0*/}} />
      </Box>
      {selectedTags.map((t,i) => {return (<Chip key={t.name} sx={{margin: "5px 5px", fontWeight: 'bold'}} label={t.name} color={t.selected? "success" : "default"} clickable onClick={() => handleChipSelection(t)} onDelete={t.selected? () => handleChipDelete(t) : undefined}/>)})}
    </Box>
  )
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

  const options = {
    includeScore: true,
    // Search in `summary` and in `name`
    keys: ['summary', 'name']
  }
  
  const fuse = new Fuse(Object.values(models), options)
  
  const result = (searchValue === "") ? Object.values(models).map(e => {return {item: e}}) : fuse.search(searchValue);
  const result2 = result;

  return (
    <>
        <Box display='flex' flexDirection='column' alignItems='center' gap={2} >
          {/*<Box display={{ xs: 'flex', sm: 'none' }} sx={{width: "100%"}} flexDirection='row' justifyContent={"space-between"} alignItems='center'>
              <Image
                width={100}
                height={100}
                        
                src={`${basePath}/logos/3dcommerce/3DCommerce_Aug20/3DCommerce for web/3DCommerce RGB/3DCommerce_RGB_Aug20.svg`}
                alt={"glTF"}  
                loading="lazy" />
              <Image
                width={100}
                height={100}
                        
                src={`${basePath}/logos/gltf/glTF_Nov17/glTF for web/glTF RGB/glTF_RGB_June16.svg`}
                alt={"glTF"}  
                loading="lazy" />
          </Box>*/}
          <Box display='flex' sx={{width: "100%"}} flexDirection='row' justifyContent={"space-between"} alignItems='center'>
              <Search searchValueChange={handleSearchValueChange}/>
              <HelpIcon sx={{margin: "5px"}}/>
            <Box flex={1} display={{ xs: 'flex', sm: 'flex' }}  justifyContent='flex-end' flexWrap={"wrap"}>
              {/*<Box display={{ xs: 'none', sm: 'flex' }}  sx={{width: "100%"}} flexDirection='row' justifyContent={"flex-end"} alignItems='center'>
              <Image
                width={100}
                height={100}
                        
                src={`${basePath}/logos/3dcommerce/3DCommerce_Aug20/3DCommerce for web/3DCommerce RGB/3DCommerce_RGB_Aug20.svg`}
                alt={"glTF"}  
                loading="lazy" />
              <Image
                width={100}
                height={100}
                        
                src={`${basePath}/logos/gltf/glTF_Nov17/glTF for web/glTF RGB/glTF_RGB_June16.svg`}
                alt={"3D Commerce"}  
                loading="lazy" />
            </Box>*/}
            </Box>
            </Box>
          {/*boxChip*/}
          {/*accordionChips*/}
          {otherChips}
        </Box>

        <Typography className={styles.text}>
            The purpose of glTF is to standardize Physically-Based Rendering (PBR) materials such that you 
            can be confident your model will appear as intended in any lighting environment in any renderer. 
            This is a very ambitious goal, as real-time rendering at this level of quality is still very much 
            an area of active research with improvements being made constantly. This site demonstrates where 
            we are on that path to convergence and highlights areas that could still use improvement. 
            We are comparing the most popular real-time web renderers as well as path tracers 
            (a rendering technique that uses far fewer approximations than are required by real-time renderers).
        </Typography>

        {/* Components */}
        <Grid container style={{padding: 0, margin: 0}} spacing={2} sx={{ justifyContent: "space-evenly"}}>
        {/*Object.entries(models).filter((e,i) => searchValue.length <= i).map((e,i) => { return <ModelCard key={e.name} name={e.name}/>})*/}
        {/*Object.values(models).map((e,i) => { return <ModelCard key={e.name} name={e.name}/>})*/}
        {result2.map((e,i) => { return <ModelCard key={e.item.name} name={e.item.name}/>})}
        </Grid>                        
    </>
  );
}
