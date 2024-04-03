import React, { forwardRef, useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { getDateRangeSelector } from '../features/ui/selectors';
import { setDateRangeReducer } from '../features/ui/uiSlice';
function DateRange() {
    
    const [startDate, endDate] = useSelector(getDateRangeSelector)
    const dispatch=useDispatch()
    const InputDateOperation = forwardRef(({ value, onClick }, ref) => (
        <input
        
          type="text"
          value={value}
          id="date_range_operation"
          onClick={onClick}
          name="date_range_operation"
          ref={ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="yyyy-mm-dd  yyyy-mm-dd"
          required
        />
      ));
    
      InputDateOperation.displayName = "date_range_operation";
    return (
      <DatePicker
      
      dateFormat={'yyyy-MM-dd'}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          dispatch(setDateRangeReducer(update))
          console.log(update)
          //setDateRange(update);
        }}
        isClearable={true}
        customInput={<InputDateOperation></InputDateOperation>}
      />
    );
}

export default DateRange