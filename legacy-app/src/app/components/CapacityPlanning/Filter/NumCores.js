import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputNumber } from 'primereact/inputnumber';

import { getCurrent, getProposed, setCPWProposed, setNCoreProposed, getAutoSys } from "../../../../store/slices/capacityplanning/CapacityPlanningSlice"
import { capacitySaveFilter } from "../../../../store/slices/searchFilter";
import { getCPWPerCore } from "../../../../helpers/capacityHelper";

const NumCores = () => {
    const current = useSelector(getCurrent);
    const proposed = useSelector(getProposed);
    const autoSys = useSelector(getAutoSys);

    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    let capacityFilter = filters.capacity_filter;

    const setCores = (e) => {
        const max_cpw = capacityFilter.proposed.max_cpw;
        const max_cores = capacityFilter.proposed.max_cores;
        const cpw = getCPWPerCore(e, max_cores, max_cpw);

        dispatch(setNCoreProposed(e));
        dispatch(setCPWProposed(cpw));
        dispatch(capacitySaveFilter(
        {
                ...capacityFilter, 
                current : 
                    {...current, 
                        cores : current.cores
                    },  
                proposed :
                    {...proposed, 
                        cores: e
                    }
        }));
    }

    return (
        <>
            <div className="build_para_card_capacity">
                <div className="build_title">Num of Cores</div>
                <div className="numCores">
                    <div className="cores">
                        <div className="label">Current : </div><div className="labelCurrent">{ current.cores }</div>
                    </div>
                    <div className="cores">
                        <div className="label">Proposed : </div>
                        <div>
                            <InputNumber inputId="stacked-buttons" 
                                value={capacityFilter.sysOpt === "current" ? current.cores : proposed.cores} 
                                onValueChange={(e) => setCores(e.value)} step={0.25} 
                                showButtons 
                                mode="decimal" 
                                min={0} max={proposed.max_cores} 
                                style={{height:'45px'}}
                                 /> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NumCores;