"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Box, Chip, Typography, Grid2 as Grid, Checkbox } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { basePath } from '@/lib/paths';

export type ModelCardProps = {
    name: string,
    marked: boolean,
    onSelection: (arg0: string) => void
}

export default function ModelRenderCard({name, marked, onSelection}: ModelCardProps) {
    const [selected, setSelected] = React.useState(false);
  const thumbnail = `${basePath}/images/other/babylon-golden.png`;

  const theme = useTheme();

  const markCard = (clicked: boolean) => {
    onSelection(name);
    setSelected(clicked);
  }

  const test22 = false;

  return (
      <Box sx={{boxShadow:16, width: '100%', maxWidth: "400px", height:'fit-content', borderRadius: '16px', margin: '10px', background: theme.palette.grey[900] }}>
          <Box position="relative">
            <Box style={{width: "100%"}}>
                <Image
                width={300}
                height={300}
                style={{ 
                    aspectRatio: 1 / 1,
                    width: '100%', 
                    height: "100%",
                    maxWidth: "400px", 
                    textAlign: "center", 
                    cursor: 'pointer', 
                    objectFit: 'cover',
                    borderRadius: marked ? '16px' : '16px 16px 0 0',
                    transform: marked ? 'scale(0.9)' : 'scale(1)', // Shrink image when selected
                    transition: 'transform 0.3s ease, border-radius 0.3s ease',
                }}
                src={thumbnail}
                alt={name}  
                loading="lazy"
                />
            </Box>
           
            <Checkbox
                checked={marked}
                onChange={() => markCard(!marked)}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon sx={{background: theme => theme.palette.grey[900], borderRadius:'50%'}}/>}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: marked ? 'primary.main' : 'grey.700',
                    '& .MuiSvgIcon-root': {
                        fontSize: 24,
                    },
                }}
            />
          </Box>
          <Box display="flex" flexDirection="column" p={1} justifyContent='center'>
            <Typography fontSize={18} fontWeight={'bold'} textAlign='center' sx={{overflowWrap: "anywhere"}}>{name}</Typography>
          </Box>          
      </Box>
  );
}