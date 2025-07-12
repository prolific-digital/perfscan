import { fetchHistoricalDataPdf } from "../../store/slices/printReportSlice/historicalDataRenderPdf";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gethistoricalPdf } from "../../store/slices/printReportSlice/historicalDataRenderPdf";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { API_URL } from "../../typeCodes";

const TestPrint=()=>{
    const dispatch = useDispatch()
    const qd = useQueryData();

    const data = useSelector(gethistoricalPdf);
    useEffect(()=>{
        dispatch(fetchHistoricalDataPdf())
    },[dispatch])
const url = API_URL+"api/renderpdf?"
    return <div>        
        <embed src={url+{...qd}} 
        type="application/pdf"
        width="100%" 
        height="800px"
        >
        </embed>
    </div>
}

export default TestPrint;