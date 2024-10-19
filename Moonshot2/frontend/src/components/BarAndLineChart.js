import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const BarAndLineChart = ({ data, loading, error }) => {
    const [selectedFeature, setSelectedFeature] = useState(null);
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        if (lineChartRef.current && selectedFeature) {
            lineChartRef.current.resetZoom();
        }
    }, [selectedFeature]);

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    const barChartData = {
        labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E', 'Feature F'],
        datasets: [
            {
                label: 'Total Time Spent',
                data: [
                    data.reduce((acc, item) => acc + item.features.A, 0),
                    data.reduce((acc, item) => acc + item.features.B, 0),
                    data.reduce((acc, item) => acc + item.features.C, 0),
                    data.reduce((acc, item) => acc + item.features.D, 0),
                    data.reduce((acc, item) => acc + item.features.E, 0),
                    data.reduce((acc, item) => acc + item.features.F, 0),
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                borderWidth: 1,
            },
        ],
    };

    const lineChartData = selectedFeature
        ? {
            labels: data.map(item => new Date(item.day).toLocaleDateString()),
            datasets: [
                {
                    label: `Feature ${selectedFeature}`,
                    data: data.map(item => item.features[selectedFeature]),
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                },
            ],
        }
        : null;

    const handleBarClick = (elements) => {
        if (elements.length > 0) {
            const featureIndex = elements[0].index;
            const selected = ['A', 'B', 'C', 'D', 'E', 'F'][featureIndex];
            setSelectedFeature(selected);
        }
    };

    return (
        <div className='charts'>
            <div className='bar'>
                <h2>Bar Chart: Total Time Spent on Features</h2>
                <Bar
                    ref={barChartRef}
                    data={barChartData}
                    options={{
                        onClick: (e, elements) => handleBarClick(elements),
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Features',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Total Time Spent',
                                },
                            },
                        },
                    }}
                />
            </div>
            <div className='line'>
                {selectedFeature && (
                    <>
                        <h2>Line Chart: Time Trend for Feature {selectedFeature}</h2>
                        <Line
                            ref={lineChartRef}
                            data={lineChartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    zoom: {
                                        pan: {
                                            enabled: true,
                                            mode: 'x',
                                        },
                                        zoom: {
                                            enabled: true,
                                            mode: 'x',
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Date',
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Total Time Spent',
                                        },
                                    },
                                },
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default BarAndLineChart;
