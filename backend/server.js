import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import path from 'path';
let app = express();
import session from 'express-session';
import mongoose from 'mongoose';
import LocalStrategy from 'passport-local'
const Strategy = LocalStrategy.Strategy;
import passport from './passport'
import auth from './auth.js';
import index from './index.js';
import http, {createServer} from 'http'
import socketIO from 'socket.io'
const server = createServer(app)
const io = socketIO(server)
var MongoStore = require('connect-mongo')(session);

mongoose.connection.on('connected', () =>{
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) =>{
  console.log('log:' + err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);
mongoose.set('debug', true);

app.use(express.static(path.join(__dirname, 'build', 'index.html')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport Implementation
let ioMongoStore = new MongoStore({
  mongooseConnection: require('mongoose').connection,
  autoRemove: 'native'
})

app.use(session({
  secret: process.env.SECRET,
  store: ioMongoStore,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000 * 7
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile('../build/index.html')
})
app.use('/api', auth(passport));
index(io, ioMongoStore)

server.listen(process.env.PORT || 8888)
