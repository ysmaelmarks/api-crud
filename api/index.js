const express = require('express');
const routes = require('./routes')

const app = express();

routes(app);    

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

module.exports = app