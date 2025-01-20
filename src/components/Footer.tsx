import React from 'react';
import { Typography, Box, Grid2 as Grid } from "@mui/material";

export default function Footer() {  
    return (
      <footer style={{position: "fixed", bottom: 0, left: 0, right: 0, background:"#0D1720"}}>
        <Typography variant="h6" style={{color: 'white', textAlign:'center'}}>KHRONOS FOOTER</Typography>
      </footer>
    );
}
