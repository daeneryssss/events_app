import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Axios from "axios";

const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [dateEvents, setDateEvents] = useState(new Map());

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async() => {
        try {
            const response = await Axios.get('http://localhost:5000/events');
            if (response.status === 200) {
                const data = response.data;
                setEvents(data);
                const eventsByDate = new Map();
                data.forEach(event => {
                    const [day, month, year] = event.date.split('.');
                    const eventDate = new Date(`${year}-${month}-${day}`).toDateString();
                    if (!eventsByDate.has(eventDate)) {
                        eventsByDate.set(eventDate, []);
                    }
                    eventsByDate.get(eventDate).push(event);
                });
                setDateEvents(eventsByDate);
            }
            else {
                console.error('Failed to fetch items. Status: ', response.status);
            }
        } catch (error) {
            console.error('Error fetching items: ', error);
        };
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toDateString();
            if (dateEvents.has(dateStr)) {
                return (
                    <div className="CalendarTileContent">
                        {dateEvents.get(dateStr).map((event, index) => (
                            <p key={index} className="calendar-event-name">
                                {event.name}
                            </p>
                        ))}
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className="Container">
            <h1 className="PageHeader">Календар подій</h1>
            <Calendar className="CalendarContainer" tileContent={tileContent} onClickDay={(value) => {
                    const dateStr = value.toDateString();
                    if (dateEvents.has(dateStr)) {
                        alert(`Час: ${dateEvents.get(dateStr).map(e => e.time).join('\n')}\nЙдуть на подію: ${dateEvents.get(dateStr).map(e => e.people_will_go).join('\n')}\nНе йдуть на подію: ${dateEvents.get(dateStr).map(e => e.people_not_go).join('\n')}`);
                    } else {
                        alert(`Немає подій ${dateStr}`);
                    }
                }}/>
        </div>
    )
}

export default EventCalendar;