

import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';


Chart.register(...registerables);

type StaticPieChartProps = {
    title?: string;
    labels?: string[];
    data?: number[];
}

const StaticPieChart = ({ title = "chart", labels = ["label", "label2", "label3"], data = [1, 2, 3] }: StaticPieChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<'pie'> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Profit Margin',
                                data: data,
                            }
                        ],
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: title,
                                padding: {
                                    top: 10,
                                    bottom: 20
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
    }, []);

    return (<canvas ref={chartRef} />)
}

export default StaticPieChart;