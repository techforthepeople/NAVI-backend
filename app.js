var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { db } = require('./db');
var sensorRouter = require('./routes/sensor_logs');
var usersRouter = require('./routes/users');
var locationRouter = require('./routes/location');
var messagesRouter = require('./routes/messages');
var cors = require('cors')


var app = express();

var corsOptions = {
  origin: 'https://solidarity.onrender.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/sensors', sensorRouter);
app.use('/users', usersRouter);
app.use('/location', locationRouter); 
app.use('/messages', messagesRouter)

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Solidarity' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const syncDb = () =>  db.sync({force: true})

const bootApp = async () => {
  await syncDb()
  require('child_process').fork('./scripts/seed.js')
  console.log("Connected DB!")
}

bootApp()

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
