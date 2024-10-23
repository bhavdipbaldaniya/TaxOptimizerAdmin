import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from "./chart.module.css";
import Dropdown from '@/src/Component/FormElement/Dropdown';

const dataSets = {
    clients: {
        2023: [
            { month: 'Jan', value: 30000 },
            { month: 'Feb', value: 38000 },
            { month: 'Mar', value: 48000 },
            { month: 'Apr', value: 30000 },
            { month: 'May', value: 45000 },
            { month: 'Jun', value: 42000 },
            { month: 'July', value: 30000 },
            { month: 'Aug', value: 48000 },
            { month: 'Sep', value: 52000 },
            { month: 'Oct', value: 43000 },
            { month: 'Nov', value: 55000 },
            { month: 'Dec', value: 43000 },
        ],
        2024: [
            { month: 'Jan', value: 35000 },
            { month: 'Feb', value: 40000 },
            { month: 'Mar', value: 50000 },
            { month: 'Apr', value: 34000 },
            { month: 'May', value: 46000 },
            { month: 'Jun', value: 48000 },
            { month: 'July', value: 32000 },
            { month: 'Aug', value: 51000 },
            { month: 'Sep', value: 54000 },
            { month: 'Oct', value: 46000 },
            { month: 'Nov', value: 57000 },
            { month: 'Dec', value: 44000 },
        ],
    },
};

const CustomTooltip = ({ active, payload, valuePrefix }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltipValue}>
                    {valuePrefix}{(payload[0].value).toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

const AnalyticsDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { tabs, valuePrefix } = {
        tabs: ['Total Clients'],
        valuePrefix: '',
    };
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [chartData, setChartData] = useState(dataSets.clients[selectedYear]); // Set initial data

    const yearOptions = Array.from(new Array(50), (val, index) => ({
        name: (currentYear - index).toString(),
        value: currentYear - index,
    }));

    // Update the chart data when the year or active tab changes
    useEffect(() => {
        const yearData = dataSets.clients[selectedYear]; // Get data based on selected year
        if (yearData) {
            setChartData(yearData);
        } else {
            console.warn(`No data found for year ${selectedYear}`);
        }
    }, [activeTab, selectedYear]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.tabContainer}>
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(index)}
                            className={index === activeTab ? styles.activeTab : styles.inactiveTab}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className={styles.DropdownManage}>
                    <Dropdown
                        data={yearOptions}
                        value={selectedYear}
                        setValue={setSelectedYear}
                        className="year-dropdown"
                        disable={false}
                    />
                </div>
            </div>
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} stroke="#F2F2F2" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8E94A4' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8E94A4' }}
                            tickFormatter={(value) => `${valuePrefix}${value}`}
                        />
                        <Tooltip content={(props) => <CustomTooltip {...props} valuePrefix={valuePrefix} />} cursor={false} />
                        <Bar
                            dataKey="value"
                            className={styles.BarColor}
                            radius={[5.9, 5.9, 0, 0]}
                            barSize={38.66}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
