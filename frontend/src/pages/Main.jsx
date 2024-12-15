import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";

const Main = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async() => {
        try {
            const response = await Axios.get('http://localhost:5000/events');
            if (response.status === 200) {
                const data = response.data;
                setEvents(data);
            }
            else {
                console.error('Failed to fetch items. Status: ', response.status);
            }
        } catch (error) {
            console.error('Error fetching items: ', error);
        };
    };

    return (
        <div className="Container">
            <ul className="EventsList">
                {events.map(event => {
                    return (
                    <li key={event._id} className="EventSection">
                        <p className="EventSectionName">{event.name}</p>
                        <p className="EventSectionDate">{event.date}</p>
                        <p className="EventSectionTime">{event.time}</p>
                        <p className="EventSectionPlace">{event.place}</p>
                        <img src={event.image} alt={event.name} className="EventSectionImage"/>
                        <Link to={`/events/${event._id}`} className="EventSectionLink">Деталі...</Link>
                    </li>
                )})}
            </ul>
        </div>
    )
};

export default Main;