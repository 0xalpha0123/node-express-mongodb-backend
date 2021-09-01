var mongoose = require('mongoose'),
    crypto = requrie('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password.length >= 8;
            },
            'Password should be longer'
        ]
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User'],
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};;

mongoose.model('User', UserSchema);