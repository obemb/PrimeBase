import React , {useContext, useEffect,useState} from 'react';
import { Context } from '../Util/Context';
import {CONSTANT} from '../Util/Constant';
import {LoadingSpinerComponent,filename, moneyFormat} from '../Util/Helpers';
import { useForm } from "react-hook-form";
import SubHeader from '../Component/SubHeader';
import { HorizontalRule, UploadFile,Edit,Delete, Search, Add, Folder, Business, HorizontalSplit, FileDownload, Backspace } from '@mui/icons-material';
import { Grid, IconButton,Button, Table, TableBody, TableCell, TableHead, TableRow,TextField, Paper, Stack, Divider, Chip, InputAdornment } from '@mui/material';
import Modal from "../Component/Modal";
import CustomTextField from '../Component/CustomTextfield';
import * as moment from 'moment';
import DatePicker from "react-datepicker";
import NumberFormatCustom from '../Component/NumberFormatCustom';
import Popup from '../Component/Popup';
import { useNavigate} from "react-router-dom";




export default function AddRetire() {
  const {dispatch,repaymentSchedule}=useContext(Context)
  let history = useNavigate();
  let _id=localStorage.getItem("Id","")
  useEffect(() => {
    const data= {
      action:"get_repayment_schedule",
      "transaction_id": _id,
    }
    dispatch({type:CONSTANT.get_repayment_schedule,payload: data})
  }, [_id]);

  return (
      <div className="main" >
         <div className='ruby center2 space-bottom'>
         <IconButton onClick={()=>history(-1)}><Backspace fontSize='small'/></IconButton>
          <span className='xl bold '>REPAYMENT SCHEDULE</span></div>
          
        <LoadingSpinerComponent area={CONSTANT.loading}/>
       <div className='push-left-right center'>
        <div>Repayment Schdule for {repaymentSchedule?.FULL_NAME}</div>
        
       </div>
        {show()}
      </div>
  );

 
  function show() {
    return (
     <div className='space-top'>
         <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><span className='bold'>MONTH COUNT</span></TableCell>
                <TableCell><span className='bold'>LOAN BALANCE</span></TableCell>
                <TableCell><span className='bold'>EXPECTED REPAYMENT AMOUNT</span></TableCell>
                <TableCell><span className='bold'>INTEREST</span></TableCell>
                <TableCell><span className='bold'>TOTAL REPAYMENT AMOUNT</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repaymentSchedule?.data?.map((data) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Stack direction={"row"} spacing={1} alignItems="center">
                        <span>{data.MONTH_COUNT}</span>
                      </Stack>
                    </TableCell>
                    <TableCell><span>{moneyFormat(data.LOAN_BALANCE)}</span></TableCell>
                    <TableCell><span>{moneyFormat(data.EXPECTED_REPAYMENT_AMOUNT)}</span></TableCell>
                    <TableCell><span>{moneyFormat(data.INTEREST)}</span></TableCell>
                    <TableCell><span>{moneyFormat(data.TOTAL_REPAYMENT_AMOUNT)}</span></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <div>
        </div>

        </Paper>
        <div className='push-left-right space-top'>
          <div>
            {basicInfo("LOAN_AMOUNT",moneyFormat(repaymentSchedule?.LOAN_AMOUNT))}
            {basicInfo("REPAYMENT_DURATION",repaymentSchedule?.REPAYMENT_DURATION)}
            {basicInfo("CUMULATIVE_REPAYMENT_AMOUNT",moneyFormat(repaymentSchedule?.CUMULATIVE_REPAYMENT_AMOUNT))}
            {basicInfo("DATE",repaymentSchedule?.DATE)}
          </div>
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

}



