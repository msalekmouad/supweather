let mongoose = require('mongoose');
const { Schema } = mongoose;

exports.User = mongoose.model('User', new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password:{
        type: String,
        required: true
    },
    cities: {
        type: Array,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}));
