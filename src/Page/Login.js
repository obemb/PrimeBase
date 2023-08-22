import React , {useContext, useEffect,useState} from 'react';
import { Context } from '../Util/Context';
import {CONSTANT} from '../Util/Constant';
import { useForm } from "react-hook-form";
import toastr from "toastr"
import Privacy from '../Util/Privacy'
import {
  useLocation,
} from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ReactModal from 'react-modal'
import { useMediaQuery } from 'react-responsive'
import { Grid,InputAdornment,TextField } from '@mui/material';



export default function Login() {
  const {dispatch,loginNav,resetCode}=useContext(Context)

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPrivacy, setShowPrivacy]= useState(false);
  const[email,setemail]=useState("")
  const[password,setPassword]=useState("")
  const passChange = useLocation().passChanged;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 970px)' })

  useEffect(() => {
    dispatch({type:CONSTANT.navigate,payload: 0})
    
   
    
  //  document.querySelector("body").style.backgrounddivor = "#212a39";
   }, []);
  //  const data = useLocation().data;
  //  if(data!=null) setNav(3)


  function showLogin(){
    const onSubmit = (data) =>{
        const object={
          UserName:data.username,
          password:data.password,
          grant_type:"password"
        }
        dispatch({type:CONSTANT.token,payload: object}) 
    }
    return (
      <div>
      <span className="text" style={{fontSize:'24px'}}>Welcome back, Sign in</span>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <label>Username</label>
        <TextField size="small" placeholder="Enter any username" fullWidth type="text"  {...register("username", {required: true})}
        />
         
        {errors.username &&  <p className="error">Username is required</p>}
          
        <label>Password</label>
        <TextField 
         size="small"
        fullWidth
          InputProps={{ endAdornment:(
          <InputAdornment position="start">
              <img src={require('../Asset/images/password.svg').default}  className="click space-left2" />
          </InputAdornment>
        )}}
        type="password" name="password" onChange={(data)=> setPassword(data.target.value) }
        {...register("password",{ required: true,minLength:2})}     placeholder="Enter any password..." />
        
        {errors.password && errors.password.required  &&  <p className="error">Password is required</p>}
        {errors.password  && errors.password.minLength &&  <p className="error">Password is too short</p>}
      
        <button className="buttonSubmit space-bottom space-top click" style={{width:'100%'}} >
            <span className="white  center block">Sign In</span>
        </button>
      </form>
     
      <div>
        <span className="text white block center blue space-top click" onClick={()=>dispatch({type:CONSTANT.setLoginPhase,payload:2})}>Forgot my password</span> 
      </div>
      </div>
          )
  }

  function showChangePassword(){
    const onSubmit = (data) =>{
      if(data.password1==data.password2){
        const object={
          password:data.password1, 
        }
        dispatch({type:CONSTANT.changePassword,payload: object}) 
      }else{
        toastr.error("Password does not match")
      }
     
    }
    return (
      <div>
      <span className="text" style={{fontSize:'24px'}}>Change Password</span>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <label>New Password</label>
        <TextField  type="password" name="password1" fullWidth size="small"
        className=" text t-m block"
        {...register("password1",{ required: true,minLength:6})}     placeholder="Enter your new password" />
        {errors.password1 && errors.password1.required  &&  <p className="error">Password is required</p>}
        {errors.password1  && errors.password1.minLength &&  <p className="error">Password is too short</p>}
      

        <label>Password</label>
        <TextField   type="password" name="password2" fullWidth size="small"
        {...register("password2",{ required: true,minLength:6})}     placeholder="Re-enter your password" />
    
        {/* <input type="password" name="password" ref={...register({ required: true, minLength:5})}    placeholder="Enter your password"  />  */}
        {errors.password2 && errors.password2.required  &&  <p className="error">Password is required</p>}
        {errors.password2  && errors.password2.minLength &&  <p className="error">Password is too short</p>}
      
      
        <button className="buttonSubmit space-bottom space-top click" style={{width:'100%'}} >
            <span className="white  center block">Change Password</span>
        </button>
      </form>
      </div>
          )
  }


  
  function showResetPassword(){
    const onSubmit = (data) =>{
      const object={
        code:data.code,
        email:email,
      }
      dispatch({type:CONSTANT.resetPassword,payload:object})
    }
    return (
      <div>
      <span className="text" style={{fontSize:'24px'}}>Reset Password</span>
      <div className="push-left-right space-top2">
        <span className="text t-m ">Check your mail for the code to reset your password</span>
        <span className="text t-m space-left click" onClick={()=>  dispatch({type:CONSTANT.forgotPassword,payload: {email:email}})}>Resend Code</span>

      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <label>Code</label>
          <TextField
            defaultValue={resetCode}
            InputProps={{ endAdornment:(
            <InputAdornment position="start">
                <img src={require('../Asset/images/email.svg').default}  className="click space-left2" />
            </InputAdornment>
          )}}
            type="text" fullwidth size="small" {...register("code",{ required: true})}     placeholder="Enter reset code" />
         {errors.code &&  <p className="error">Code is required</p>}
          
       
        <button className="buttonSubmit space-bottom space-top click" style={{width:'100%'}} >
            <span className="white  center block">Reset Password</span>
        </button>
      </form>
     
      <div>
        <span className="text white block center blue space-top click" onClick={()=>dispatch({type:CONSTANT.setLoginPhase,payload:1})}>Back to Account Sign-In</span> 
      </div>
      </div>
          )
  }
  


  function showForgotPassword(){
    const onSubmit = (data) =>{
      dispatch({type:CONSTANT.forgotPassword,payload: {email:data.email}})
      setemail(data.email)

    //  dispatch({type:CONSTANT.setLoginPhase,payload:3})
    }
    return (
      <div>
      <span className="text" style={{fontSize:'24px'}}>Forgot Password</span>
      <span className="text t-m space-top2">A code will be sent to the email you submit. This code will be used to reset your account password.</span>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <label>Email</label>

        <TextField fullWidth size="small" type="email"  {...register("email", {required: true})}  placeholder="Enter your email" />

        {/* <input type="text" name="username" ref={...register({ required: true})}     placeholder="Enter your email"  />  */}
        {errors.email &&  <p className="error">Email is required</p>}
          
       
        <button className="buttonSubmit space-bottom space-top click" style={{width:'100%'}} >
            <span className="white  center block">Continue</span>
        </button>
      </form>
     
      <div>
        <span className="text white block center blue space-top click" onClick={()=>dispatch({type:CONSTANT.setLoginPhase,payload:1})}>Back to Account Sign-In</span> 
      </div>
      </div>
          )
  }

 
  function showPrivacyPolicy(){
    const onSubmit = (data) =>{
      const object={
        name:data.name,
     
      }
     // dispatch({type:CONSTANT.postClient,payload: object}) 
      setShowPrivacy(false)
    }

    

    return(
      <CSSTransition
          in={showPrivacy}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
        <ReactModal
          isOpen={true}
          onRequestClose={()=> setShowPrivacy(false)}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true} 
          style={{ overlay: {}, content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            height:'90%',
            width: '90%',
            transform             : 'translate(-50%, -50%)'
            }}}>
            <div>
            <Privacy/>
            {/* <iframe  src={CONSTANT.domain+"privacy.html"}
              style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"}}
              frameborder="0"
              allowfullscreen /> */}


            </div>
            
        </ReactModal>
        </CSSTransition>
    )
  }

      
  const onSubmit = (data) =>{
    const object={
      username:data.username,
      password:data.password,
      grant_type:"password"
    }
    dispatch({type:CONSTANT.token,payload: object}) 
  }

    return (

      <div>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <div style={{background:'#02663B',height:'100vh'}}>
              <img src={require('../Asset/images/loginImage.png')} style={{width:'100%',margin:'auto',height:'inherit'}} className="center block" />
            </div>
          </Grid>
          <Grid item xs={5}>
              <div style={{padding:'20px'}}>
                <div className="center " style={{marginTop:'40px'}}>
                  <img src={require('../Asset/images/logo.png')} width="300px" />
                </div>
                <div style={{fontSize:'25px',lineHeight:'38px',marginBottom:'30px',marginTop:'0px',divor:'#03A861'}} className="bold text space-bottom space-top">
                Makolaa
                </div>
                
                {loginNav==1 && showLogin()}
                {loginNav==2 && showForgotPassword()}
                {loginNav==3 && showResetPassword()}
                {loginNav==4 && showChangePassword()}

                <div>
                <div className="loginFooter center2">
                  <div className="padding-y">
                    <div className="text center"> <span className="space-left text ">© {new Date().getFullYear()} Makolaa Micro finance.<br/> All Rights Reserved.</span></div>
                    <div onClick={()=>setShowPrivacy(true)}>
                      <span className="text center2 space-top blue click">Privacy Policy</span>
                    </div>
                  </div>
                
                  <div>
                    {showPrivacyPolicy()}
                  </div>
                </div>
                </div>
              </div>
          </Grid>
        </Grid>
      </div>
     
    );

}



