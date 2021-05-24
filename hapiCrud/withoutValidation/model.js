const { Schema, model } = require('mongoose');

const Task = new Schema({
    name: {
        required : true,
        type : String
    },
    description : String
}, {
    timestamps : true
})

module.exports = model('task', Task);