"use client"
import React from 'react';
import { Typography, Box, Grid2 as Grid, ButtonGroup, Button, Popper, Grow, Paper, ClickAwayListener, MenuItem , MenuList, IconButton } from "@mui/material";
import ModelRenderCard from "@/components/ModelRenderCard"
import ImageComparisonSlider from "@/components/ImageComparison/ImageComparisonSlider";
import SideBySideComparison from './ImageComparison/SideBySideComparison'
import ImageDifferenceView from './ImageComparison/ImageDifferenceView';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from "./ComparePage.module.css";
import InfoIcon from '@mui/icons-material/Info';
import CompareIcon from '@mui/icons-material/Compare';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EngineSelection from './EngineSelection';
import CollectionsIcon from '@mui/icons-material/Collections';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ImageIcon from '@mui/icons-material/Image';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { basePath } from '@/lib/paths';
import SideBySideIcon from './SideBySideIcon';

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
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
        sx={{width:"24px", height: "24px", minWidth:"24px"}}
      >
        <IconButton
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          color="inherit"
          edge="start"
        >
          {selectedIndex==0 && <SideBySideIcon />}
          {selectedIndex==1 && <CompareIcon />}
          {selectedIndex==2 && <ImageIcon />}
        </IconButton>
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
                      {index==0 && <SideBySideIcon/>}
                      {index==1 && <CompareIcon />}
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
  
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const [isVisible, setIsVisible] = React.useState(!isXs); 
  const [isMagnified, setMagnified] = React.useState(false);
  const [engine1, setEngine1] = React.useState('three.js');
  const [engine2, setEngine2] = React.useState('filament.js');
  const [nextEngine, setNextEngine] = React.useState(0);
  const [comparisonMode, setComparisonMode] = React.useState(0);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Access specific search parameters
    const param1 = searchParams.get("engine1");
    const param2 = searchParams.get("engine2");

    if(param1) { setEngine1(param1) }
    if(param2) { setEngine2(param2) }    

  }, []);

  const toggleSelection = (engine: string) => {
    if (engine1 === engine || engine2 === engine) {
      return;
    }
    
    if (nextEngine === 0 ) {
      setEngine1(engine);
      setNextEngine(1);
    } else  {
      setEngine2(engine);
      setNextEngine(0);
    }
  };

  const e1 = render_views.find(e=> e.name === engine1);
  let image1 = (e1 && e1.image) || "";
  image1 = `${basePath}${image1}`;
  let image2 = render_views.find(e=> e.name === engine2)?.image || "";
  image2 = `${basePath}${image2}`;

  const description = <Box>
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h6'>Description</Typography>
      <Box>
        <IconButton><ShareIcon sx={{color: 'grey.100'}}/></IconButton>
        <IconButton><FileDownloadIcon sx={{color: 'grey.100'}}/></IconButton>
      </Box>
    </Box>
    <Typography textAlign='justify'>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
  </Box>;

  return (
    <>
      <Grid container direction="row" className={styles.main} sx={{flexWrap: "nowrap"}} spacing={2}>
        {!isMagnified && <Grid className={styles.description} height={"70vh"} display={{xs:'none', sm:'initial'}} sx={{overflow: "auto"}}>
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
        </Grid>}
        {/* Main */}
        <Box className={styles.tool} width={{xs:'100%', sm: isMagnified? '100%' : '60%'}}>
          <Box sx={{display:'flex', width: "100%", justifyContent: 'space-betwee'}}>
            {isMagnified && <CloseFullscreenIcon onClick={() => setMagnified(false)} sx={{cursor: "pointer"}} /> }
            {!isMagnified && <OpenInFullIcon onClick={() => setMagnified(true)} sx={{cursor: "pointer"}} /> }
            <ComparisonButton handleSelection={(index) => {setComparisonMode(index)}}/>
          </Box>
          {comparisonMode===0 && <SideBySideComparison imgSrc1={image1} imgSrc2={image2}/>}
          {comparisonMode===1 && <ImageComparisonSlider imgSrc1={image1} imgSrc2={image2}/>}          
          {comparisonMode===2 && <ImageDifferenceView imgSrc1={image1} imgSrc2={image2}/>}          
          <Box display={{xs: 'flex', sm:'none'}} justifyContent='space-between' width='100%' pl={1} pr={1}>
            <Box flex={1}><EngineSelection engineName={engine1} engineList={render_views.map(e=> e.name)} handleChange={(name) => { if(name!==engine1 && name!==engine2) {setEngine1(name)} }}/></Box>
            <Box flex={1} display='flex' justifyContent='flex-end'><EngineSelection engineName={engine2} engineList={render_views.map(e=> e.name)} handleChange={(name) => { if(name!==engine1 && name!==engine2) {setEngine2(name)} }}/></Box>
          </Box>
          <Box display={{xs: 'none', sm:'flex'}} justifyContent='space-between' width='100%' pl={1} pr={1}>
            <Box flex={1}><Typography>{engine1}</Typography></Box>
            <Box flex={1} display='flex' justifyContent='flex-end'><Typography>{engine2}</Typography></Box>
          </Box>
        </Box>
        {!isMagnified && <Grid className={styles.side} display={{xs:'none', sm:'flex'}} sx={{overflow: "auto"}} height={"70vh"} container spacing={2}>
          {render_views.map((e,i) => { return <ModelRenderCard key={e.name} name={e.name} marked={(engine1 === e.name || engine2 === e.name)} onSelection={toggleSelection}/>})}
        </Grid>}
      </Grid>
    </>
  )
}
