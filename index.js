const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.database, {useNewUrlParser: true});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],

  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// process.env.PORT

const PORT =  5000;

app.listen(PORT, () => console.log(`running on ${PORT}`));