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
 * API return user info
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



module.exports = router;
