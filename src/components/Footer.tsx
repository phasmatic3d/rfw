"use client"

import React from 'react';
import { Typography, Box, Grid2 as Grid } from "@mui/material";
import { basePath } from '@/lib/paths';
import { useTheme } from "@mui/material/styles";

export default function Footer() {  
    const theme = useTheme();

    const imageSrc =
    theme.palette.mode === "light" 
    ? `${basePath}/logos/khronos/Khronos(r) Family_June18/Khronos Tagline/Khronos Tagline for web/RGB/Khronos_Tagline_RGB_June18.svg`
    : `${basePath}/logos/khronos/Khronos(r) Family_June18/Khronos Tagline/Khronos Tagline for web/white/Khronos_Tagline_White_June18.svg`;

    const bgColor = theme.palette.mode === "light" ? `#fff` : `#333333`;
    const fontColor = theme.palette.mode === "light" ? '#182136' : `#fff`;

    return (
      <footer style={{background:bgColor}}>
        <Box display='flex' style={{width: "100%", margin: "auto", justifyContent: 'space-between', flexWrap: 'wrap', background:"#333333"}}>
        <Box display='flex' flexDirection='column' height={"10px"} minHeight={"10px"} alignItems='left' sx={{width: "100%", margin: "auto", maxWidth: "1900px", background:"#333333"}}>
        <Typography color={fontColor} fontSize={"12px"} style={{margin:"auto 5px"}}>
              Ludacris
          </Typography>
        </Box>
        </Box>
        <Box display='flex' style={{width: "100%", margin: "auto", justifyContent: 'space-between', flexWrap: 'wrap', background:"red"}}>
        <Box flex={1} width={"100%"} sx={{maxWidth: "1900px", margin: "auto"}} display='flex' justifyContent='flex-start'>
          <img
              width={"250px"} 
              src={imageSrc}
              loading="lazy"
              alt={"The Khronos Group: Connecting Software to Silicon"}  
          />
        </Box>
        </Box>
        <Box display='flex' style={{width: "100%", margin: "auto", justifyContent: 'space-between', flexWrap: 'wrap', background:"red"}}>
        <Box sx={{width: "100%", maxWidth: "1900px"}} flex={1} display={{ xs: 'none', sm: 'flex' }}  justifyContent='flex-start' margin={"auto"}>
          <Typography color={fontColor} fontSize={"12px"} style={{margin:"auto 5px"}}>
              About
          </Typography>
          <Typography color={fontColor} fontSize={"12px"} style={{margin:"auto 5px"}}>
              Privacy Policy
          </Typography>
          <Typography color={fontColor} fontSize={"12px"} style={{margin:"auto 5px"}}>
              Terms of Use
          </Typography>
          <Typography color={fontColor} fontSize={"12px"} style={{margin:"auto 5px"}}>
              Code of Conduct
          </Typography>
          <Typography color={fontColor} fontSize={"12px"} style={{margin:"auto 5px"}}>
              Diversity and Inclusion
          </Typography>
          <Typography color={fontColor} fontSize={"12px"} style={{margin:"5px 15px"}}>
              Trademarks
          </Typography>
          </Box>
        </Box>
        
      </footer>
    );
}
