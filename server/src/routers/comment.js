const express = require('express');
const Comment = require('../models/comment');
const Article = require('../models/article');
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
 * API returns comment asociated with article
 */
router.get(`${baseUrl}/articleId::id`, async (req, res) => {

    const articleId = req.params.id;

    try {
        const article = await Article.find({_id : articleId})

        if (article.length < 1) {
            return res.status(404).send({error: 'articleId does not belong to existing article.'});
        }

        const comments = await Comment.find({articleId});
        res.status(200).send(comments);

    } catch (e) {
        res.status(500).send();
    }
});



module.exports = router;
