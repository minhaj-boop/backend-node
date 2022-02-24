const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

//user: mudbuser1
//password: I1lh2QgMvyUU0K8q

const uri = "mongodb+srv://mudbuser1:I1lh2QgMvyUU0K8q@cluster0.f7vlo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("foodmaster");
        const usersCollection = database.collection("users");

        //GET API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        //UPDATE USER
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            console.log('load user with id: ', id);
            res.send(user);
        });

        //POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log('got new user', req.body);
            console.log('from', result);
            res.json(result);
        });

        //UPDATE API
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                },
            };
            const result = await usersCollection.updateOne(filter, updatedDoc);
            console.log('updating', id);
            res.json(result);
        })

        // DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log('deleting user id', result);

            res.json(result);
        });

    } finally {
        // await client.close();
    }
}
run().catch(console.error);

app.get('/', (req, res) => {
    res.send('running my crud server');
})
app.listen(port, () => {
    console.log('listening to port', port);
})