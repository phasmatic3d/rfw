"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Box, Chip, Typography, Grid2 as Grid } from "@mui/material";

export type ModelCardProps = {
    name: string
}

export default function ModelCard({name}: ModelCardProps) {
    return (
        <Box sx={{boxShadow:16, width: '300px', borderRadius: '16px', background:'#FEF7FF', margin: '10px'}}>
            <Grid container justifyContent="center">
            <Link href="/model/helmet1">
              <Image
                style={{textAlign: "center", cursor: 'pointer', width:"100%", borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}
                height={256}
                width={256}
                src={`/thumbnails/original.thumb.webp`}
                alt={name}
                loading="lazy"
              />
            </Link>
            </Grid>
            <Grid container justifyContent="left">
              <Typography fontSize={18} fontWeight={'bold'} sx={{m:1}}>{name}</Typography>
            </Grid>
            <Chip label={name} color="primary" sx={{m:0.5}} />
            <Chip label={name} color="primary" sx={{m:0.5}} />
        </Box>
    );
}