import React, { useState, useRef } from "react";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'; 
import { Toast } from 'primereact/toast';

import "./RadioCards.scss"

const RadioCard = (props) => {
    const [selected, setSelected] = useState('');
    const {data, curLogo, selLogo, delLogo, type, title, selLogoName, selLogoPath, setSelLogo} = props;
    const toast = useRef(null);

    const setLogo = (url, name, iPath, height, width) => {       
        selLogo(url);
        setSelected(name);
        selLogoName(name);
        selLogoPath(iPath);
        setSelLogo({
            url: url,
            name: name,
            iPath : iPath,
            height: height,
            width: width
        });
    }

    const confirm2 = (event, lname) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this logo?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept:()=>accept(lname),
            reject:()=>reject(lname)
        });
    };

    const accept = (lname) => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: `You have accepted to delete ${lname}`, life: 3000 });
        delLogo(lname);
    };

    const reject = (lname) => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: `You have rejected to delete ${lname}`, life: 3000 });
    };
        
    return (<>
            <Toast ref={toast} />
            <ConfirmPopup />
            
            {data.length &&
                data.map((d,key) => {
                    return (
                        <div style={{display:"flex", flexDirection:"row"}} key={`${type}_${key}`}>
                            <label className="container">
                                <input type="radio" name={type} value={d.name} onChange={()=>setLogo(d.url, d.name, d.iPath, d.height, d.width)} defaultChecked={d.name === curLogo ? 'checked' : ''} />
                                <span className="checkmark"></span>
                                <img src={d.url} className="logo_img"/>
                            </label>
                            {d.name !== 'perfscan_logo_nobg.png' &&
                                <span className="del" onClick={(evt)=> confirm2(evt, d.name)}>X</span>
                            }
                        </div>
                    )
                })   
            }
        </>)
}

export default RadioCard;