import { createSlice} from '@reduxjs/toolkit';
import * as _ from 'lodash'

import { CAPACITY_FILTER } from '../../../typeCodes';


const initialState = {
  system_filter: _.isEmpty(localStorage.getItem('systemfilter')) ? {} : JSON.parse(localStorage.getItem('systemfilter')), //for system for all pages and pvp system 1
  _system_filter: _.isEmpty(localStorage.getItem('_systemfilter')) ? {} : JSON.parse(localStorage.getItem('_systemfilter')), //for pvp system 2
  historical_date_filter : _.isEmpty(localStorage.getItem('HistoricalFilter')) ? {} : JSON.parse(localStorage.getItem('HistoricalFilter')),
  historical_save_filter : _.isEmpty(localStorage.getItem('HistoricalSaveFilter')) ? {} : JSON.parse(localStorage.getItem('HistoricalSaveFilter')),
  whats_changed_date_filter : _.isEmpty(localStorage.getItem('WhatsChangedFilter')) ? {} : JSON.parse(localStorage.getItem('WhatsChangedFilter')),
  whats_changed_save_filter : _.isEmpty(localStorage.getItem('WhatsChangedSaveFilter')) ? {} : JSON.parse(localStorage.getItem('WhatsChangedSaveFilter')),
  problem_determination_date_filter : _.isEmpty(localStorage.getItem('ProblemDeterminationFilter')) ? {} : JSON.parse(localStorage.getItem('ProblemDeterminationFilter')),
  problem_determination_save_filter : _.isEmpty(localStorage.getItem('ProblemDeterminationSaveFilter')) ? {} : JSON.parse(localStorage.getItem('ProblemDeterminationSaveFilter')),
  period_filter : _.isEmpty(localStorage.getItem('PeriodFilter')) ? {} : JSON.parse(localStorage.getItem('PeriodFilter')),
  period_save_filter : _.isEmpty(localStorage.getItem('PeriodSaveFilter')) ? {filename:'', saveReport: false, sysOpt: 'Single'} : JSON.parse(localStorage.getItem('PeriodSaveFilter')),
  date_filter : _.isEmpty(localStorage.getItem('datefilter')) ? {} : JSON.parse(localStorage.getItem('datefilter')),
  uniqueid: _.isEmpty(localStorage.getItem('uniqueId')) ? {} : JSON.parse(localStorage.getItem('uniqueId')),
  event_filter: {},
  //capacity_filter : _.isEmpty(localStorage.getItem('CapacityFilter')) ? {...CAPACITY_FILTER} : JSON.parse(localStorage.getItem('CapacityFilter')),
  capacity_filter : {...CAPACITY_FILTER, userId: localStorage.getItem('userID')}
};

const filterSlice = createSlice({
    name: 'filters',
  initialState,
  reducers: {
        systemFilter: (state, { payload }) => {
                state.system_filter = payload
        },
        _systemFilter: (state, { payload }) => {
                state._system_filter = payload
        },
        historicalDateFilter: (state, { payload }) => {
                state.historical_date_filter = payload
        },
        historicalSaveFilter : (state, {payload}) => {
                state.historical_save_filter = payload
        },
        whatsChangedDateFilter: (state, { payload }) => {
                state.whats_changed_date_filter = payload
        },
        whatsChangedSaveFilter : (state, {payload}) => {
                state.whats_changed_save_filter = payload
        },
        problemDeterminationDateFilter: (state, { payload }) => {
                state.problem_determination_date_filter = payload
        },
        problemDeterminationSaveFilter : (state, {payload}) => {
                state.problem_determination_save_filter = payload
        },
        dateFilter: (state, { payload }) => {
                state.date_filter = payload
        },
        periodFilter: (state, { payload }) => {
                state.period_filter = payload
        },
        periodSaveFilter : (state, {payload}) => {
                state.period_save_filter = payload
        },
        eventFilter: (state, { payload }) => {
                state.event_filter = payload
        },
        uniqueId : (state,{payload})=>{
                state.uniqueid = payload
        },
        capacitySaveFilter : (state, {payload}) => {
                state.capacity_filter = payload
        },
    }
})

export const {
  systemFilter,
  _systemFilter,
  historicalDateFilter,
  historicalSaveFilter, 
  whatsChangedDateFilter,
  whatsChangedSaveFilter,
  problemDeterminationDateFilter,
  periodFilter,
  periodSaveFilter,
  problemDeterminationSaveFilter,
  eventFilter,
  uniqueId,
  dateFilter,
  capacitySaveFilter } =   filterSlice.actions;

export default filterSlice.reducer;