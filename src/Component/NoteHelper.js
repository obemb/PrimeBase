import React  from 'react';

export default function NoteHelper(d) {
    const messages=d.messages
    
   return(
       <div  style={{padding:'24px ',background:'#E6F1F5'}} className="space-top2">
            <div>
                <span className="text t-l" style={{color:'#017899'}}>Please Note:</span>
            </div>
            {messages.map((data,index)=>{
           return (
               <div>
                   <div className="ruby space-top2">
                    <span className="text t-m " style={{color:'#017899',minWidth:'20px'}}>-</span>
                    <span className="text t-m " style={{color:'#017899'}}>{data}</span>
                   </div>
               </div>
           )
       })}
     </div>
   )

}



