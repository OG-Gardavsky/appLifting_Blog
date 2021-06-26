const express = require('express');
const User = require('../models/user');

const router = new express.Router();

const baseUrl = '/api/users';

/**
 * API creates new User
 */
router.post(baseUrl, async (req, res) => {

    try {
        const isSameEmail = req.body.email ? await User.find({ email: req.body.email.toLowerCase() }) : [];

        if (isSameEmail.length > 0) {
            return res.send({error: 'Email address is already taken'});
        }

        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {

        if ('name' in e && e.name === 'ValidationError') {


            res.status(400).send(e);

        } else {
            res.status(500).send();
        }

    }
});


/**
 * API logs User in
 */
router.post(`${baseUrl}/login`, async (req, res) => {

    try {

        const user = await User.findByCredentials(req.body.email.toLowerCase(), req.body.password);
        const token = await user.generateAuthToken();
        await user.save();
        res.send({user, token});

    } catch (e) {
        res.status(400).send({error: 'Unable to login'});
    }
});


/**
 * API logs User out
 */
router.post(`${baseUrl}/logout`, async (req, res) => {

    try {

        res.status(201).send({message: 'jsme tam'});
    } catch (e) {
        res.status(400).send({error: ''});
    }
});


module.exports = router;
