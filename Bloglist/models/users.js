const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 3
    },
    passwordHash: {
        type: String,
        unique: true,
        minLength: 3
    },
    name: String,
    image: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.passwordHash;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const User = mongoose.model('BlogUser', userSchema);
module.exports = User;