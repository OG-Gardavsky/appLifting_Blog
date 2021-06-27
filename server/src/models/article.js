const mongoose = require('mongoose');
const validator = require('validator');


const articleSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        perex: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    { timestamp: true }
);



const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
