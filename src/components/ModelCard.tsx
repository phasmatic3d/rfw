"use client"
import React from 'react'
import Image from 'next/image'
//import Link from 'next/link';
import Link from '@mui/material/Link';
import { Box, Chip, Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { basePath } from '@/lib/paths';

export type ModelCardProps = {
    name: string, //clickable string
    title: string,
    thumbnail: string,
    tags: Array<string>
}

export default function ModelCard({name, title, thumbnail, tags}: ModelCardProps) {
  
  const theme = useTheme();

  return (
      <Box width={{xs: '100%', sm: '400px' }} sx={{margin: '30px 5px'}}>
        <Grid container justifyContent="center">
          <Link width={{xs: '100%', sm: '400px' }} height={"250px"} href={`model/${name}`}>
            <Image
              width={300}
              height={300}
              quality={90}
              /* Added color: '' because of https://github.com/vercel/next.js/issues/45184 */
              style={{ color: '', aspectRatio: 1, width: '100%', height: "100%", maxWidth: "100%", textAlign: "center", cursor: 'pointer', objectFit: 'contain', borderRadius: '16px'}}
              src={`${basePath}${thumbnail}`}
              alt={name}  
              loading="lazy"
            />
          </Link>
        </Grid>
        <Box display="flex" flexDirection="column" p={1} >
          <Typography fontSize={18} fontWeight={'bold'} sx={{overflowWrap: "anywhere"}}>{title}</Typography>
          <Box sx={{mt:1}}>
            {tags.map(t=> <Chip size="small" key={t} label={t} color="primary" sx={{m:0.5}} />)}
          </Box>
        </Box>          
      </Box>
  );
}