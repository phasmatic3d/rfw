"use client"
import React from 'react'
import Image from 'next/image'
import { Box, Chip, Typography, Grid2 as Grid } from "@mui/material";

export type ModelCardProps = {
    name: string
}

export default function ModelCard({name}: ModelCardProps) {
    return (
        <Box sx={{boxShadow:16, width: '300px', borderRadius: '16px', background:'#AAAAAA', margin: '10px'}}>
            <Grid container justifyContent="center">
              <img
                style={{textAlign: "center", borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}
                width={"100%"}
                height={"256px"}
                srcSet={`./thumbnails/original.thumb.webp`}
                src={`./thumbnails/original.thumb.webp`}
                alt={name}
                loading="lazy"
              />
            </Grid>
            <Grid container justifyContent="left">
              <Typography fontSize={18} fontWeight={'bold'} sx={{m:1}}>{name}</Typography>
            </Grid>
            <Chip label={name} color="primary" sx={{m:0.5}} />
            <Chip label={name} color="primary" sx={{m:0.5}} />
        </Box>
    );
}