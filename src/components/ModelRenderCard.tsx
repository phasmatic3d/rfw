"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Box, Chip, Typography, Grid2 as Grid, Checkbox } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export type ModelCardProps = {
    name: string
}

export default function ModelRenderCard({name}: ModelCardProps) {
    const [selected, setSelected] = React.useState(false);
  const thumbnail = `/images/other/babylon-golden.png`;

  const theme = useTheme();

  const test22 = false;

  return (
      <Box sx={{boxShadow:16, width: '300px', borderRadius: '16px', margin: '10px', background: theme.palette.grey[900] }}>
          <Box position="relative">
            <Image 
                style={{
                    textAlign: "center", cursor: 'pointer', width:"100%", borderTopLeftRadius: '16px', borderTopRightRadius: '16px',  
                    borderRadius: selected ? '16px' : '16px 16px 0 0',
                    transform: selected ? 'scale(0.9)' : 'scale(1)', // Shrink image when selected
                    transition: 'transform 0.3s ease, border-radius 0.3s ease'
                }}
                height={300}
                width={300}       
                quality={100}         
                src={thumbnail}
                alt={name}
                loading="lazy"
            />
            <Checkbox
                checked={selected}
                onChange={() => setSelected(!selected)}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon sx={{color:'grey.700'}}/>}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: selected ? 'primary.main' : 'grey.500',
                    '& .MuiSvgIcon-root': {
                        fontSize: 24,
                    },
                }}
            />
          </Box>
          <Box display="flex" flexDirection="column" p={1} justifyContent='center'>
            <Typography fontSize={18} fontWeight={'bold'} textAlign='center'>{name}</Typography>
          </Box>          
      </Box>
  );
}