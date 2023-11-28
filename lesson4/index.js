const express = require('express');
const joi = require('joi');

const app = express();

const users = [];

let uniqueId = 0;

const userScheme = joi.object({
  firstName: joi.string().min(1).required(),
  secondName: joi.string().min(1).required(),
  age: joi.number().min(0).max(90).required(),
  city: joi.string().min(1)
});
app.use(express.json());

app.get('/users', (req, res) => {
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
      const userId = +req.params.id;
      const user = users.find((user) => user.id === userId);
      if (user) {
        res.send(user);
      } else {
        res.status(404);
        res.send({ user: null });
      }
});

app.post('/users', (req, res) => {
    uniqueId += 1;
    users.push({
      id: uniqueId,
      ...req.body
    });
    res.send({ id: uniqueId });
});

app.put('/users/:id', (req, res) => {
    const result = userScheme.validate(req.body);
    if(result.error) {
        return res.status(400).send({ error: result.error.details });
    }
    const userId = +req.params.id;
    const user = users.find(user => user.id === userId);
    if (user) {
        const { firstName, secondName, age, city} = req.body;
        user.firstName = firstName;
        user.secondName = secondName;
        user.age = age;
        user.city = city;
        res.send(user);
    } else {
        res.status(404);
        res.send({user: null})
    }
});

app.delete('/users/:id', (req, res) => {
  const userId = +req.params.id;
  const user = users.find(user => user.id === userId);
  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    res.send(user);
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.listen(3000);