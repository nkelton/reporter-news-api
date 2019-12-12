var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var database = require("./_helpers/database");
var jwt = require("./_helpers/jwt");
var errorHandler = require("./_helpers/error-handler");

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

//error handling
app.use(errorHandler);

//jwt authentication
// app.use(jwt());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
