const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
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
    },
    fileuploadLink: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Manager', managerSchema);