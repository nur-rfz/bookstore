const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const routes = require('./routes/books');

let db = require('./config/database.js')
app.use('/', routes);

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.listen(port, () => console.log(`Server is listening on port ${port}`));