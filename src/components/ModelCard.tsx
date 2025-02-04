"use client"
import React from 'react'
import Image from 'next/image'
//import Link from 'next/link';
import Link from '@mui/material/Link';
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
      <Box width={{xs: '100%', sm: '400px' }} sx={{margin: '30px 5px'}}>
        <Grid container justifyContent="center">
          <Link width={{xs: '100%', sm: '400px' }} height={"250px"} href={`model/${name}`}>
            <Image
              width={300}
              height={300}
              quality={90}
              style={{ aspectRatio: 1, width: '100%', height: "100%", maxWidth: "100%", textAlign: "center", cursor: 'pointer', objectFit: 'cover', borderRadius: '16px'}}
              src={thumbnail}
              alt={name}  
              loading="lazy"
            />
          </Link>
        </Grid>
        <Box display="flex" flexDirection="column" p={1} >
          <Typography fontSize={18} fontWeight={'bold'} sx={{overflowWrap: "anywhere"}}>{name}</Typography>
          <Box sx={{mt:1}}>
            {tags.map(t=> <Chip size="small" key={t} label={t} color="primary" sx={{m:0.5}} />)}
          </Box>
        </Box>          
      </Box>
  );
}