var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var database = require("./_helpers/database");
var jwt = require("./_helpers/jwt");
const { errorHandler, handle404 } = require("./_helpers/error-handler");

var usersRouter = require("./routes/users");
var storiesRouter = require("./routes/stories");
var reportersRouter = require("./routes/reporters");
var muckrackRouter = require("./routes/muckrack");

var app = express();

//connect to db
database.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/muck-rack", muckrackRouter);
app.use("/users", usersRouter);
app.use("/stories", storiesRouter);
app.use("/reporters", reportersRouter);

//jwt authentication
// app.use(jwt());

//error handling
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return handle404(req, res, next);
});

module.exports = app;
