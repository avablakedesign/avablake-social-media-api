const { Schema, model } = require('mongoose');
//Created a schema for the user model. 
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //This validates emails matching the specified regex.
            match: /.+\@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'thought',
            },    
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },   
        ]
    },
    { 
        toJSON: {
            virtuals: true,
            id: false
        }
    }
);
//This will count the total number of friends a user has and set a new property on the user data returned.
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`
    })

const User = model('User', userSchema);

module.exports = User;
