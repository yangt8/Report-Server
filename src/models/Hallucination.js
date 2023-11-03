// models/Hallucination.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const HallucinationSchema = new Schema(
    {
        model_id: {
            type: Schema.Types.ObjectId,
            ref: 'Model',
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        prompt: String,
        bad_response: String,
        p_tuned: Boolean,
    },
    {
        timestamps: true,
    },
);

HallucinationSchema.plugin(mongoosePaginate);

const Hallucination = mongoose.model('Hallucination', HallucinationSchema);
module.exports = Hallucination;
