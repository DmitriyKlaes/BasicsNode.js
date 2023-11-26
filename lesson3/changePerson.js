const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'person.json');
const personData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));

personData.age = personData.age - 10;
personData.city = 'SPb';


fs.writeFileSync(pathFile, JSON.stringify(personData, null, 2));
