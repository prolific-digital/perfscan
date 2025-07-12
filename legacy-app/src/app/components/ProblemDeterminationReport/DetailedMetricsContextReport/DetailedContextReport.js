import React,{useState} from 'react'

const DetailedContextReport = React.createContext(0);

export function DetailsProvider({children}){
    const [jobSelect, setJobSelect] = useState(0);
    const detailsButtonClickHandle = (vl) => {
        setJobSelect(vl)
      }
    return (
        <DetailedContextReport.Provider value={{jobSelect,detailsButtonClickHandle
        }}>{children}</DetailedContextReport.Provider>
    )
}

export default DetailedContextReport;