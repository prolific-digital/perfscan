import React, {useState} from "react";
import { useSelector } from "react-redux";
import { InputNumber } from 'primereact/inputnumber';
import { getProposedGrowth, setProposedGrowth } from "../../../../store/slices/capacityplanning/CapacityPlanningSlice";
import { capacitySaveFilter } from "../../../../store/slices/searchFilter";
import { useDispatch } from "react-redux";

const ProposedGrowth = () => {
    const [value, setValue] = useState('');
    const perc_growth = useSelector(getProposedGrowth);
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    let capacityFilter = filters.capacity_filter;

    const setGrowth = (e) => {
        setValue(e);
        dispatch(setProposedGrowth(e));
        dispatch(capacitySaveFilter({...capacityFilter, perc_growth: e}));
    }
    return (
        <>
            <div className="build_para_card_capacity">
                <div className="build_title">Additional Workload % (Optional)</div>
                <div className="filter_option">
                    <InputNumber inputId="stacked-buttons" value={perc_growth} onValueChange={(e) => setGrowth(e.value)} showButtons mode="decimal" min={0} minFractionDigits={0} maxFractionDigits={2} style={{height:'45px'}}/>
                </div>
            </div>
        </>
    )
}

export default ProposedGrowth;