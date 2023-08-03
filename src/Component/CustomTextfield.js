import React from "react";
import {InputAdornment,TextField } from '@mui/material';
import { Search } from "@mui/icons-material";



export default function CustomTextField({children,action,placeholder,icon,width='100%'}){
    return(
        <TextField 
          size="small"
          type={"search"}
          fullWidth
          style={{width:width}}
            InputProps={{ startAdornment:(
            <InputAdornment position="start">
              {icon!=null && <Search sx={{color: "#8D0C1"}}/>}
            </InputAdornment>
          )}} onChange={(data)=> action(data.target.value) }    placeholder={placeholder} />
        
    ) 
  }