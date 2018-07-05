var mongoose = require('mongoose')
var PlayerSchema = new mongoose.Schema({
    username: { type: String,
        required: [true, "Name is required!"],
        trim: true
    },
    email: { type: String,
        required: [true, "Email is required!"],
        trim: true
    },
    password: { type: String,
        required: [true, "Password is required!"],
        trim: true
    },
    wins: { type: Number},
    losses: { type: Number},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

mongoose.model('Player', PlayerSchema);