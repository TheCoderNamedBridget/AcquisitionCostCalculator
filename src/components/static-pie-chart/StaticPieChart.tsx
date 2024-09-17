

import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';

Chart.register(...registerables);

type StaticPieChartProps = {
    title?: string;
    labels?: string[];
    data?: number[];
}

const StaticPieChart = ({ title = "chart", labels = ["label", "label2", "label3"], data = [1, 2, 3] }: StaticPieChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<'pie'> | null>(null);
    const [parsedData, setParsedData] = useState(data);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // if investor equity > 1 then set to 1 in order for graph sections to show properly
            if (data[0] > 1) {
                setParsedData([100, 0])
            } else {
                setParsedData(data.map((value) => value * 100))
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [data])

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
                                label: 'Percentage owned',
                                data: parsedData,
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
    }, [parsedData]);

    return (<canvas ref={chartRef} />)
}

export default StaticPieChart;