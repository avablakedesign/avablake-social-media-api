const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
       reactionId: { 
            type: Schema.Types.ObjectId,
            default: () => {
                return new Schema.Types.ObjectId()
            },
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
        type: Date(),
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