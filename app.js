const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express().use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
    if (err)
        console.log(err);
    else
        products = JSON.parse(data);
})

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const product = {
        id: randomUUID(),
        name,
        price
    }

    products.push(product);
    createProductFile(product);
})

app.get('/products', (req, res) => {
    const { 'max-price': maxPrice } = req.query;

    if (maxPrice) {
        const filteredProducts = products.filter(product => product.price <= parseFloat(maxPrice));
        return res.json(filteredProducts);
    }

    return res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    return res.json(products.find(product => product.id === id));
})

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products[productIndex].name = name;
    products[productIndex].price = price;


    createProductFile(products[productIndex]);

    return res.json(products[productIndex]);
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(productIndex, 1);

    createProductFile(products);
    return res.json(products);
})

function createProductFile(product) {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        return res.json(err ? err : product)
    })
}

app.listen(3001, () => console.log('Server is running in port 3001!'));