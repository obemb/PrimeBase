import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactModal from 'react-modal'



export default function Modal({children,action, close,open=false,confirmText="Continue"}){
    return(
      <CSSTransition
      in={open}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
      <ReactModal
        isOpen={true}
        onRequestClose={()=> close()}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true} 
        appElement={document.getElementById('root') || undefined}
        style={{ overlay: {}, content : {
          top                   : '45%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          minWidth: '300px',
          transform             : 'translate(-50%, -50%)',
          display:'table',
        } }}>
          <div className="padding">
            {children}
           {action!=null &&
            <div className="push-right space-top">
              <button className="buttonCancel click"  onClick={()=> close()} >
                      <span className="text t-m">Cancel</span>
                </button>
                <button className="buttonSubmit click" style={{marginLeft:'20px'}} onClick={()=>action()}  >
                      <span className="text white t-m">{confirmText}</span>
                </button>
            </div>
            }
          </div>
        </ReactModal>
      </CSSTransition>
    )
  }