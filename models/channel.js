const mongoose = require('mongoose');
const ChannelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Channel',ChannelSchema);