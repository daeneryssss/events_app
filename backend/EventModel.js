import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    people_will_go: {
        type: Number,
        required: true
    },
    people_not_go: {
        type: Number,
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;