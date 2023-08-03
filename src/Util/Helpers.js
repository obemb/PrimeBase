import React, { Component } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Spinner  from "react-spinners/ScaleLoader";
import Clip  from "react-spinners/MoonLoader";
import { jsx } from '@emotion/react';
import Tip from '../Component/Tooltip';

const override = jsx`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



export const loadingComponent = (value1,value2) => {
  return (
    value1==value2 &&<span>
      <Clip 
      size={15}
      color={"#fff"}/>
    </span>
  )
};


export const LoadingSpinerComponent = (props) => {
  const { promiseInProgress } = usePromiseTracker({area: props.area, delay: 0});

    return (
      <div style={{display:props.display==null ? 'flex':props.display}}>
      {
        (promiseInProgress === true) &&
        <Spinner  jsx={override} className="center2 padding" style={{width:'100%'}}
        size={150}
        color={"#00338D"}/>
      }
    </div>
    )
  };

  export const stripText = (text, length,more=0) =>{
    return text.length>length ? text.substr(0,length-3)+(more==0 ?'...':'') : text
  }
  export const stripTextMore = (text, length) =>{
    return text.length>length && <Tip data={text} more="trye"/> 
  }

  export const getEv = () =>{
    return JSON.parse(localStorage.getItem("Ev"))
  }
  
  export const moneyFormat = (price, sign = '₦') =>{
    if(price==null) return "0.00"
    let negative='';
    let negative2='';
    if(parseFloat(price)<0){
      negative='-'
      negative2=''
      price=price*-1;
    } 
    const pieces = parseFloat(price).toFixed(2).split('')
  
    let ii = pieces.length - 3
    while ((ii-=3) > 0) {
      pieces.splice(ii, 0, ',')
    }
    return sign + negative+pieces.join('')+negative2
  }
