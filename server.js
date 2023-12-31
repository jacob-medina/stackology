require('dotenv').config();

const path = require('path');
const express = require('express');
const { create } = require('express-handlebars');
const session = require('express-session');
const controllers = require('./controllers');
const bcrypt = require('bcrypt');
const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// setup app
const app = express();
const PORT = process.env.PORT || 3001;

// setup express-handlebars
const hbs = create({
    helpers: require('./utils/helpers')
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sessionStore = new SequelizeStore({
    db: sequelize
});

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}

sessionStore.sync();

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(controllers);

sequelize.sync({ force: false })
.then(() => 
    app.listen(PORT, () => {
        console.info(`Listening on port ${PORT} at http://localhost:${PORT}`);
    })
);
