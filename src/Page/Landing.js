import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Util/Context';
import { CONSTANT } from '../Util/Constant';
import { useForm } from "react-hook-form";
import toastr from "toastr"
import Privacy from '../Util/Privacy'
import {
  useLocation,
} from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ReactModal from 'react-modal'
import { useMediaQuery } from 'react-responsive'
import { Button, Grid, InputAdornment, Paper, TextField } from '@mui/material';

export default function Landing() {
  const { dispatch, loginNav, resetCode } = useContext(Context)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [email,setEmail]=useState('')
  useEffect(() => {
    dispatch({ type: CONSTANT.navigate, payload: 0 })
  }, []);


  return (

    <div className='bv'>

      <video autoPlay loop muted  poster={require('../Asset/images/v.jpg')}>
        <source src={require('../Asset/images/v.mp4')} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Paper className='center landing' style={{marginTop:'30vh',zIndex:'200'}} >
              <div>
                <img src={require('../Asset/images/makolaa_logo.png')} style={{width:'50%',margin:'auto',height:'inherit'}} className="center block" />
                <div className='space-top xl'>
                  Get Ready. We're Launching Soon!
                </div>
                <div className='space-bottom xl space-top2'>
                  Get notified when we go live.
                </div>
                <form>
                  <TextField  type="email" fullwidth size="small" placeholder="Enter your email address" 
                    InputProps={{ endAdornment:(
                    <InputAdornment position="start">
                        <img src={require('../Asset/images/email.svg').default}  className="click space-left2" />
                    </InputAdornment>
                  )}}
                  {...register("email",{ required: true})}
                  onChange={(e)=>setEmail(e.target.value)} />
                  <Button onClick={()=>dispatch({type:CONSTANT.subscribe,payload: {email:email}})}
                  style={{marginTop:'2px'}} className='space-left' variant='contained'>Subscribe</Button>
                </form>
              </div>
             
             
             
            </Paper>
        </Grid>
      </Grid>
    </div>

  );

}



