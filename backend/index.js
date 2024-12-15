import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import Event from './EventModel.js';

const app = express();

const _port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose.connect(process.env.DATABASE_CONNECTION)
.then(() => {
    console.log("Database is connected successfully!");
})
.catch((err) => {
    console.log("Something went wrong with database connection...");
});

app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'})
    };
});

app.get('/events/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.patch('/events/:id', async (req, res) => {
    const { id } = req.params;
    const { choice } = req.body;

    try {
        const update = choice === 'go' 
            ? { $inc: { people_will_go: 1 } } 
            : { $inc: { people_not_go: 1 } };

        const updatedEvent = await Event.findByIdAndUpdate(id, update, { new: true });
        
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(_port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${_port}`);
    }
    else {
        console.log(`Error: ${error}`);
    }
});