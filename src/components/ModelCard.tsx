"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Box, Chip, Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { basePath } from '@/lib/paths';

export type ModelCardProps = {
    name: string
}

export default function ModelCard({name}: ModelCardProps) {
  const tags = ["KHR_materials_ior", "KHR_draco_mesh_compression", "KHR_mesh_quantization", "KHR_materials_anisotropy"];
  const thumbnail = `${basePath}/images/other/babylon-golden.png`;

  const theme = useTheme();

  return (
      <Box sx={{boxShadow:16, width: '100%', maxWidth: "400px", height:'fit-content', borderRadius: '16px', margin: '10px', background: theme.palette.grey[900] }}>
        <Grid container justifyContent="center">
          <Link style={{width: "100%", maxWidth: "400px"}} href={`model/${name}`}>
            <Image
              width={300}
              height={300}
              style={{ aspectRatio: 1, width: '100%', height: "100%", maxWidth: "400px", textAlign: "center", cursor: 'pointer', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
              src={thumbnail}
              alt={name}  
              loading="lazy"
            />
          </Link>
        </Grid>
        <Box display="flex" flexDirection="column" p={1} >
          <Typography fontSize={18} fontWeight={'bold'}>{name}</Typography>
          <Box sx={{mt:1}}>
            {tags.map(t=> <Chip size="small" key={t} label={t} color="primary" sx={{m:0.5}} />)}
          </Box>
        </Box>          
      </Box>
  );
}