const { ObjectId } = require('mongodb');
const connectDB = require('../config/db');

const getAllBrands = async(req, res)=>{
    try {
        const db = await connectDB();
        const result = await db.collection('brands').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch brands data'});
    }
}

const getProductsByBrands = async(req, res)=>{
    try {
        const db = await connectDB();
        let query = {};
        if(req?.query?.brand_name){
            query = {
                brand_name: new RegExp(`${req?.query?.brand_name}`, 'i') 
            }
        }
        const result = await db.collection('product').find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to products by brands'});
    }
}

const getSingleProduct = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('product').findOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to get single product'});
    }
}

const addToCart = async(req, res)=>{
    try {
        const db = await connectDB();
        const cartData = req.body;
        const result = await db.collection('cart').insertOne(cartData);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to add to cart'});
    }
}

const getCartData = async(req, res)=>{
    try {
        const db = await connectDB();
        let query = {};
        if(req?.query?.email){
            query = {
                email: req?.query?.email
            }
        };
        const result = await db.collection('cart').find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to find cart data'}); 
    }
};

const deleteCartItem = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('cart').deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to delete from cart'});  
    }
}

const addProduct = async(req, res)=>{
    try {
        const db = await connectDB();
        const newProduct = req.body;
        const result = await db.collection('product').insertOne(newProduct);
        res.send(result); 
    } catch (error) {
        res.status(500).json({message: 'Failed to add product'});  
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('product').deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to delete product'});  
    }
}

const updateProduct = async(req, res)=>{
    try {
       const db = await connectDB();
       const updatedProduct = req.body;
       const id = req.params.id;
       const filter = {_id: new ObjectId(id)};
       const options = {upsert: true};
        const updatedData = {
            $set: {
                productImg: updatedProduct.productImg,
                productName: updatedProduct.productName,
                brand_name: updatedProduct.brand_name,
                productType: updatedProduct.productType,
                price: updatedProduct.price,
                description: updatedProduct.description,
                rating: updatedProduct.rating
            }
        }
        const result = await db.collection('product').updateOne(filter, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: 'Failed to update product'});    
    }
};

const orderProducts = async(req, res)=>{
    try {
        const db = await connectDB();
        const order = req.body;
        const orderResult = await db.collection('orders').insertOne(order);
        const query = {_id: {
            $in: order.cartId.map(id => new ObjectId(id))
        }}
        const deleteResult = await db.collection('cart').deleteMany(query);
        res.send({orderResult, deleteResult});
    } catch (error) {
        res.status(500).json({message: 'Failed to order'});     
    }
}

module.exports = {
    getAllBrands,
    getProductsByBrands,
    getSingleProduct,
    addToCart,
    getCartData,
    deleteCartItem,
    addProduct,
    deleteProduct,
    updateProduct,
    orderProducts
}