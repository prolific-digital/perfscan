import moment from "moment";
import useQueryData from "../../../../hooks/useQueryData";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import { useSelector } from "react-redux";
// let qd = useQueryData();
import React from 'react'

const QueryDates = () => {
    const filters = useSelector(state => state.filters) 
    const userId = getParametersFromLocalStorage("userID");
    const queryData = {
        sdate: moment(new Date()).format(),
        edate: moment(new Date()).format(),
        stime: moment(new Date()).subtract(15,'minutes').format('h:mm:ss'), 
        etime: moment(new Date()).format('h:mm:ss'),
        sysid: useQueryData().sysid,
        pd:true,
        userId : userId
    };
    return queryData;
}

// export default QueryDates
// let userId = getParametersFromLocalStorage("userID");
export const queryDateTime = {
    sdate: moment(new Date()).format(),
    edate: moment(new Date()).format(),
    stime: moment(new Date()).subtract(15,'minutes').format('h:mm:ss'), 
    etime: moment(new Date()).format('h:mm:ss'),
    // sysid: useQueryData().sysid,
    pd:true
}

