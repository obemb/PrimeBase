import React , {useContext, useEffect,useState} from 'react';

import { Context } from '../Util/Context';
import {CONSTANT} from '../Util/Constant';
import { useForm } from "react-hook-form";
import Avatar, {ConfigProvider} from "react-avatar";
import Modal from "./Modal";

import {
  useLocation,
  useNavigate
} from "react-router-dom";
import AvatarBox from './AvatarBox';
import { Divider, IconButton, Stack } from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';



export default function Header() {
  let history=useNavigate()
  const {dispatch,nav,backAction,dropdown,userInfo}=useContext(Context)
  const[showComment,setShowComment]= useState(false)
  const[showLogout,setShowLogout]=useState(false)
  const[readComment,setReadComment]= useState(-1)
  const[xx,setxx]= useState(null)

  const { register, handleSubmit, errors } = useForm();


  useEffect(() => {
   }, []);

    return (
        <div>
            <div style={{background:'#8D0C18',color:'white', position:'fixed',width:'100%',padding:'5px 10px',zIndex:'100'}} >
                <div className="push-left-right" >
                   <div className="ruby center2" >
                      <div className="click" onClick={()=> dispatch({type:CONSTANT.navigate,payload: 1}) }>
                          <img   src={require('../Asset/images/logo.png')} width={120}/>
                      </div>
                      <span className="white  lg center2" style={{padding:'10px 105px 0px 10px'}}>Makolaa Micro Finance</span> 

                      <div className='ruby center2'>

                    

                      <Divider orientation="vertical" flexItem className='white' />
                    
                     
                      <span className="white  lg" style={{padding:'10px 0px 0px 30px'}}>{dropdown?.ev}</span> 
                  
                   
                 
                   </div>
                    </div>

                   <div className="ruby center" style={{paddingRight:'20px'}}>
                        <AvatarBox name={localStorage.getItem("fullname")} image={""} showname={false}/>
                       
                        <div className="space-right space-left2">
                            <span style={{paddingBottom:'5px',paddingTop:'2px',divor:'#010101'}} className="text white">{userInfo?.fullName}</span>
                            <span className=" sm white">{localStorage.getItem("fullname")}</span>
                        </div>
                   </div>
                  
                </div>
            </div>   
            {LogoutModal()}  
        </div>   
    );

    function getUserRole(data){
        switch (data){
            case 1: return "Staff - Account"
            case 2: return "Reviewer - Account"
            case 3: return "Admin - Account"
        }
    }

    function LogoutModal(){
        const action=()=>{
          setShowLogout(false);  dispatch({type:CONSTANT.logout})
        }
          return(
            <Modal
             action={()=>action()}
             close={()=>setShowLogout(false)}
             open={showLogout}
             confirmText={"Yes, Logout"}
             >
                <div className="padding1">
                  <div className="center2 space-bottom"><img className="floatingTop" src={require('../Asset/images/signout.svg').default}/></div>
                  <div><span className="text t-l bold space-bottom dark center2" >Account Sign Out</span></div>
                  <label className="center2">Do you want to sign out from your account?</label>
                 
                </div>
            </Modal>
          )
        }

}



