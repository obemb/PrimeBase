import React from "react";
import {Avatar,Stack } from '@mui/material';

export default function AvatarBox({name,image,showname=true,className}) {
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
  }
  return (
       image!=null ? 
       <Stack direction="row" alignItems={"center"} spacing={1}>
           <Avatar alt={name} src={image} />
           {showname &&<span className={className}>{name}</span>}
        </Stack> :
         <Stack direction="row" alignItems={"center"} spacing={1}>
          <Avatar {...stringAvatar(name)} />
          {showname &&<span className={className}>{name}</span>}
         </Stack>
  );

  
}
