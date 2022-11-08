const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: false
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