const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Aesthetica server is running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wlof2pa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsCollection = client.db('productsDB').collection('product');
    const cartCollection = client.db('productsDB').collection('cart');
    const brandCollection = client.db('productsDB').collection('brands');

    app.post('/products', async(req, res)=>{
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct);
        res.send(result);
    })

    app.get('/brands', async(req, res)=>{
      const result = await brandCollection.find().toArray();
      res.send(result);
    })

    app.get('/products/:brand_name', async(req, res)=>{
        const brand_name = req.params.brand_name;
        const query = { brand_name : brand_name};
        const result = await productsCollection.find(query).toArray();
        res.send(result);
    })

    app.get('/product/:id', async(req, res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id)};
        const result = await productsCollection.findOne(query);
        res.send(result);
    })

    app.put('/product/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedProduct = req.body;
        const product = {
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
        const result = await productsCollection.updateOne(filter, product, options);
        res.send(result);
    })

    app.post('/carts', async(req, res)=>{
      const newCart = req.body;
      const result = await cartCollection.insertOne(newCart);
      res.send(result);
    })

    app.get('/carts/:email', async(req, res)=>{
      const email = req.params.email;
      const query = { email: email};
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    })

    app.delete('/carts/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})