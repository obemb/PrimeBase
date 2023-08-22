import React , {useState,useReducer, useEffect,useCallback} from 'react';
import {Context} from './Util/Context'
import {CONSTANT} from './Util/Constant';
import axios from 'axios';
import PageRoutes from './Routes'
import AdminSidebar from './Component/AdminSidebar'
import Header from './Component/Header'
import { getEv, LoadingSpinerComponent} from './Util/Helpers';
import toastr from "toastr"
import { Route, Routes, useNavigate,useLocation} from "react-router-dom";
import { trackPromise} from 'react-promise-tracker';
import qs from 'qs'
import './App.css'
import { gsap } from "gsap";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import { Grid } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import fileDownload from 'js-file-download'
function App() {
  let history = useNavigate();
  let location = useLocation();

  useEffect(() => {
   
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0000ff',
      },
    },
    typography: {
      allVariants: {
        textTransform: "none"
      }
    },
    "overrides": {
      MuiSvgIcon: {
        colorPrimary: {
          color: ["#000", "!important"],
        },
        colorSecondary: {
          color: ["#d5d7d8", "!important"],
        },
      },
    }
  });


  function reducer(state, action){
    switch (action.type){
      case CONSTANT.setLoginPhase:
        return setLoginNav(action.payload)
      case CONSTANT.error:
        toastr.error(action.payload)
        break
      case CONSTANT.navigate:
        return navigate(action.payload,action.back)
      case CONSTANT.forgotPassword:
      case CONSTANT.resetPassword:
      case CONSTANT.get_all_loan_request:
      case CONSTANT.get_repayment_schedule:
      case CONSTANT.request_for_loan:
      case CONSTANT.subscribe:
        return simplePostRequest(action.type,action.payload,action.reset,action.reset2,action.reset3,action.reset4);
      case CONSTANT.token:
        const d={
          username:"username",
          fullname:"Peter Ihaza",
          token:"token"
        }
        login(d)
        break;
      case CONSTANT.logout:
        return logout();
      default:
        return state;
    }
  }
 
  function navigate(data,back){
    setBackAction(back)
    switch (data){
      case 0:
        setNav({id:0,name:"login"})
        break;
      case 1:
        setNav({id:1,name:"Loans"})
        break;
     default:
        setNav(data)
        break;
    }
  }

  
  const initialState={
    selectedPage :'Home',
    hover:'Home',
  }

  
  const memoizedReducer = useCallback(reducer, [])
  const [initial,dispatch]=useReducer(memoizedReducer,[])
  const [loginNav,setLoginNav]=useState(1)
  const [userInfo, setUserInfo] = useState({})
  
  const sleep =(ms)=> new Promise(resolve=> setTimeout(resolve,ms))
  
  const [_state, set_State] = useState(initialState)
  const [backAction, setBackAction] = useState({})
  const[base_url, setbase_url]=useState(CONSTANT.domainApi)
  const [nav, setNav]= useState({});
  const [resetCode,setResetCode]=useState("")

  const [loans,setLoans]=useState({})
  const [repaymentSchedule,setRepaymentSchedule]=useState({})
 
  function simplePostRequest(url,object, reset=null,reset2=null,reset3=null,reset4=null){
    initialMessage(url)
    trackPromise(
    axios({url:base_url + url,method:'POST',data:object, 
    headers: { 
      'accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    }
    }).then(result =>{
    switch (url){ 
      case CONSTANT.login:
      case CONSTANT.changePassword:
        toastr.remove()
        login(result.data)
        break;
      case CONSTANT.subscribe:
          toastr.success(result.data.status)
          break;
      case CONSTANT.forgotPassword:
        toastr.success(result.data.status)
        setLoginNav(3)
        setResetCode(result.data?.reset?.code)
        break;
      case CONSTANT.resetPassword:
        toastr.success(result.data.message)
        setLoginNav(1)
        dispatch({type:CONSTANT.set_State,payload:0})
        break;
      case CONSTANT.get_all_loan_request:
      case CONSTANT.get_repayment_schedule:
      case CONSTANT.request_for_loan:
        toastr.remove()
        if(object?.action=="get_repayment_schedule")  setRepaymentSchedule(result.data)
        else if(object?.action=="get_all_loan_request") setLoans(result.data) 
        else if(object?.action=="request_for_loan"){
          const d= {
            action:"get_all_loan_request",
            "transaction_id": "",
          }
          dispatch({ type: CONSTANT.get_all_loan_request, payload:d })
          toastr.success(result.data.message)
        }
        break;
      default:
        toastr.success(result.data.message,null,{preventDuplicates :true})
          break;
      }
        reset!=null && reset(false)
        return result.data;
    }).catch((e)=>{
      reset!=null && reset(false)
      return (
        <div>
          {toastr.clear()}
          {toastr.error((e.response!=null) ? (e.response.data.constructor === String ? e.response.data :e.response.data?.Message ): e.message)}
       
        </div>
      )}
    ), CONSTANT.loading)
  }



  function logout(){
    saveToLocalStorage({})
    history('login')
  }

  function login(data){
    saveToLocalStorage(data)
    toastr.remove()
    toastr.success(data.message)
    history('/')
  }
  
  function initialMessage(url){
    switch (url){ 
      case CONSTANT.login:
      case CONSTANT.get_all_loan_request:
        toastr.info("Please wait",null,{showMethod :'slideDown',
                                        progressBar:true,
                                        positionClass:'toast-top-center',
                                        preventDuplicates:true,
                                        timeOut:'0',
                                        tapToDismiss: false,
                                    })
        break;
    }
  }

  

function saveToLocalStorage(data){
  localStorage.setItem("fullname", data?.fullname);
  localStorage.setItem("token", data?.token);
}

  return (
    <div style={{position:'relative'}} >
        <ThemeProvider theme={theme}>
        <Context.Provider value={{dispatch,nav,loginNav,loans,repaymentSchedule}}>
            {nav.id!=0 && 
            <div>
                <Header />
            </div>
            }
              <Grid container spacing={0}>
                {nav.id!=0 &&  <Grid item xs={3}>
                  <AdminSidebar/>
                </Grid>}
                <Grid item xs={nav.id!=0?9:12}>
                    <div>
                      <Routes>
                      {PageRoutes.map(({ path, Component }) => (
                        <Route key={path}  exact path={path} 
                        element={
                          <div className={nav.id!=0 ? 'page' :'page2'}>
                          <div>
                            <Component />
                          </div>
                        </div>
                        }/>
                        
                      ))}
                      </Routes>
                  </div>  
                </Grid>
              </Grid>
        </Context.Provider>
        </ThemeProvider>
       <div className='center' style={{width:'100%'}}><LoadingSpinerComponent/></div> 
    </div>
  );
}

export default App;
