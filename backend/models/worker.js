const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    savedMsgs: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Worker', workerSchema);