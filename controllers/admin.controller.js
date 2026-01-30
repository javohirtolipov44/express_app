const productModel = require('../models/product.model');

class AdminController {
	renderAddProduct(req, res) {
		res.render('admin/add-product', { title: 'Add product' });
	}

	async addProduct(req, res) {
		await productModel.create(req.body);
		res.redirect('/admin/products');
	}

	async renderProducts(req, res) {
		const products = await productModel.find().lean();
		res.render('admin/products', { title: 'Admin Products', products });
	}

	async renderEditProduct(req, res) {
		const product = await productModel.findById(req.params.id).lean();
		res.render('admin/edit-product', { title: 'Edit Product', product });
	}

	async editProduct(req, res) {
		await productModel.findByIdAndUpdate(req.params.id, req.body);
		res.redirect('/admin/products');
	}

	async deleteProduct(req, res) {
		await productModel.findOneAndDelete(req.params.id);
		res.redirect('/admin/products');
	}
}

module.exports = new AdminController();
