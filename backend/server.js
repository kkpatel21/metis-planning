import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
let app = express();
import session from 'express-session';
import mongoose from 'mongoose';
import LocalStrategy from 'passport-local'
const Strategy = LocalStrategy.Strategy;
import passport from './passport'
import routes from './auth.js';
var MongoStore = require('connect-mongo')(session);

mongoose.connection.on('connected', () =>{
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) =>{
  console.log('log:' + err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport Implementation
app.use(session({
  secret: 'yer',
  store: new MongoStore({
    mongooseConnection: require('mongoose').connection,
    autoRemove: 'native' 
  }),
  // cookie: {
  //   maxAge: 60 * 60 * 24 * 14 
  // }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes(passport));

app.listen(process.env.PORT || 8888)
