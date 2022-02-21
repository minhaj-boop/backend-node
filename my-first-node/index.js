const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = 5000;

app.get('/', (req, res) => {
    res.send('wow, Hello from node');
});

//getting some demo users
const users = [{ id: 0, name: 'Kolala', email: 'imkolala@gmail.com' },
{ id: 1, name: 'Botata', email: 'imkolala@gmail.com' },
{ id: 2, name: 'Banana', email: 'imkolala@gmail.com' },
{ id: 3, name: 'Potata', email: 'imkolala@gmail.com' },
{ id: 4, name: 'Hanan', email: 'imkolala@gmail.com' },
{ id: 5, name: 'Meow', email: 'imkolala@gmail.com' },
{ id: 6, name: 'Teow', email: 'imkolala@gmail.com' },
{ id: 7, name: 'meow', email: 'imkolala@gmail.com' },]

// app.get('/users', (req, res) => {
//     res.send(users);
// });

//search query
app.get('/users', (req, res) => {
    const search = req.query.search;
    if (search) {
        const searchResult = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(searchResult);
    }
    else {
        res.send(users);
    }
});


// .app METHOD
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('hitting the post', req.body);
    res.json(newUser);
})


//request with params
app.get('/users/:id', (req, res) => {
    // console.log(req.params.id);
    const index = req.params.id;
    const user = users[index];
    res.send(user);
});

app.get('/fruits', (req, res) => {
    res.send(['magose', 'kolala', 'apple']);
});

//listen
app.listen(port, () => {
    console.log('listening to port', port);
});