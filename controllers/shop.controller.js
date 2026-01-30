const TEST_USER_EMAIL = require('../config/const.config');
const productModel = require('../models/product.model');

class ShopController {
	async renderHome(req, res) {
		const products = await productModel.find().lean();
		res.render('shop/home', { title: 'Shop', products });
	}

	async renderCart(req, res) {
		// const user = await userModel.findOne({ where: { email: TEST_USER_EMAIL } });
		// const products = await user.getCartProducts({ raw: true });
		// const filteredProduct = products.map(p => ({ ...p, quantity: p['cart.quantity'] }));
		res.render('shop/cart', { title: 'Shopping Cart', products: [] });
	}

	async addToCart(req, res) {
		// const user = await userModel.findOne({ where: { email: TEST_USER_EMAIL } });
		// const product = await productModel.findByPk(req.params.id);

		const existing = await user.getCartProducts({ where: { id: product.id } });
		if (existing.length > 0) {
			let item = existing[0];
			item.cart.quantity += 1;
			await item.cart.save();
		} else {
			await user.addCartProduct(product, { through: { quantity: 1 } });
		}

		res.redirect('/cart');
	}

	async deleteFromtCart(req, res) {
		const user = await userModel.findOne({ where: { email: TEST_USER_EMAIL } });
		await user.removeCartProduct(req.params.id);
		res.redirect('/');
	}
}

module.exports = new ShopController();
