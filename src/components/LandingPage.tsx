"use client"
import React from 'react'
import { Box, Chip, Typography, Grid2 as Grid } from "@mui/material";
import Search from "@/components/Search2";

type ModelCardProps = {
    name: string
}

function ModelCard({name}: ModelCardProps) {
    return (
        <Box style={{width: '300px', height: '300px', background:'#AAAAAA', margin: '10px'}}>
            <Grid container justifyContent="center">
              <img
                style={{textAlign: "center"}}
                width={"100%"}
                height={"256px"}
                srcSet={`./thumbnails/original.thumb.webp`}
                src={`./thumbnails/original.thumb.webp`}
                alt={name}
                loading="lazy"
              />
            </Grid>
            <Grid container justifyContent="center">
              <Typography>{name}</Typography>
            </Grid>
        </Box>
    );
}

type ModelType = {
  name: string
}

type LandingPageProps = {
  models: Array<ModelType>
}

const tags = [
  { name: "metallic", selected: false},
  { name: "anisotropic", selected: false},
  { name: "normals", selected: false},
  { name: "transparent", selected: false},
  { name: "roughness", selected: false},
  { name: "KTX", selected: false},
  { name: "Draco", selected: false},
  { name: "Animation", selected: false},
  { name: "Morphing", selected: false},
  { name: "Textured", selected: false},
  { name: "Quantization", selected: false},
]

export default function LandingPage({models}: LandingPageProps) {

  const [selectedTags, setSelectedTags] = React.useState(tags);

  const scrollWrapperRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");

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

  return (
    <>
        <Box display='flex' justifyContent='space-between'>
          <Box overflow="auto" display="flex" sx={{overflowX: "auto", mr: 4, flexDirection:'row'}} ref={scrollWrapperRef}>
            {selectedTags.map(t => {return (<Chip key={t.name} label={t.name} color="primary" clickable sx={{m:0.5}} onClick={() => handleChipSelection(t)} onDelete={t.selected? () => handleChipDelete(t) : undefined}/>)})}
          </Box>
          <Box>
            <Search searchValueChange={handleSearchValueChange}/>
          </Box>
        </Box>

        <Typography color='primary'>
            The purpose of glTF is to standardize Physically-Based Rendering (PBR) materials such that you 
            can be confident your model will appear as intended in any lighting environment in any renderer. 
            This is a very ambitious goal, as real-time rendering at this level of quality is still very much 
            an area of active research with improvements being made constantly. This site demonstrates where 
            we are on that path to convergence and highlights areas that could still use improvement. 
            We are comparing the most popular real-time web renderers as well as path tracers 
            (a rendering technique that uses far fewer approximations than are required by real-time renderers).
        </Typography>

        {/* Components */}
        <Box display='flex' flexWrap='wrap'>
          {models.filter((e,i) => searchValue.length < i).map((e,i) => { return <ModelCard key={e.name} name={e.name}/>})}
        </Box>                        
    </>
  );
}
