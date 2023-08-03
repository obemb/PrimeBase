import React  from 'react';

export default function SubNavigation(d) {
    const nav=d.props.nav
    const setnav=d.props.setnav
    const type=d.props.type
    let category=localStorage.getItem("category") !=null ? localStorage.getItem("category") : "17"
    if(type==3)category="1234567"

   return(
    <div>
    <div className="ruby">
     {category.includes("1") && <span className={[nav==1 && "cfipSelect","text t-s  light space-right click"].join(" ")} onClick={()=>setnav(1)}>Guarantees</span>}
     {category.includes("2") && <span className={[nav==2 && "cfipSelect","text t-s  light space-right click"].join(" ")} onClick={()=>setnav(2)}>FGN Bonds</span>}
    {category.includes("3") && <span className={[nav==3 && "cfipSelect","text t-s  light space-right click"].join(" ")} onClick={()=>setnav(3)}>TBills</span>}
    {category.includes("4") && <span className={[nav==4 && "cfipSelect","text t-s  light space-right click"].join(" ")} onClick={()=>setnav(4)}>Corp Bonds</span>}
    {category.includes("5") && <span className={[nav==5 && "cfipSelect","text t-s  light space-right click"].join(" ")} onClick={()=>setnav(5)}>Placements</span>}
    {category.includes("6") && <span className={[nav==6 && "cfipSelect","text t-s  light space-right click"].join(" ")} onClick={()=>setnav(6)}>Bal with Banks</span>}
    {category.includes("7") && type==2 && <span className={[nav==7 && "cfipSelect","text t-s  light click"].join(" ")} onClick={()=>setnav(7)}>Trade Receivables</span>}
      
    </div>
    <hr style={{marginTop:'0px'}}/>
  </div>
   )

}
