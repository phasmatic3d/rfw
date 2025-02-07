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
    thumbnail: string,
    onSelection: (arg0: string) => void
}

export default function ModelRenderCard({name, thumbnail, marked, preserveAspectRatio, onSelection}: ModelCardProps) {
    const [selected, setSelected] = React.useState(false);


  const theme = useTheme();

  const markCard = (clicked: boolean) => {
    onSelection(name);
    setSelected(clicked);
  }

  return (
      <Box width={'100%'} maxWidth={{xs: '100%', sm: '400px' }} sx={{width: "100%", margin: '5px'}}>
          <Box position="relative">
            <Box width={"100%"} style={{width: "100%"}}>
                <Image
                width={80}
                height={80}
                quality={90}
                style={{ 
                    width: "100%",
                    height: "auto",
                    textAlign: "center", 
                    cursor: 'pointer', 
                    borderRadius: '16px',
                    transform: marked ? 'scale(0.9)' : 'scale(1)', // Shrink image when selected
                    transition: 'transform 0.3s ease, border-radius 0.3s ease',
                }}
                src={`${basePath}${thumbnail}`}
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