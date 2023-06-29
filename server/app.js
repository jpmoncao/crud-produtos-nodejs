const runQuery = require('./db/query');
const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    console.log(name, price)

    const product = {
        id: randomUUID(),
        name,
        price
    };

    let sql = `INSERT INTO produtos (id_produto, nome_produto, preco_produto) VALUES ('${product.id}', '${product.name}', '${product.price}')`;

    await runQuery(sql);

    sql = `SELECT * FROM produtos WHERE produtos.id_produto = '${product.id}'`;
    const result = await runQuery(sql);

    res.status(201).json(result);
});


app.get('/products', async (req, res) => {
    const { 'max-price': maxPrice } = req.query;

    let sql = 'SELECT * FROM produtos';

    if (maxPrice) {
        sql += ' WHERE produtos.preco_produto <= ' + maxPrice;
    }

    try {
        const products = await runQuery(sql);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    sql = `SELECT * FROM produtos WHERE produtos.id_produto = '${id}'`;
    const product = await runQuery(sql);

    return res.json(product);
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    sql = `UPDATE produtos SET produtos.nome_produto = '${name}', produtos.preco_produto = '${price}' WHERE produtos.id_produto = '${id}'`;
    await runQuery(sql);

    sql = `SELECT * FROM produtos WHERE produtos.id_produto = '${id}'`;
    const product = await runQuery(sql);

    return res.json(product);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    sql = `DELETE FROM produtos WHERE produtos.id_produto = '${id}'`;
    await runQuery(sql);

    sql = `SELECT * FROM produtos`;
    const products = await runQuery(sql);

    return res.json(products);
})

app.listen(5050, () => console.log('Server is running in port 5050!'));