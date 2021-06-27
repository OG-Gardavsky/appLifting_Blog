const express = require('express');
const Article = require('../models/article');
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
            console.log(e)
            res.status(500).send();
        }

    }
});

/**
 * API returns all articles
 */
router.get(baseUrl, async (req, res) => {
    try{

        const articles = await Article.find();

        res.status(200).send(articles);

    } catch (e) {
        res.status(400).send(e);
    }
});

/**
 * API returns details about one article
 */
router.get(`${baseUrl}/id::id`, async (req, res) => {
    const _id = req.params.id;

    try {
        const account = await Article.findOne({_id});

        if (!account) {
            return res.status(404).send();
        }

        //TODO
        //add check that authorId is not displayed - just name

        res.send(account);
    } catch (e) {
        res.status(500).send();
    }
});

/**
 * API returns articles associated with logged user
 */
router.get(`${baseUrl}/my`, auth, async (req, res) => {
    try{


        await req.user.populate({
            path: 'articles'
        }).execPopulate();

        res.status(200).send(req.user.articles);

    } catch (e) {
        res.status(400).send(e);
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
