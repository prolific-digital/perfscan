import { useSelector } from "react-redux";
import { getSaveNewReportData } from "../store/slices/reports/SaveNewReport/SaveNewReport";
import { getUuidData } from "../store/slices/reports/SaveNewReport/SaveNewReport";

const useSaveExistingReportDataPeriodVsPeriod = () => {
    const filters = useSelector(state => state.filters);
    const savedReport = useSelector(getSaveNewReportData);
    const uuid = useSelector(getUuidData);

    const saveReportData = {
        dates: [{
            sdate: filters.period_filter[0] && filters.period_filter[0].sdate ? filters.period_filter[0].sdate : new Date().getDate(), 
            edate: filters.period_filter[0] && filters.period_filter[0].edate ? filters.period_filter[0].edate : new Date().getDate(),
            stime: filters.period_filter[0] && filters.period_filter[0].stime ? filters.period_filter[0].stime : new Date().getTime(), 
            etime: filters.period_filter[0] && filters.period_filter[0].etime ? filters.period_filter[0].etime : new Date().getTime() 
        },
        {
            sdate: filters.period_filter[1] && filters.period_filter[1].sdate ? filters.period_filter[1].sdate : new Date().getDate(), 
            edate: filters.period_filter[1] && filters.period_filter[1].edate ? filters.period_filter[1].edate : new Date().getDate(),
            stime: filters.period_filter[1] && filters.period_filter[1].stime ? filters.period_filter[1].stime : new Date().getTime(), 
            etime: filters.period_filter[1] && filters.period_filter[1].etime ? filters.period_filter[1].etime : new Date().getTime() 
        }],
        ...(filters.system_filter && filters.period_save_filter.sysOpt === 'Single' ? {sysname: filters.system_filter.entity_name}:
            {sysname: [filters.system_filter.entity_name,filters._system_filter.entity_name]}),
        ...(savedReport.data.tempFileName && { tempFileName: savedReport.data.tempFileName }),
        ...({fileName: filters.period_save_filter.filename}),
        ...({saveReport: filters.period_save_filter.saveReport+""}),
        ...(uuid.data.uniqueid && {uniqueid: uuid.data.uniqueid})

    };

    return saveReportData;
}

export default useSaveExistingReportDataPeriodVsPeriod;