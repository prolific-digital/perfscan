import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../CronScheduler.css'
import { setSchedule } from 'store/slices/report_scheduler/addSchedulerSlice'

const CronScheduler = () => {
  
  const [frequency, setFrequency] = useState('')
  const [time, setTime] = useState("00:00")
  const [days, setDays] = useState(null)
  const [months, setMonths] = useState(null)
  
  const dispatch = useDispatch();

  const handleSave = () => {
    let [hour, minute] = time.split(':')
    let day_of_week = frequency === 'weekly' ? days?.filter((i) => i !== '').join(',') : ''
    let day_of_month = frequency === 'monthly' ? months.filter((i) => i !== '').join(',') : ''
    let frequencyObject = {
      type: frequency,
      hour: hour,
      minute: minute,
      day_of_week: day_of_week,
      day: day_of_month, 
    }
    const schedule = {
      disabled: false, // always enabled
      frequency : frequency, 
      days:days,
      months:months,
      type: frequency,
      hour: hour,
      minute: minute,
      day_of_week: day_of_week,
      day_of_month: day_of_month,
      frequencyObject : frequencyObject
    };
    dispatch(setSchedule(schedule));
  };

  useEffect(() => {
    handleSave();
  }, [frequency, time, days, months])

  return (
    <Fragment>
        <div className="metric_header">Schedule</div>
    <div className="cron-scheduler">
      <label>
        <b>Select Frequency:</b>
      </label>
      <select
       
        value={frequency}
        onChange={(e) => {
          setFrequency(e.target.value)
          setDays([])
          setMonths([])
        }}
      >
        <option value="">Select Frequency</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <label>
        <b>Select Time:</b>
      </label>
      <input
       
        type="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value)
        }}
      />

      {frequency === 'weekly' && (
        <div className={`day-selector`}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div
              key={index}
              className={`days ${days.includes(day) ? 'selected' : ''}`}
              onClick={() => {
                  if (days.includes(day)) setDays((prevDays) => prevDays.filter((d) => d !== day))
                  else setDays((prevDays) => [...prevDays, day])
                }
              }
            >
              {day}
            </div>
          ))}
        </div>
      )}

      {frequency === 'monthly' && (
        <div className={`day-selector`}>
          {Array.from({ length: 31 }).map((_, index) => (
            <div
              key={index}
              className={`days ${months.includes(String(index + 1)) ? 'selected' : ''}`}
              onClick={() => {
                  if (months.includes(String(index + 1))) {
                    setMonths((prevMonths) => prevMonths.filter((m) => m !== String(index + 1)))
                  } else {
                    setMonths((prevMonths) => [...prevMonths, String(index + 1)])
                  }
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div></Fragment>
  )
}

export default CronScheduler
