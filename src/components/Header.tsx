"use client"

import Link from 'next/link'
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

export default function Header() {  

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleBurgerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleBurgerClose = () => {
        setAnchorEl(null);
    }
    
    return (
    <AppBar position="fixed">
        <Toolbar style={{padding: 0, display:'flex', justifyContent: 'space-between', background: '#333333'}}>
            <Box flex={1}/>
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
        </Toolbar>
      </AppBar>
    )
  }
