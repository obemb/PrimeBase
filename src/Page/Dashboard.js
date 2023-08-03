import React , {useContext, useEffect,useState} from 'react';

import { Context } from '../Util/Context';
import {CONSTANT} from '../Util/Constant';
import {LoadingSpinerComponent,moneyFormat,stripText} from '../Util/Helpers';
import { Grid, IconButton,Button, Table, TableBody, TableCell, TableHead, TableRow,TextField, Paper, Divider, Stack } from '@mui/material';
import { useForm } from "react-hook-form";
import toastr from "toastr"
import {
  useLocation,
} from "react-router-dom";
 import Chart from 'react-apexcharts'


export default function Home() {
  const {dispatch,summary}=useContext(Context)

  const [nav, setNav] =useState(1)
  const [IINav, setIINav] =useState(1)
  const [selectedECLType, setSelectedECLType] =useState(1)

  useEffect(() => {
    dispatch({type:CONSTANT.navigate,payload: 1})
   
    dispatch({type:CONSTANT.getSummary})
   // dispatch({type:CONSTANT.getIndustries})
   }, []);



   const ECLType=[{id:1,name:"Guarantee"},{id:2,name:'Investments'}]

    return (
       summary?.value1!=null && <div className="main" >
          <div className="push-left-right  space-bottom2 center">
            <div className="ruby">
              <div><span className="text t-title space-right">Dashboard</span></div>
             
            </div>
          </div>
          <Grid container spacing={0} className="space-bottom">
            <Grid item md={6} >
              <div className="box space-right" style={{height:'350px', overflowY:'hidden'}}>
               {d1()}
              </div>
            </Grid>
            <Grid item md ={6} >
              <div className="box" style={{height:'350px', overflowY:'hidden'}}>
               {d2()}
              </div>
            </Grid>
          </Grid>
        
          <Grid container spacing={0}>
            <Grid item  md ={12} >
              <div className="box space-bottom" style={{height:'400px', overflowY:'hidden'}}>
                {d3()}
              </div>
            </Grid>
             <Grid item  md ={12} >
             <div className="box" style={{height:'400px', overflowY:'hidden'}}>
               {d4()}
             </div>
           </Grid>
           <Grid item  md ={12} >
             <div className="box" style={{height:'400px', overflowY:'hidden'}}>
               {d5()}
             </div>
           </Grid>
          </Grid>


        </div>
       
    );

    function _sum(d){
        let sum=0;
        if(d!=null){
        d?.forEach(item => {
            sum+=item
        });
    }
         return sum
         
    }

    function d1(){
      var chartOptions= {
        chart: {
            width: 580,
        },
        plotOptions: {
          pie: {
            donut: {
              size: '50%'
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        },
      
        labels: summary.label1,
     
        colors: ['#237CBF','#4CAB48'  ], 
        
    }
      return (
        <div>
          <div><span className="text md bold darker space-bottom">Advance Categories</span></div>
          <Grid container spacing={1}>
            <Grid item style={{borderRight:'solid 2px #CFD4D7',paddingTop:'10px',paddingRight:"20px"}}>
              <div><span className="text bold space-bottom2 center block" style={{fontSize:'38px'}}>{_sum(summary.value1)}</span></div>
              <div><span className="text light center block">Total</span></div>
              <div></div>
            </Grid>
            <Grid item>
              <div><span className="text bold space-bottom2 space-top2 center block" style={{fontSize:'16px'}}>{summary.value1[0]}</span></div>
              <div><span className="text light center block">Billable</span></div>
            </Grid>
            <Grid item>
              <div><span className="text bold space-bottom2  space-top2 center block" style={{fontSize:'16px'}}>{summary.value1[1]}</span></div>
              <div><span className="text light center block">Non-Billable</span></div>
            </Grid>
          </Grid>
          <div className="space-top" id="chart">
            <Chart
                options={chartOptions}
                series={summary.value1}
                chartOptions={chartOptions}
                type="donut"
                height="200" 
              />
          </div>
          
        </div>
      )
    }


    function d2(){
           const options= {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: summary.label2,
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }
      return (
        <div>
          <div><span className="text bold  t-m darker">Transaction Distribution</span></div>
          
          <div style={{marginTop:'30px'}}>
          <Chart options={options} series={summary.value2} type="pie" width={380} />
         </div>
          
        </div>
      )
    }

    function d3(){
      const series= [{
            data: summary.value3,
            name: 'Amount',
          }];
         const options= {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: false,
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: summary.label3,
            
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  return  moneyFormat(value,"₦");
                }
              }
            },
           
           
          };
   return (
     <div>
       <div><span className="text bold t-m darker">Distribution by Unit</span></div>
       
       <div id="chart">
      {_sum(summary.value3)>0 && <Chart options={options} series={series} type="bar" height={350} />}
      </div>
       
     </div>
   )
 
}

function d4(){
     const series= [{
          name: 'Amount',
          data: summary.value5,
        }];
        const options= {
          annotations: {
            points: [{
              x: 'Amount',
              seriesIndex: 0,
              label: {
                borderColor: '#775DD0',
                offsetY: 0,
                style: {
                  color: '#fff',
                  background: '#775DD0',
                },
                text: '',
              }
            }]
          },
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '50%',
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 0
          },
          
          grid: {
            row: {
              colors: ['#fff', '#f2f2f2']
            }
          },
          xaxis: {
            labels: {
              rotate: -90
            },
            categories: summary.label5,
            tickPlacement: 'on'
          },
          yaxis: {
            title: {
              text: 'Amount',
            },
            labels: {
              formatter: function (value) {
                return  moneyFormat(value,"₦");
              }
            },
            
      floating: false,
      
            ticks: {
                beginAtZero: true,
                userCallback: function(label, index, labels) {
                    // when the floored value is the same as the value we have a whole number
                    if (Math.floor(label) === label) {
                        return label;
                    }

                },
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100]
            },
          }
        }
 return (
   <div>
     <div><span className="text bold t-m darker">Distribution by Month</span></div>
     
     <div id="chart">
     <Chart options={options} series={series} type="bar" height={350} />
     </div>
     
   </div>
 )
 }

 function d5(){
  const series= [{
       name: 'Amount',
       data: summary.value4,
     }];
     const options= {
       annotations: {
         points: [{
           x: 'Amount',
           seriesIndex: 0,
           label: {
             borderColor: '#775DD0',
             offsetY: 0,
             style: {
               color: '#fff',
               background: '#775DD0',
             },
             text: '',
           }
         }]
       },
       chart: {
         height: 350,
         type: 'bar',
       },
       plotOptions: {
         bar: {
           borderRadius: 0,
           columnWidth: '50%',
         }
       },
       dataLabels: {
         enabled: false
       },
       stroke: {
         width: 0
       },
       
       grid: {
         row: {
           colors: ['#fff', '#f2f2f2']
         }
       },
       xaxis: {
         labels: {
           rotate: -90
         },
         categories: summary.label4,
         tickPlacement: 'on'
       },
       yaxis: {
         title: {
           text: 'Amount',
         },
         labels: {
           formatter: function (value) {
             return  moneyFormat(value,"₦");
           }
         },
         
   floating: false,
   
         ticks: {
             beginAtZero: true,
             userCallback: function(label, index, labels) {
                 // when the floored value is the same as the value we have a whole number
                 if (Math.floor(label) === label) {
                     return label;
                 }

             },
         }
       },
       fill: {
         type: 'gradient',
         gradient: {
           shade: 'light',
           type: "horizontal",
           shadeIntensity: 0.25,
           gradientToColors: undefined,
           inverseColors: true,
           opacityFrom: 0.85,
           opacityTo: 0.85,
           stops: [50, 0, 100]
         },
       }
     }
return (
<div>
  <div><span className="text bold t-m darker">Distribution by Engagements</span></div>
  
  <div id="chart">
  <Chart options={options} series={series} type="bar" height={350} />
  </div>
  
</div>
)
}

  
  
}



