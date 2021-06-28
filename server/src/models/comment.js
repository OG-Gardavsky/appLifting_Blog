const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        articleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Article'
        },
        ts: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    { timestamp: true }
);



const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
