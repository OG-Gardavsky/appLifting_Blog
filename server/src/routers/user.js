const express = require('express');


const router = new express.Router();

const baseUrl = '/api/users';

/**
 * API creates new User
 */
router.post(baseUrl, async (req, res) => {

    try {

        res.status(201).send({message: 'jsme tam'});
    } catch (e) {
        res.status(400).send({error: ''});
    }
});


/**
 * API logs User in
 */
router.post(`${baseUrl}/login`, async (req, res) => {

    try {

        res.status(201).send({message: 'jsme tam'});
    } catch (e) {
        res.status(400).send({error: ''});
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
