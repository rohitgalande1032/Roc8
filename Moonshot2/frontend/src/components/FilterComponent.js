import React from 'react';

const FilterComponent = ({ filters, setFilters }) => {
    const handleAgeChange = (e) => {
        setFilters((prev) => ({ ...prev, age: e.target.value }));
    };

    const handleGenderChange = (e) => {
        setFilters((prev) => ({ ...prev, gender: e.target.value }));
    };

    return (
        <div>
            <label>
                Age:
                <select value={filters.age} onChange={handleAgeChange}>
                    <option value="">All</option>
                    <option value="15-25">15-25</option>
                    <option value="25">25</option>
                </select>
            </label>
            <label>
                Gender:
                <select value={filters.gender} onChange={handleGenderChange}>
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </label>
        </div>
    );
};

export default FilterComponent;
