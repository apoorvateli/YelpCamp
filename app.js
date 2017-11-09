var express = require("express");
var app = express();



app.get("*", function(req, res) {
  res.send("Page not found");
});

app.listen(3000, function() {
  console.log("Listening to YelpCamp on port 3000");
})
