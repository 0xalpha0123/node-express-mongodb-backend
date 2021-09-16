const {compareSync, hashSync} = require('bcrypt-nodejs');
const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');

const fs = require('fs');
var INIT_CWD = process.env.INIT_CWD;
const PRIVATE_KEY = fs.readFileSync(INIT_CWD + '/keys/JWT/private.pem','utf-8');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required!'],
            trim: true,
            validate: {
                validator(email) {
                const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
                return emailRegex.test(email);
                },
                message: '{VALUE} is not a valid email!',
            },
        },
        name: {
            type: String,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            trim: true,
            minlength: [6, 'Password need to be longer!'],
            validate: {
                validator(password) {
                return password.length >= 6 && password.match(/\d+/g);
                },
            },
        },
    },
    {
        timestamps: true
    },
);

// Hash the user password on creation
UserSchema.pre('save', function(next) {
    this.password = this._hashPassword(this.password);
    return next();
});

UserSchema.methods = {
    /**
     * Authenticate the user
     *
     * @public
     * @param {String} password - provided by the user
     * @returns {Boolean} isMatch - password match
     */
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    /**
     * Hash the user password
     *
     * @private
     * @param {String} password - user password choose
     * @returns {String} password - hash password
     */
    _hashPassword(password) {
        return hashSync(password);
    },

    /**
     * Generate a jwt token for authentication
     *
     * @public
     * @returns {String} token - JWT token
     */
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            PRIVATE_KEY,
            {
                expiresIn: process.env.EXPIRESIN,
                algorithm: 'RS256',
            }
        );
    },

    /**
     * Parse the user object in data we wanted to send when is auth
     *
     * @public
     * @returns {Object} User - ready for auth
     */
    toAuthJSON() {
        return {
            token: `${this.createToken()}`,
        };
    },

    /**
     * Parse the user object in data we wanted to send
     *
     * @public
     * @returns {Object} User - ready for populate
     */
    toJSON() {
        return {
            _id: this._id,
            username: this.username,
        };
    },
};


const User = model('User', UserSchema);

module.exports = User;