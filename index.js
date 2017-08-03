const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

require('./services/passport');

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
