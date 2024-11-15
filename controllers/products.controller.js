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

module.exports = {
    getAllBrands,
}