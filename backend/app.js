import express from "express"
import mongoose from "mongoose"
import cors from "cors"
const app = express()
const port = 3000



const mongodb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/demo').then((res) => {
        console.log('databse connected');
    }).catch((err) => {
        console.log(err.message);
    })

}

app.use(express.json());
app.use(cors())


app.get('/', async (req, res) => {
    try {
        const result = await mongoose.connection.collection("user").find().toArray();
        console.log(result);
        res.json({ result: result, status: true })
    } catch (error) {
        res.json({ message: error.message, status: false })
    }

})

app.post('/', async (req, res) => {
    console.log(req.body, 'req.body');

    try {
        const result = await mongoose.connection.collection("user").insertOne(req.body);

        console.log(result);
        res.json({ result: result, status: true })


    } catch (error) {
        res.json({ message: error.message, status: false })
    }
})


app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/:id', async (req, res) => {

    console.log('delte',req.params.id);
    try {

        const objectId = new mongoose.Types.ObjectId(req.params.id)

        const result = await mongoose.connection.collection("user").deleteOne({_id:objectId});
        res.json({ result: result, status: true })
    } catch (error) {
        res.json({ message: error.message, status: false })
    }
})




app.listen(port, () => {
    mongodb();
    console.log(`Example app listening on port ${port}`)
})