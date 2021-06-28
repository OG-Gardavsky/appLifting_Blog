const express = require('express');
const Comment = require('../models/comment');
const Article = require('../models/article');
const CommentVote = require('../models/commentVote');
const auth = require('../middleware/auth');
const router = new express.Router();

const baseUrl = '/api/comments';

/**
 * API creates new Comment
 */
router.post(baseUrl, async (req, res) => {

        const articleId = req.body.articleId;
    try {
        const article = await Article.find({_id : articleId})

        if (article.length < 1) {
            return res.status(404).send({error: 'articleId does not belong to existing article.'});
        }

        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).send(comment);
    } catch (e) {

        if ('name' in e && e.name === 'ValidationError') {

            res.status(400).send(e);

        } else {
            res.status(500).send();
        }

    }
});


/**
 * API returns comment asociated with article + sum of their votes(if some votes are present)
 */
router.get(`${baseUrl}/articleId::id`, async (req, res) => {

    const articleId = req.params.id;

    try {
        const article = await Article.find({_id : articleId})

        if (article.length < 1) {
            return res.status(404).send({error: 'articleId does not belong to existing article.'});
        }

        const comments = await Comment.find({articleId});
        const commentIds = comments.map(comment => comment._id);

        const summedVotes = await CommentVote.aggregate([
                { $match: {  commentId: { $in: commentIds }  } },
                {"$group" :
                        {
                            _id: '$commentId',
                            sum: { $sum: '$value' }
                        }
                }
            ],
            (e) => {
                if (e) {
                    throw new Error('error in DB agregation');
                }
            }
        );

        const commentsWithStats = comments.map((comment) => {
            const match = summedVotes.find(votedSUm => votedSUm._id.toString() === comment._id.toString());
            if (match) {
                comment = comment.toObject();
                comment.sumOfVotes = match.sum;
            }
            return comment;
        });



        res.status(200).send(commentsWithStats);

    } catch (e) {
        console.log(e)
        res.status(500).send();
    }
});



module.exports = router;
