const express = require(('express'))
const fs = require('fs');
const PORT = process.env.PORT || 8080;

const app = express()



app.use(express.json());

app.get('/api/productos', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    res.json(products);
})

app.get('/api/productos/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const { id } = req.params;
    const product = products.find((product) => product.id === +(id));
     product ? res.json(product) : res.json({ error : 'producto no encontrado'})
    
})
app.post('/api/productos', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const { title, price, thumbnail } = req.body;
    const nuevoProducto = {
        id: products.length + 1,
        title,
        price,
        thumbnail,
    };
    products.push(nuevoProducto);
    fs.writeFileSync('./data.json', JSON.stringify(products, null, 2));
    res.json(nuevoProducto);
})

app.put('/api/productos/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    let productsUpdate = products.map((p) => p.id === +(id) ? p = {
        id,
        title,
        price,
        thumbnail
    } : p);

    console.log(productsUpdate)
    res.json('Todo ok');
    fs.writeFileSync('./data.json', JSON.stringify(productsUpdate, null, 2));
})

app.delete('/api/productos/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const { id } = req.params;
    let newProducts = products.filter(item => item.id != +(id))
    console.log(newProducts)
    res.json('Todo ok');
    fs.writeFileSync('./data.json', JSON.stringify(newProducts, null, 2));
})

app.get('*', (req, res) => {
    
    res.status(404).send('Página no encontrada')
})

const serverConnected = app.listen(PORT, () => {
    console.log(`Server is up and running`)
})
serverConnected.on('error', (error) => {
    console.log(error.message)
})