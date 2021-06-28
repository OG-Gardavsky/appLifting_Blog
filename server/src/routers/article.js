const express = require('express');
const Article = require('../models/article');
const Comment = require('../models/comment');
const auth = require('../middleware/auth');
const router = new express.Router();

const baseUrl = '/api/articles';



/**
 * API creates new User
 */
router.post(baseUrl, auth, async (req, res) => {

    try {
        const article = new Article({
            ...req.body,
            author: req.user._id
        });

        await article.save();
        res.status(201).send();
    } catch (e) {

        if ('name' in e && e.name === 'ValidationError') {

            res.status(400).send(e);

        } else {
            res.status(500).send();
        }

    }
});



/**
 * API returns details about one article
 */
router.get(`${baseUrl}/id::id`, async (req, res) => {
    const _id = req.params.id;

    try {
        const article = await Article.findOne({_id});

        if (!article) {
            return res.status(404).send();
        }

        const articleObject = article.toObject();

        delete articleObject.author;


        res.send(articleObject);
    } catch (e) {
        res.status(500).send();
    }
});



/**
 * API returns all articles without content
 */
router.get(`${baseUrl}/list`, async (req, res) => {
    try{

        const articles = await Article.find();

        const countOfComments = await Comment.aggregate([
                {"$group" :
                        {
                            _id: '$articleId',
                            count: { $sum: 1 }
                        }
                }
            ],
            (e) => {
                if (e) {
                    throw new Error('error in DB agregation');
                }
            }
        );

        const articlesToSend = articles.map((article) => {

            article = article.toObject()
            delete article.content;

            const match = countOfComments.find(comments => comments._id.toString() === article._id.toString())
            if (match) {
                article.countOfComments = match.count;
            } else {
                article.countOfComments = 0;
            }

            return article;
        });


        res.status(200).send(articlesToSend);

    } catch (e) {
        res.status(400).send();
    }
});


/**
 * API returns articles associated with logged user
 */
router.get(`${baseUrl}/my`, auth, async (req, res) => {

    try{

        const articles = await Article.find({author: req.user._id});

        const countOfComments = await Comment.aggregate([
                {"$group" :
                        {
                            _id: '$articleId',
                            count: { $sum: 1 }
                        }
                }
            ],
            (e) => {
                if (e) {
                    throw new Error('error in DB agregation');
                }
            }
        );

        const articlesToSend = articles.map((article) => {

            article = article.toObject()
            delete article.content;

            const match = countOfComments.find(comments => comments._id.toString() === article._id.toString())
            if (match) {
                article.countOfComments = match.count;
            } else {
                article.countOfComments = 0;
            }

            return article;
        });


        res.status(200).send(articlesToSend);

    } catch (e) {
        res.status(400).send();
    }


});


/**
 * API updates article
 */
router.put(`${baseUrl}/id::id`, auth, async (req, res) => {

    const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'perex', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid body of request, in request should be only fields ' + allowedUpdates.toString() });
    }

    try {
        const article = await Article.findOne({ _id, author:req.user._id });
        if (!article) {
            return res.status(404).send();
        }

        updates.forEach((update) => article[update] = req.body[update]);
        await article.save();
        res.send(article);
    } catch (e) {
        res.status(500).send();
    }
});


router.delete(`${baseUrl}/id::id`, auth, async (req, res) => {
    const _id = req.params.id;

    try {

        const article = await Article.findOne({_id, author: req.user._id});

        if (!article) {
            return res.status(404).send();
        }

        article.remove();

        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
})



module.exports = router;
