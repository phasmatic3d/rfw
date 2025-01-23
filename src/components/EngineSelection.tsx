"use client"
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box, Grid2 as Grid } from "@mui/material";


type Props = {
    engineName: string,
    engineList: string[],
    handleChange: (name:string) => void
}
  
export default function EngineSelection({engineName, engineList, handleChange}: Props) {  

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Engine</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={engineName}
                label="Engine"
                onChange={(event) => {handleChange(event.target.value)}}
                //autoWidth
                //sx={{minWidth:'13rem'}}
            >
                {engineList.map(engine => <MenuItem key={engine} value={engine}>{engine}</MenuItem>)}
            </Select>
        </FormControl>
    );
}