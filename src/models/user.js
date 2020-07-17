const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'client'
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    address: {
        type: String,
        require: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain "password"!');
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
{ 
    timestamps: true 
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to log in!');
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to log in!');
    }

    return user;
};

userSchema.methods = {
    generateAuthToken: async function () {
        const token = jwt.sign({ _id: this._id.toString() }, 'asdfasdfasfasdf');
        
        this.tokens = [...this.tokens, { token }]
        await this.save();
        return token;
    }
};

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password , 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

