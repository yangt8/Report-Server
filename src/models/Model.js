const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ModelSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        openAIId: {
            type: String,
            required: true,
        },
        gptVersion: {
            type: String,
            required: true,
            enum: ['3.5', '4'],
        },
        environment: {
            type: String,
            required: true,
            enum: ['Production', 'Pre-production', 'Both'],
        },
    },
    { timestamps: { currentTime: () => Date.now() } },
);

ModelSchema.statics.findNamesAndIds = function () {
    return this.find({}, 'name openAIId');
};

ModelSchema.plugin(mongoosePaginate);

const Model = mongoose.model('Model', ModelSchema);
module.exports = Model;
