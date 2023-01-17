//Here I import required packages and schema files.
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
        //This will format the date on the createdAt field.
        get: (date) => {
            return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
        }
       },
       username: {
        type: String,
        required: true,
       },
       //This is an array of reactions and each reaction is a subdocument of thought.
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