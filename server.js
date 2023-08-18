require('dotenv').config();

const path = require('path');
const express = require('express');
const { create } = require('express-handlebars');
const controllers = require('./controllers');

// setup app
const app = express();
const PORT = process.env.PORT || 3001;

// setup express-handlebars
const hbs = create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(controllers);

app.listen(PORT, () => {
    console.info(`Listening on port ${PORT} at http://localhost:${PORT}`);
});
