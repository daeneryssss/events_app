import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

var total;

const Event = () => {
    const { id } = useParams();
    const [event, setEvent] = useState([]);
    const [choice, setChoice] = useState([]);

    const fetchEvent = useCallback(async() => {
        console.log(`Requesting: http://localhost:5000/events/${id}`);
        try {
            const response = await Axios.get(`http://localhost:5000/events/${id}`);
            if (response.status === 200) {
                setEvent(response.data);
            }
            else {
                console.error('Failed to fetch the event. Status: ', response.status);
            }
        } catch (error) {
            console.error('Error fetching the event: ', error);
        };
    }, [id]);

    useEffect(() => {
        fetchEvent();
    }, [fetchEvent]); 

    const handleChange = (event) => {
        setChoice(event.target.value);
    };

    const handleSubmit = async () => {
        if (!choice) {
            alert("Please select an option before submitting.");
            return;
        }

        try {
            const response = await Axios.patch(`http://localhost:5000/events/${id}`, {
                choice: choice,
            });

            if (response.status === 200) {
                alert("Ваш вибір було записано!");
                fetchEvent();
            } else {
                alert("Виникла проблема...");
            }
        } catch (error) {
            console.error("Error updating event: ", error);
            alert("Виникла помилка. Будь ласка, спробуйте ще раз.");
        }
    };

    total = event.people_will_go + event.people_not_go;

    return (
        <div>
            {event ? (
                <div className="Container Event">
                    <div className="EventContainer">
                        <div className="EventInfo">
                            <h1 className="EventName">{event.name}</h1>
                            <p className="EventDate">{event.date}</p>
                            <p className="EventTime">{event.time}</p>
                            <p className="EventPlace">{event.place}</p>
                        </div>
                        <img src={event.image} alt={event.name} className="EventImage"/>
                    </div>
                    <p className="EventSectionText">Люди, які обрали/не обрали цю подію</p>
                        <div className="BarContainer">
                            <p className="EventSectionNumbersGo EventSectionNumbers" style={{ width: `${(event.people_will_go / total) * 100}%` }}>{event.people_will_go}</p>
                            <p className="EventSectionNumbersNotGo EventSectionNumbers" style={{ width: `${(event.people_not_go / total) * 100}%` }}>{event.people_not_go}</p>
                        </div>
                    <div className="EventChoice">
                        <label className="EventLabel" htmlFor="EventGo">Я піду</label>
                        <input type="radio" name="EventChoice" id="EventGo" value="go" checked={choice === "go"} onChange={handleChange} />
                    </div>
                    <div className="EventChoice">
                        <label className="EventLabel" htmlFor="EventNotGo">Я не піду</label>
                        <input type="radio" name="EventChoice" id="EventNotGo" value="not_go" checked={choice === "not_go"} onChange={handleChange} />
                    </div>
                    <button className="EventButton" onClick={handleSubmit}>Надіслати</button>
                </div>
            ) : (
                <p>Завантажуємо деталі про подію...</p>
            )}
        </div>
    )
}

export default Event;