const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const constants = require('../config/constants');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: constants.minPassLength,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot include word \'password\'');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
},
    { timestamp: true }
);


/**
 * creates link to article
 */
userSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'author'
});



/**
 * method removes password and tokens from response
 * @returns userObject without confidential data
 */
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}


/**
 * mwthod generates jwt token for user and saves it to database
 * @returns jwt token
 */
userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const jwtKey = constants.jwtKey;

    const token = jwt.sign({ _id: user._id.toString() }, jwtKey);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}


/**
 * methods finds searched user by provided credentials
 * @param email
 * @param password
 * @returns user from db if finds corresponding record
 */
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        // throw new Error('Unable to login');
        throw {message: 'Unable to login', type: 'genericError'};
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}


/**
 * takes care of saving password in hashed form
 */
userSchema.pre('save', async function(next) {
    const user = this;

    user.email = user.email.toLowerCase();

    if (user.isModified('password')) {

        if (/ /.test(user.password)) {
            throw new Error('Password cannot contain whitespaces.')
        }

        user.password = await bcrypt.hash(user.password, constants.bcryptSaltRounds);
    }

    next();
});



const User = mongoose.model('User', userSchema);
module.exports = User;
