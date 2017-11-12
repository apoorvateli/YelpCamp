var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Moved this array out of app.get so that we have acces to it inside of the campgrounds post route in the callback function
var campgrounds = [
  { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
  { name: "Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
  { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
  { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
  { name: "Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
  { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
  { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
  { name: "Granite Hill", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
  { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" }
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

// Create new campgrounds
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);

  // redirect back to campgrounds page (campgrounds get route)
  res.redirect("/campgrounds");    // When we do a redirect, the default is to redirect as a get request
});

// This route will show the form to make a new campground. Then it will submit the form and
// send a post request to /campgrounds, and then we get redirected back to /campgrounds
// So, this route shows the form that will send the data to campgrounds post route
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.get("*", function(req, res) {
  res.send("Page not found");
});

app.listen(3000, function() {
  console.log("Listening to YelpCamp on port 3000");
});
