import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useFetchData from './hooks/useFetchData';
import BarAndLineChart from './components/BarAndLineChart';
import FilterComponent from './components/FilterComponent';
import DateRangeSelector from './components/DateRangeSelector';
import Auth from './components/Auth';
import { getCookie } from './utils/cookieUtils';
import './App.css'

const App = () => {
    const [filters, setFilters] = useState({ age: '', gender: '' });
    const [startDate, setStartDate] = useState(null); 
    const [endDate, setEndDate] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { data, loading, error } = useFetchData(filters, startDate, endDate);

    useEffect(() => {
        const authCookie = getCookie('auth');
        if (authCookie) {
            setIsAuthenticated(true);
        }
    }, []);
    

    const applyDateFilter = () => {
        if (startDate && endDate) {
            console.log("Date filter applied:", startDate.toISOString(), endDate.toISOString());
        } else {
            console.log("Invalid date range");
        }
    };

    if (!isAuthenticated) {
        return <Auth setIsAuthenticated={setIsAuthenticated} />;
    }

    return (
        <Router>
            <div className='container'>
                <div className='filters'>
                <div>
                <DateRangeSelector
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    applyDateFilter={applyDateFilter}
                />

                <button onClick={applyDateFilter}>Apply Filters</button>
                </div>
                <FilterComponent filters={filters} setFilters={setFilters} />
                </div>
            
                {loading ? <p>Loading data...</p> : error ? <p>Error: {error}</p> : <BarAndLineChart data={data} />}
            </div>
        </Router>
    );
};

export default App;
