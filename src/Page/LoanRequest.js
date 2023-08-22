import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Util/Context';
import { CONSTANT } from '../Util/Constant';
import { LoadingSpinerComponent, filename, moneyFormat } from '../Util/Helpers';
import { useForm } from "react-hook-form";
import SubHeader from '../Component/SubHeader';
import { HorizontalRule, UploadFile, Edit, Delete, Search, Add, Folder, Business, Backspace, Download } from '@mui/icons-material';
import { Grid, IconButton, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, Stack, InputAdornment,TablePagination, TableFooter, Pagination } from '@mui/material';
import Modal from "../Component/Modal";
import CustomTextField from '../Component/CustomTextfield';
import * as moment from 'moment';
import DatePicker from "react-datepicker";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import AvatarBox from '../Component/AvatarBox';
import NumberFormatCustom from '../Component/NumberFormatCustom';



export default function Retires() {
  let history = useNavigate();
  const { dispatch, loans,repaymentSchedule } = useContext(Context)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchItem, setSearchItem] = useState("")
  const [showMore, setShowMore] = useState(false)
  const [_data, set_data] = useState({})
  const [showAdd, setShowAdd] = useState(false)

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  let totalPage=1

  const handlePage = (page) => setPage(page);

  

  useEffect(() => {
    const data= {
      action:"get_all_loan_request",
      "transaction_id": "",
    }
    dispatch({ type: CONSTANT.navigate, payload: 1 })
    dispatch({ type: CONSTANT.get_all_loan_request, payload:data })
  }, []);

  return (
    <div className="main" >
      {content()}
      {AddNew()}

      <LoadingSpinerComponent area={CONSTANT.loading} />
    </div>
  );

  function content() {
    return (
      <div>
        <div><span className='xl bold '>All Loan Requests</span></div>
        <div className='push-left-right space-bottom space-top'>
          <CustomTextField width="auto" action={setSearchItem} placeholder="Search Loan Requests" icon={<Search />} />
          <div>
          <Button  className="space-right2" variant="outlined" startIcon={<Download sx={{ color: "#8D0C18" }} />} >Download</Button>
            
          <Button variant="contained" startIcon={<Add sx={{ color: "white" }}/>} onClick={()=> setShowAdd(true)} >Request for Loan</Button>
          </div>
        </div>

        <div className="push-left-right">
          <div style={{ width: '100%' }}>
            {show()}
          </div>
          <div style={{ width: showMore  ? '80%' : '0%', overflow: 'hidden', borderLeft: showMore != null && '1px solid #CFD4D7' }}>
            {showInfo()}
          </div>
        </div>

      </div>
    )
  }

  function getDescription(datas){
    let d=""
    datas?.map((data)=>{
        if(d=="") d=data.description
        else d=d+", "+data.description
    })
    return d
  }

  function filtered(){

    const data=loans?.data?.filter(x=>x?.FULL_NAME?.toLowerCase().includes(searchItem.toLowerCase()))

    const pageContent = data?.slice((page - 1) * pageSize, page * pageSize)

    totalPage=(Math.ceil(data?.length / pageSize))
    return pageContent
  }

  function show() {
    const open =(d)=>{
      const data= {
        action:"get_repayment_schedule",
        "transaction_id": d.TRANSACTION_ID,
      }
      localStorage.setItem("Id",d.TRANSACTION_ID)
      dispatch({type:CONSTANT.get_repayment_schedule,payload: data})
      setShowMore(true)
    }
    const open2 =(d)=>{
      localStorage.setItem("Id",d.TRANSACTION_ID)
      history('/repaymentSchedule')
     
  }
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><span className='bold'>TRANSACTION_ID</span></TableCell>
                <TableCell><span className='bold'>FULL_NAME</span></TableCell>
                <TableCell><span className='bold'>LOAN_AMOUNT</span></TableCell>
                {!showMore &&<TableCell><span className='bold'>REPAYMENT_DURATION</span></TableCell>}
                {!showMore &&<TableCell><span className='bold'>CREATED_TIME</span></TableCell>}
                 {!showMore && <TableCell style={{ width: '10%' }}><span className='bold'>Actions</span></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered()?.map((data) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Stack direction={"row"} spacing={1} alignItems="center">
                        <Business />
                        <span className='click underline blue' onClick={()=>open2(data)}>{data.TRANSACTION_ID}</span>
                      </Stack>
                    </TableCell>
                    <TableCell><span>{data.FULL_NAME}</span></TableCell>
                    <TableCell><span>{moneyFormat(data.LOAN_AMOUNT)}</span></TableCell>
                    {!showMore && <TableCell><span>{data.REPAYMENT_DURATION}</span></TableCell>}
                    {!showMore && <TableCell>{moment(data.CREATED_TIME).format("DD/MM/YYYY")}</TableCell>}
                    {!showMore && <TableCell>
                     
                          <Button  onClick={() => open(data) }>View</Button>
                        
                   
                    </TableCell>}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {loans?.total_search_record == 0 && <span className="text italic block t-l center padding-y light">No Data</span>}
          <div className='push-right'>
          <Pagination
                  color="primary"
                  count={totalPage}
                  onChange={(event, value) => handlePage(value)}
                  page={page}
                  size="large"
                ></Pagination>
                </div>
        </Paper>
      </div>
    )
  }


  function showInfo() {
    return (
      <div className="padding">
       <div className="ruby center">
         <IconButton onClick={() => setShowMore(false)}><Backspace fontSize='small'/></IconButton>
         <span className="space-left2 text t-m">{repaymentSchedule?.TRANSACTION_ID}</span>
        </div>
      
        <div style={{ borderRadius: '3px', padding: '10px 15px', background: '#F9F9FA', marginTop: '0px',height:'80vh',overflowY:'auto'}}>
          <div>
            <div className="ruby space-bottom2 center">
              <span className="text light">Staff Name:</span>
              <span className="text space-left2"> <AvatarBox image={""} name={repaymentSchedule?.FULL_NAME} showname={true} /></span>
            </div>
          </div>

          {repaymentSchedule?.data?.map((data)=>{
            return (
              <Paper className='space-top2'>
              <div className='box'>
                  {basicInfo("MONTH COUNT", data?.MONTH_COUNT)}
                  {basicInfo("LOAN BALANCE", moneyFormat(data.LOAN_BALANCE))}
                  {basicInfo("EXPECTED REPAYMENT AMOUNT", moneyFormat(data.EXPECTED_REPAYMENT_AMOUNT))}
                  {basicInfo("INTEREST", moneyFormat(data.INTEREST))}
                  {basicInfo("TOTAL REPAYMENT AMOUNT", moneyFormat(data.TOTAL_REPAYMENT_AMOUNT))}
                </div>
              </Paper>
            )
          })}
      </div>
      </div>

    )
  }

  function basicInfo(name, detail,type=1) {
    return (
      <div>
        <div className="ruby space-bottom2">
          <span className="text light">{name + ":"}</span>
          {type==1?
            <span className="text space-left2">{(detail+"").replace("\\r\\n", "\n")}</span>
            :  <a href={detail} target="_blank"><span className="text space-left2 blue">Download Receipt</span></a>}
        </div>
      </div>
    )
  }


  function AddNew(){
    const onSubmit =(e)=>{
      const data={
        action:'request_for_loan',
        full_name:e.fullname,
        loan_amount:(e.amount+'')?.replace(',',''),
        repayment_duration:e.duration
      }
      dispatch({type:CONSTANT.request_for_loan,payload:data,reset:setShowAdd})
    }
      return(
        <Modal
         close={()=>setShowAdd(false)}
         open={showAdd}
         confirmText={"Request for Loan"}
         >
            <div className="padding1" style={{width:'400px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
             <span className='lg bold'>Request for Loan</span>

             <Grid container spacing={2}>
             <Grid item md={12}>
              <label>Full Name</label>
              <TextField fullWidth size="small" type="text"  {...register("fullname", {required: true})}
                placeholder="Enter full name" />
                {errors.firstName &&  <p className="error">Full name is required</p>}
             </Grid>
            <Grid item md={12}>
              <label>Loan Amount</label>
              <TextField 
               InputProps={{
                inputComponent: NumberFormatCustom,
                startAdornment: (
                  <InputAdornment position="start">
                    <div className="sign">{"₦"}</div>
                  </InputAdornment>
                ),
              }}
              fullWidth size="small"  {...register("amount")} placeholder="Enter amount" />
                {errors.lastName &&  <p className="error">Loan amount is required</p>}
            </Grid>
            <Grid item md={12}>
              <label>Duration (Months)</label>
              <TextField fullWidth size="small" type="number"  {...register("duration", {required: true})}
                placeholder="Enter duration in months" />
                {errors.duration &&  <p className="error">Duration is required</p>}
            </Grid>
          </Grid>
             
            <div className='push-right space-top'>
                <Button type="submit" variant="contained" >
                    Request for Loan
                </Button>
            </div>
            </form>
            </div>
        </Modal>
      )
  }


}



