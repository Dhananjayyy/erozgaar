// npm modules: express cors mysql2
var exp = require("express");
var cors = require("cors");

var app = exp();
app.use(cors());

app.listen(9000, function () {
    console.log("server started on 9000");
});

// test the connection
app.get("/", function (req, res) {
res.send("<h1>This is Home</h1>");
});