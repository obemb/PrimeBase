import React from 'react'
import Login from './Page/Login'
import LoanRequest from './Page/LoanRequest'
import repaymentSchedule from './Page/RepaymentBreakdown'

const route =  [
    { path: "/Login" ,  Component: Login},
    { path: "/" ,  Component: LoanRequest},
    { path: "/repaymentSchedule" ,  Component: repaymentSchedule},
  ]

export default route;