import React , {useContext, useEffect,useState} from 'react';

import { Context } from '../Util/Context';
import {CONSTANT} from '../Util/Constant';
import { useForm } from "react-hook-form";
import Modal from "./Modal"


import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { padding } from '@mui/system';
import { getEv } from '../Util/Helpers';




export default function AdminSidebar() {
  let history = useNavigate();
  const {dispatch,nav,dropdown,userInfo}=useContext(Context)
  const[showLogout,setShowLogout]=useState(false)
  const[showNewRetireModal,setShowNewRetireModal]=useState(false)
  const [navState , setNavState] =useState({mini:true,rotate:0})
  const [searchItem , setSearchItem] =useState("")
  const [period,setPeriod]=useState('1')


  const { register, handleSubmit,  formState: { errors } } = useForm();


   const select=(data)=>{
      localStorage.setItem("Ev",JSON.stringify(data))
      dispatch({type:CONSTANT.getRetire,payload: '?id='+data.id})
   }

   const navigations= [
  
    {icon:'briefcase',name:'Loans',link:'/',id:1},
    
  ] 


    return (
        <div style={{background:'#F4F5F7',zIndex:'10',minHeight:'100vh',overflow:'hidden',position:'fixed'}}>
            <div style={{margin:'120px 40px 0px 0px'}} >
          
          
            <div>
                  {navigations.map((data,index)=>{
                     let imgs= require('../Asset/images/'+data.icon+'.svg')
                    return(
                     <div key={index} className="click" style={{marginTop:'5px'}} onClick={()=>{ history(data.link) }}>
                          <div className={[nav.id==data.id ? "selectedNav" :"selectedNav2","ruby"].join(" ")} >
                             <span style={{borderRadius:'5px',background: "#8D0C18",opacity: "0.5",padding:'5px'}}><img src={imgs}/></span>
                              <span className="text-nocolor space-left2 center">{data.name}</span>
                          </div>
                      </div> 
                    )
                  })}
                
                  
                  <div className="click" style={{marginTop:'20px'}} onClick={()=> console.log('')}>
                      <div className={[nav.id==11 ? "selectedNav" :"selectedNav2","ruby"].join(" ")}>
                      <span style={{borderRadius:'5px',background: "#8D0C18",opacity: "0.5",padding:'5px'}}> <img src={require('../Asset/images/help.svg').default}/></span>
                          <span className="text-nocolor space-left2 center" style={{paddingLeft:'5px'}}>Help</span>
                      </div>
                  </div> 
                </div>
                <div style={{position:'absolute',bottom:'20px',background:'#F4F5F7',width:'100%',paddingRight:'110px'}}>
                    <div className="ruby click space-bottom2 selectedNav2" onClick={()=> setShowLogout(true)}>
                        
                    <span style={{borderRadius:'5px',background: "#8D0C18",opacity: "0.5",padding:'5px'}}> <img src={require('../Asset/images/Log-out.svg').default} /></span>
                        <span className="text  space-left2 center">Sign Out</span>
                    </div> 
                    <span className="space-left text ">© {new Date().getFullYear()} Makolaa Micro Finance Lending Company.<br/> All Rights Reserved.</span>
                
                </div>

                
    
                
          
          </div>
          {LogoutModal()}
        </div>
       
    );

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



