const reactionSchema = require('./Reaction.js');
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
       thoughtText: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 280,
       },
       createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => {
            return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
        }
       },
       username: {
        type: String,
        required: true,
       },
       reactions: [
        reactionSchema
       ]
    },
    { 
        toJSON: {
            virtuals: true
        }
        
});

const Thought = model('thought', thoughtSchema)
module.exports = Thought;