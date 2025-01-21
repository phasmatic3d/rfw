"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Box, Chip, Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export type ModelCardProps = {
    name: string
}

export default function ModelCard({name}: ModelCardProps) {
  const tags = ["Draco", "KTX", "Quantization", "Anisotropic"];
  const thumbnail = `/images/other/babylon-golden.png`;

  const theme = useTheme();

  return (
      <Box sx={{boxShadow:16, width: '300px', borderRadius: '16px', margin: '10px', background: theme.palette.grey[900] }}>
          <Grid container justifyContent="center">
          <Link href="/model/helmet1">
            <Image
              style={{textAlign: "center", cursor: 'pointer', width:"100%", borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}
              height={256}
              width={256}
              src={thumbnail}
              alt={name}
              loading="lazy"
            />
          </Link>
          </Grid>
          <Box display="flex" flexDirection="column" p={1} >
            <Typography fontSize={18} fontWeight={'bold'}>{name}</Typography>
            <Box sx={{mt:1}}>
              {tags.map(t=> <Chip key={t} label={t} color="primary" sx={{m:0.5}} />)}
            </Box>
          </Box>          
      </Box>
  );
}