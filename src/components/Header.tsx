"use client"

import Link from 'next/link'
import Image from 'next/image'
import React from 'react';
import styles from './Header.module.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LightDarkButton from './LightDarkButton'
import { basePath } from '@/lib/paths';
import { useTheme } from "@mui/material/styles";

export default function Header() {  
    const theme = useTheme();

    const imageSrc =
    theme.palette.mode === "light" 
    ? `${basePath}/logos/khronos/Khronos(r) Family_June18/Khronos Tagline/Khronos Tagline for web/RGB/Khronos_Tagline_RGB_June18.svg`
    : `${basePath}/logos/khronos/Khronos(r) Family_June18/Khronos Tagline/Khronos Tagline for web/white/Khronos_Tagline_White_June18.svg`;

    const bgColor = theme.palette.mode === "light" ? `#fff` : `#333333`;
    const fontColor = theme.palette.mode === "light" ? '#182136' : `#fff`;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleBurgerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleBurgerClose = () => {
        setAnchorEl(null);
    }
    
    return (
      <AppBar position="static">
        <Toolbar style={{paddingLeft: 2, paddingRight: 2, width: "100%", margin:"auto", display:'flex', justifyContent: 'space-between', flexWrap: 'wrap', backgroundColor: `${bgColor}`}}>
            <Box display='flex' style={{width: "100%", maxWidth: "1900px", margin: "auto", justifyContent: 'space-between', flexWrap: 'wrap'}}>

            <Box flex={1} display='flex' justifyContent='flex-start'>
                <img
                    width={"250px"} 
                    src={imageSrc}
                    loading="lazy"
                    alt={"The Khronos Group: Connecting Software to Silicon"}  
                />
            </Box>
            <Box flex={1} display={{ xs: 'none', sm: 'flex' }}  justifyContent='flex-end' margin={"auto"}>
                <LightDarkButton />
                <Button variant="text" sx={{color: fontColor, textTransform:'capitalize'}}>About</Button>
                <Button variant="text" sx={{color: fontColor, textTransform:'capitalize'}}>FAQ</Button>
                <Button variant="text" sx={{color: fontColor, textTransform:'capitalize'}}>Contribute</Button>
            </Box>
            <Box flex={1} display={{ xs: 'flex', sm: 'none' }} justifyContent='flex-end'>
                <LightDarkButton />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleBurgerClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    color="primary"
                    disableScrollLock 
                >
                    <MenuItem onClick={handleBurgerClose} component={Link} href="/about">About</MenuItem>
                    <MenuItem onClick={handleBurgerClose} component={Link} href="/faq">FAQ</MenuItem>
                    <MenuItem onClick={handleBurgerClose} component={Link} href="/contribute">Contribute</MenuItem>
                </Menu>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="menu"
                    onClick={handleBurgerClick}
                    sx={{ mr: 1 }}
                >
                    <MenuIcon />
                </IconButton>                
                </Box>
            </Box>
                {/*<Box flex={1}/>
            <Box flex={2} display='flex' justifyContent='space-around'>
                <Typography variant="h5">
                    Render Fidelity
                </Typography>
            </Box>
            <Box flex={1} display='flex' justifyContent='flex-end'>
                <LightDarkButton />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleBurgerClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    disableScrollLock 
                >
                    <MenuItem onClick={handleBurgerClose} component={Link} href="/">Landing</MenuItem>
                    <MenuItem onClick={handleBurgerClose} component={Link} href="/dashboard">Dashboard</MenuItem>
                    <MenuItem onClick={handleBurgerClose} component={Link} href="/about">About</MenuItem>
                </Menu>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleBurgerClick}
                    sx={{ mr: 1 }}
                >
                    <MenuIcon />
                </IconButton>                
            </Box>
            */}
        </Toolbar>
        <Box display='flex' pl={2} pr={2} style={{width: "100%", margin: "auto", justifyContent: 'space-between', flexWrap: 'wrap', background:"#333333"}}>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent={"space-between"} sx={{width: "100%", maxWidth: "1900px", margin: "auto"}}>
                <Box justifyContent={"flex-start"}>
                    <Typography sx={{fontWeight:'bold', fontFamily: 'var(--font-chivo)', fontSize: '48px'}}>
                        The glTF Render Fidelity Test Suite
                    </Typography>
                </Box>
                <Box display={{ xs: 'none', sm: 'flex' }} flexDirection='row' justifyContent={"flex-end"} alignItems='center'>
                    <Image
                        width={64}
                        height={64}
                                
                        src={`${basePath}/logos/3dcommerce/3DCommerce_Aug20/3DCommerce for web/3DCommerce RGB/3DCommerce_RGB_Aug20.svg`}
                        alt={"glTF"}  
                        loading="lazy" />
                    <Image
                        width={64}
                        height={64}
                                
                        src={`${basePath}/logos/gltf/glTF_Nov17/glTF for web/glTF RGB/glTF_RGB_June16.svg`}
                        alt={"3D Commerce"}  
                        loading="lazy" />
                </Box>
            </Box>
        </Box>
    </AppBar>
    )
  }
