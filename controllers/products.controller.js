const { ObjectId } = require('mongodb');
const connectDB = require('../config/db');

const getAllBrands = async(req, res)=>{
    try {
        const db = await connectDB();
        const result = await db.collection('brands').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({message: error});
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
        res.status(500).json({message: error});
    }
}

const getSingleProduct = async(req, res)=>{
    try {
        const db = connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('product').findOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const addToCart = async(req, res)=>{
    try {
        const db = await connectDB();
        const cartData = req.body;
        const result = await db.collection('cart').insertOne(cartData);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: error});
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
        res.status(500).json({message: error}); 
    }
};

const deleteCart = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('cart').deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({message: error});  
    }
}
module.exports = {
    getAllBrands,
    getProductsByBrands,
    getSingleProduct,
    addToCart,
    getCartData,
    deleteCart
}