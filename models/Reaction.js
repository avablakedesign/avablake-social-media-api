const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        //This auto assigns a new ObjectId for each reaction.
       reactionId: { 
            type: Schema.Types.ObjectId,
            auto: true,
       },
       reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => {
            return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
        }    
        }
    },
    {
    toJSON: {
        virtuals: true
        }
    }    
);

module.exports = reactionSchema