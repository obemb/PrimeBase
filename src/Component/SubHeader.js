import React , {useContext, useEffect,useState} from 'react';
import { Context } from '../Util/Context';

export default function SubHeader({}) {
    const {nav}=useContext(Context)
    return(
        <div>
            <span className="text t-title">{nav.name}</span>
        </div>
    )
}