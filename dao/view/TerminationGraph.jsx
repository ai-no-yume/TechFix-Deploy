// src/views/TerminationGraph.jsx
import React, { useEffect, useState } from 'react';
import TerminationRule from '../rule/TerminationRule';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function TerminationGraph({ onBack }) {
    const [data, setData] = useState([]);
    const [chartType, setChartType] = useState('Line');
    const [loading, setLoading] = useState(true);
    const terminationRule = TerminationRule();

    // Handle chart type change
    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const result = await terminationRule.countTerminationsFromLastYear();
                console.log('Fetched result:', result);

                const allMonths = [
                    { month: 'January', count: 0 },
                    { month: 'February', count: 0 },
                    { month: 'March', count: 0 },
                    { month: 'April', count: 0 },
                    { month: 'May', count: 0 },
                    { month: 'June', count: 0 },
                    { month: 'July', count: 0 },
                    { month: 'August', count: 0 },
                    { month: 'September', count: 0 },
                    { month: 'October', count: 0 },
                    { month: 'November', count: 0 },
                    { month: 'December', count: 0 },
                ];

                if (!result || result.length === 0) {
                    console.log('No termination data available.');
                    setData(allMonths);
                    return;
                }

                result.forEach((item) => {
                    if (!item || typeof item.count === 'undefined' || !item.month) {
                        console.error('Invalid item data:', item);
                        return;
                    }

                    const monthIndex = parseInt(item.month.split('-')[1], 10) - 1;
                    if (isNaN(monthIndex)) {
                        console.error('Invalid month:', item.month);
                        return;
                    }

                    const count = typeof item.count === 'number' ? item.count : 0;
                    console.log(`Month Index: ${monthIndex}, Count: ${count}`);

                    allMonths[monthIndex].count += count;
                });

                console.log('Updated months data:', allMonths);
                setData(allMonths);
            } catch (error) {
                console.error('Error fetching termination data:', error);
                setData(allMonths);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100vh', // Ocupar toda la altura de la pantalla
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            {/* Loader Overlay */}
            {loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '5px solid #f3f3f3',
                            borderTop: '5px solid #00ff00',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                    <style>
                        {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            )}

            {/* Botón Volver */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    style={{
                        backgroundColor: '#007bff',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                    onClick={onBack}
                >
                    Volver
                </button>
            </div>

            {/* Contenedor del gráfico */}
            <div
                style={{
                    flex: 1, // Ocupar todo el espacio restante
                    width: '100%',
                    padding: '20px',
                    background: '#f9fafb',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <h2 style={{ fontSize: '24px', color: '#1F2937', fontWeight: 'bold' }}>
                    <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} />
                    Terminations Analysis - Last Year
                </h2>

                {/* Filter Section */}
                <div className="filter-container" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <label htmlFor="chartType" style={{ fontSize: '16px', color: '#4B5563' }}>
                        Select Chart Type:
                    </label>
                    <select
                        id="chartType"
                        onChange={handleChartTypeChange}
                        value={chartType}
                        style={{
                            marginLeft: '10px',
                            padding: '5px 10px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                        }}
                    >
                        <option value="Line">Line Chart</option>
                        <option value="Bar">Bar Chart</option>
                    </select>
                </div>

                {/* Responsive Chart Section */}
                <div style={{ flex: 1, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {data.length > 0 ? (
                            chartType === 'Line' ? (
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 40,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fill: '#4B5563',
                                        }}
                                        tick={{ angle: -45, textAnchor: 'end' }}
                                    />
                                    <YAxis
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fill: '#4B5563',
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            padding: '10px',
                                        }}
                                        itemStyle={{
                                            fontWeight: 'bold',
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ r: 6 }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            ) : (
                                <BarChart
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 40,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fill: '#4B5563',
                                        }}
                                        tick={{ angle: -45, textAnchor: 'end' }}
                                    />
                                    <YAxis
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fill: '#4B5563',
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            padding: '10px',
                                        }}
                                        itemStyle={{
                                            fontWeight: 'bold',
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="count" fill="#2563eb" />
                                </BarChart>
                            )
                        ) : (
                            <p style={{ fontSize: '16px', color: '#4B5563' }}>No data available for the selected chart type.</p>
                        )}
                    </ResponsiveContainer>
                </div>

                <p style={{ marginTop: '15px', fontSize: '16px', color: '#4B5563' }}>
                    <strong>Insight:</strong> Visual representation of terminations over the past year, highlighting trends and significant points.
                </p>
            </div>
        </div>
    );
}