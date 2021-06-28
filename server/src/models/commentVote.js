const mongoose = require('mongoose');

const commentVoteSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment'
    },
    value: {
        type: Number,
        required: true,
        enum: [1, -1]
    },
    ip: {
        type: String,
        required: false
    }
});

const CommentVote = mongoose.model('CommentVote', commentVoteSchema);
module.exports = CommentVote;
