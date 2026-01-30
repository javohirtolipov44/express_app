const mongoose = require('mongoose');

const cartSchmea = new mongoose.Schema(
	{ quantity: { type: Number, value: 0 } },
	{ timestamps: true }
);

module.exports = mongoose.model('cart', cartSchmea);
