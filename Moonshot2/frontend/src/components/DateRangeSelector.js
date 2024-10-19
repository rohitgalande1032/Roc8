import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../'

const DateRangeSelector = ({ startDate, endDate, setStartDate, setEndDate, applyDateFilter }) => {

    const handleQuickSelect = (rangeType) => {
        const now = new Date();
        let start, end;
        switch (rangeType) {
            case 'today':
                start = new Date(now.setHours(0, 0, 0, 0));
                end = new Date(now.setHours(23, 59, 59, 999));
                break;
            case 'yesterday':
                start = new Date(now.setDate(now.getDate() - 1));
                start.setHours(0, 0, 0, 0);
                end = new Date(now.setHours(23, 59, 59, 999));
                break;
            case 'last7days':
                start = new Date(now.setDate(now.getDate() - 7));
                end = new Date();
                break;
            case 'thisMonth':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            default:
                return;
        }
        setStartDate(start);
        setEndDate(end);
        applyDateFilter();
    };

    return (
        <div className='dateSelector'>
            <div className='buttons'>
            <button onClick={() => handleQuickSelect('today')}>Today</button>
            <button onClick={() => handleQuickSelect('yesterday')}>Yesterday</button>
            <button onClick={() => handleQuickSelect('last7days')}>Last 7 Days</button>
            <button onClick={() => handleQuickSelect('thisMonth')}>This Month</button>
            <button>Custom Range:</button>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    isClearable
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    isClearable
                    placeholderText="End Date"
                />
            </div>
        </div>
    );
};

export default DateRangeSelector;
