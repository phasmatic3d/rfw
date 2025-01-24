"use client"
import React from 'react';
import { Typography, Box, Grid2 as Grid, ButtonGroup, Button, Popper, Grow, Paper, ClickAwayListener, MenuItem , MenuList } from "@mui/material";
import ModelRenderCard from "@/components/ModelRenderCard"
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import styles from "./ComparePage.module.css";
import InfoIcon from '@mui/icons-material/Info';
import CompareIcon from '@mui/icons-material/Compare';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EngineSelection from './EngineSelection';
import SideBySideComparison from './SideBySideComparison'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import ImageIcon from '@mui/icons-material/Image';
import ImageDifferenceView from './ImageDifferenceView';

const render_views = [
  {name: "three.js", image: "/images/dragon/model-viewer-golden.png"},
  {name: "filament.js", image: "/images/dragon/filament-golden.png"},
  {name: "babylon.js", image: "/images/dragon/babylon-golden.png"},
  {name: "gltf-sample-viewer", image: "/images/dragon/gltf-sample-viewer-golden.png"},
  {name: "three-gpu-pathtracer", image: "/images/dragon/three-gpu-pathtracer-golden.png"},
  {name: "Dassault STELLAR", image: "/images/dragon/stellar-golden.png"},
  {name: "Chaos Group V-Ray", image: "/images/dragon/model-viewer-golden.png"},
  {name: "Blender Cycles", image: "/images/dragon/blender-cycles-golden.png"},
]

type ComparePageProps = {
  name: string,
  description: string
}

type ComparisonButtonProps = {
  handleSelection: (selected:number) => void,
}

const ComparisonButton = ({handleSelection}:ComparisonButtonProps) => {
  const options = ['SideBySide', 'Slider', 'Difference'];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    handleSelection(index);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        color='inherit'
        variant='text'
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button
          
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {selectedIndex==0 && <CompareIcon />}
          {selectedIndex==1 && <DownhillSkiingIcon />}
          {selectedIndex==2 && <ImageIcon />}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {index==0 && <CompareIcon />}
                      {index==1 && <DownhillSkiingIcon />}
                      {index==2 && <ImageIcon />}
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>);
}

export default function ComparePage({name}: ComparePageProps) {  
  
  const [isMagnified, setMagnified] = React.useState(false);
  const [engine1, setEngine1] = React.useState('three.js');
  const [engine2, setEngine2] = React.useState('filament.js');
  const [comparisonMode, setComparisonMode] = React.useState(0);

  const e1 = render_views.find(e=> e.name === engine1);
  const image1 = (e1 && e1.image) || "";
  const image2 = render_views.find(e=> e.name === engine2)?.image || "";

  return (
    <>
       <Grid container direction="column" className={styles.main} spacing={1}>
        {!isMagnified && <Grid className={styles.description}>
          <Typography variant='h6'>{name}</Typography>
          <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
          <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
        </Grid>}
        {/* Main */}
        <Grid className={styles.tool} container spacing={1} width={{xs:'100%', sm: isMagnified? '100%' : '60%'}}>
          <Box flex={1} sx={{display:'flex', width: "100%", justifyContent: 'space-between'}}>
            {isMagnified && <CloseFullscreenIcon onClick={() => setMagnified(false)} sx={{cursor: "pointer" }} /> }
            {!isMagnified && <OpenInFullIcon onClick={() => setMagnified(true)} sx={{cursor: "pointer" }} /> }
            <CompareIcon onClick={() => {setComparisonMode(comparisonMode===0? 1 : 0)}} sx={{cursor: "pointer" }} />
            <ComparisonButton handleSelection={(index) => {setComparisonMode(index)}}/>
          </Box>
          {comparisonMode===0 && <SideBySideComparison imgSrc1={image1} imgSrc2={image2}/>}
          {comparisonMode===1 && <ImageComparisonSlider imgSrc1={image1} imgSrc2={image2}/>}          
          {comparisonMode===2 && <ImageDifferenceView imgSrc1={image1} imgSrc2={image2}/>}          
          <Box display='flex' justifyContent='space-between' width='100%'>
            <Box flex={1}><EngineSelection engineName={engine1} engineList={render_views.map(e=> e.name)} handleChange={(name) => { setEngine1(name) }}/></Box>
            <Box flex={1} display='flex' justifyContent='flex-end'><EngineSelection engineName={engine2} engineList={render_views.map(e=> e.name)} handleChange={(name) => { setEngine2(name) }}/></Box>
          </Box>
        </Grid>
        {!isMagnified && <Grid className={styles.side} display={{xs:'none', sm:'flex'}} sx={{overflow: "auto"}} container spacing={2}>
          {render_views.map((e,i) => { return <ModelRenderCard key={e.name} name={e.name}/>})}
        </Grid>}
      </Grid>
    </>
  )
}
