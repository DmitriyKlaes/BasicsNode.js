const fs = require('fs');
const path = require('path');
const express = require('express');
const joi = require('joi');

const app = express();
const pathUsers = path.join(__dirname, 'users.json');

const userScheme = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    age: joi.number().min(0).max(90).required(),
    city: joi.string().min(1)
});

app.use(express.json());

app.get('/users', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));
        res.send(data);
    } catch (err) {
        res.status(404);
        res.send({ data: [] });
    }
});

app.get('/users/:id', (req, res) => {
    try {
        const userId = +req.params.id;
        const data = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));
        const user = data.find((user) => user.id === userId);
        if (user) {
            res.send(user);
        } else {
            throw Error;
        }
    } catch (err) {
        res.status(404);
        res.send({ user: null });
    }
});

app.post('/users', (req, res) => {
    const result = userScheme.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details });
    }
    let data;
    let uniqueId;
    try {
        data = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));
        uniqueId = +data[data.length - 1].id;
    } catch (err) {
        data = [];
        uniqueId = 0;
    }
    const user = {
        id: ++uniqueId,
        ...req.body
    };
    data.push(user);
    res.send({ id: user.id });
    fs.writeFileSync(pathUsers, JSON.stringify(data, null, 2));
});

app.put('/users/:id', (req, res) => {
    const result = userScheme.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details });
    }
    try {
        const userId = +req.params.id;
        const data = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));
        const user = data.find((user) => user.id === userId);
        if (user) {
            const { firstName, secondName, age, city } = req.body;
            user.firstName = firstName;
            user.secondName = secondName;
            user.age = age;
            user.city = city;
            res.send(user);
            fs.writeFileSync(pathUsers, JSON.stringify(data, null, 2));
        } else {
            throw Error;
        }
    } catch (err) {
        res.status(404);
        res.send({ user: null });
    }
});

app.delete('/users/:id', (req, res) => {
    try {
        const userId = +req.params.id;
        const data = JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));
        const user = data.find((user) => user.id === userId);
        if (user) {
            const userIndex = data.indexOf(user);
            data.splice(userIndex, 1);
            res.send(user);
            fs.writeFileSync(pathUsers, data.length === 0 ? "" : JSON.stringify(data, null, 2));
        } else {
            throw Error;
        }
    } catch (err) {
        res.status(404);
        res.send({ user: null });
    }
});

app.listen(3000);