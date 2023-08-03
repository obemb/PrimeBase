import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

export default function Popup({children,target=null,placement="bottom",key=1}){
    return(
      <Popper key={key} open={target!=null} anchorEl={target} placement={placement}>
        <Paper>
          {children}
        </Paper>
      </Popper>
    )
  }