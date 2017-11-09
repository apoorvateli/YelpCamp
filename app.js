var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
    { name: "Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" }
  ];
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("*", function(req, res) {
  res.send("Page not found");
});

app.listen(3000, function() {
  console.log("Listening to YelpCamp on port 3000");
})
