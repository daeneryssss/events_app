import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const EventStatistics = () => {
    const [events, setEvents] = useState([]);
    const [eventsPerMonth, setEventsPerMonth] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState([]);
    const labels = [ "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень" ];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/events');
            if (response.status === 200) {
                const data = response.data;
                setEvents(data);

                calculateEventsPerMonth(data);
                calculateAttendanceStats(data);
            } else {
                console.error('Failed to fetch events. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const calculateEventsPerMonth = (events) => {
        const monthCounts = Array(12).fill(0);
        events.forEach(event => {
            const [day, month, year] = event.date.split('.');
            const eventMonth = parseInt(month, 10) - 1;
            monthCounts[eventMonth] += 1;
        });
        setEventsPerMonth(monthCounts);
    };

    const calculateAttendanceStats = (events) => {
        const stats = Array(12).fill({ willGo: 0, notGo: 0 });
        events.forEach(event => {
            const [day, month, year] = event.date.split('.');
            const eventMonth = parseInt(month, 10) - 1;
            stats[eventMonth] = {
                willGo: stats[eventMonth].willGo + event.people_will_go,
                notGo: stats[eventMonth].notGo + event.people_not_go,
            };
        });
        setAttendanceStats(stats);
    };

    const eventsPerMonthData = {
        labels: labels,
        datasets: [
            {
                label: 'Кількість подій',
                data: eventsPerMonth,
                backgroundColor: '#472300',
            },
        ],
    };

    const attendanceStatsData = {
        labels: labels,
        datasets: [
            {
                label: 'Люди, які планують іти',
                data: attendanceStats.map(stat => stat.willGo),
                backgroundColor: '#51fd51',
            },
            {
                label: 'Люди, які не планують іти',
                data: attendanceStats.map(stat => stat.notGo),
                backgroundColor: '#fd5151',
            },
        ],
    };

    return (
        <div className="Container">
            <h1 className="PageHeader">Статистика подій</h1>
            <div className="ChartSection">
                <h2 className="SectionHeader">Кількість подій у місяці</h2>
                <Bar className="Chart" data={eventsPerMonthData} />
            </div>
            <div className="ChartSection">
                <h2 className="SectionHeader">Кількість відвідувачів по місяцям</h2>
                <Bar className="Chart" data={attendanceStatsData} />
            </div>
        </div>
    );
};

export default EventStatistics;