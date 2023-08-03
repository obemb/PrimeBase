import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactModal from 'react-modal'
import { Drawer } from "@mui/material";

export default function DrawerBox({children,action,open=false}){
    return(
      <Drawer
            anchor={"right"}
            open={open}
            onClose={()=>action(false)}
          >
        <div className="padding">
          {children}
        </div>
      
      </Drawer>
    )
  }