const mongoose = require('mongoose');

const raccoonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    district: { type: String, required: true },
    latitude: Number,
    longitude: Number,
    avatar: String,
    character: String,
    socialRelations: String,
    story: String,
    photos: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Raccoon', raccoonSchema);
