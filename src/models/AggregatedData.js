const mongoose = require('mongoose');

const AggregatedDataSchema = new mongoose.Schema(
    {
        model_id: String, // 单独的字段，用于存储 model_id
        hour: Number, // 存储数据聚合的小时
        count: Number, // 计数
        aggregatedAt: Date, // 添加时间戳字段，记录数据聚合的时间
    },
    { timestamps: true }, // 启用自动时间戳
);

const AggregatedData = mongoose.model('AggregatedData', AggregatedDataSchema);

module.exports = AggregatedData;
