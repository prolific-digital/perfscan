import React,{useState} from 'react'
import { useEffect } from 'react';

const DetailedContext = React.createContext(0);

export function DetailsProvider({children,loadingReport}){
    const [jobSelect, setJobSelect] = useState(0);
    const detailsButtonClickHandle = (vl) => {
        setJobSelect(vl)
      }
    useEffect(()=>{
        if(!loadingReport){
            setJobSelect(0);
        }
    },[loadingReport])  
    return (
        <DetailedContext.Provider value={{jobSelect,detailsButtonClickHandle
        }}>{children}</DetailedContext.Provider>
    )
}

export default DetailedContext;