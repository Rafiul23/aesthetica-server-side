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

module.exports = {
    getAllBrands,
    getProductsByBrands,
}