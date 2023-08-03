import React from 'react'
import Login from './Page/Login'
import LoanRequest from './Page/LoanRequest'
import RepaymentBreakdown from './Page/RepaymentBreakdown'

const route =  [
    { path: "/Login" ,  Component: Login},
    { path: "/" ,  Component: LoanRequest},
    { path: "/RepaymentBreakdown" ,  Component: RepaymentBreakdown},
  ]

export default route;