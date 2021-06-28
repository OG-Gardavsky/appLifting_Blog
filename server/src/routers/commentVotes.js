const express = require('express');
const Comment = require('../models/comment');
const CommentVote = require('../models/commentVote');
const router = new express.Router();

const baseUrl = '/api/commentVotes';

/**
 * API creates new vote for comment
 */
router.post(baseUrl, async (req, res) => {


    try {
        const commentId = req.body.commentId;

        const comment = await Comment.find({_id : commentId})

        if (comment.length < 1) {
            return res.status(404).send({error: 'commentId does not belong to existing comment.'});
        }

        const isDuplicate = await CommentVote.findOne({commentId, ip: req.ip})

        if (isDuplicate) {
            return res.status(400).send({error: 'already voted for this comment'});
        }

        const commentVote = new CommentVote(req.body);
        commentVote.ip = req.ip;
        await commentVote.save();
        res.status(201).send(commentVote);
    } catch (e) {

        if ('name' in e && e.name === 'ValidationError') {

            res.status(400).send(e);

        } else {
            res.status(500).send();
        }

    }
});




module.exports = router;
