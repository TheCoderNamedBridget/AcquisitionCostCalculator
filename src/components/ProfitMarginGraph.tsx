// src/components/LineChart.tsx
import React, { useRef, useEffect, useContext } from 'react';
import { Chart, TooltipItem, registerables } from 'chart.js';
import { InputsContext } from './InputsContext';

Chart.register(...registerables);

const ProfitMarginGraph: React.FC = () => {
    const context = useContext(InputsContext);

    if (!context) {
        throw new Error('ProfitMarginGraph must be used within an InputsProvider');
    }

    const { state } = context;

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const length = 5;

    const revenueArray = Array.from({ length }, (_, index) => state.revenue + (state.revenue * index))
    // const netProfitArray = Array.from({ length }, (_, index) => state.netProfit + (state.netProfit * index))
    const data = Array.from({ length }, (_, index) => ({
        x: state.revenue + (state.revenue * index), // X values
        y: state.netProfit + (state.netProfit * index) // Y values
    }))

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Destroy existing chart instance if it exists
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                // Create new chart instance
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: revenueArray,
                        datasets: [
                            {
                                label: 'Profit Margin',
                                data: data,
                            }, {
                                label: 'Current Profit Margin',
                                data: [{ x: state.revenue, y: state.netProfit }],
                                backgroundColor: 'rgba(255, 99, 132, 1)',
                                pointRadius: 5,
                                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                            }
                        ],
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Revenue'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Net Profit'
                                },
                                ticks: {
                                    autoSkip: false,
                                }
                            },
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context: TooltipItem<'line'>) {
                                        const raw = context.raw as { x: number, y: number };
                                        const profitMargin = (state.netProfit / state.revenue) * 100
                                        return `profit margin: ${profitMargin} % ${raw.y}/${raw.x} `;
                                    }
                                }
                            }
                        }
                    },
                });
            }
        }

        // Cleanup function to destroy chart on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return <canvas ref={chartRef}></canvas>;
};

export default ProfitMarginGraph;
