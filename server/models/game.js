var mongoose = require('mongoose')
var GameSchema = new mongoose.Schema({
    player1: { type: String,
        required: [true, "Name is required!"]
    },
    player2: { type: String},
    size: { type: Number
    },
    creator: { type: String,
        required: [true, "Creator is required!"],
        trim: true
    },
    state: { type: Array},
    finished: { type: Boolean},
    winner: { type: String},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

mongoose.model('Game', GameSchema);