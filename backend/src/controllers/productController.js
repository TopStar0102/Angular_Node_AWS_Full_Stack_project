const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  productModel.find().then((productList) => {
    res.json(productList);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const product = new productModel({ name, price, description });
    await product.save();

    return res.status(201).json({ state: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.editProduct = async (req, res) => {
  const { id, name, price, description } = req.body;

  productModel.updateOne({ _id: id }, { $set: { name: name, price: price, description: description } })
  .then(result => {
    return res.status(201).json({ result });
  })
  .catch(error => {
    return res.status(500).json({ error: error });
  });
};

exports.deleteProduct = async (req, res) => {
  productModel.deleteOne({ _id: req.body.id })
    .then(() => {
      return res.status(201).json('success');
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
  });
};