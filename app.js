var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// mongoose.Promise = global.Promise;
// Replaces Mongoose's default promise library with JavaScript's native promise library,
// as mpromise (mongoose's default promise library) is deprecated.

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
/*
Campground.create({
  name: "Pawna Lake",
  image: "https://images.thrillophilia.com/image/upload/s--GyS24Irf--/c_fill,f_auto,fl_strip_profile,h_800,q_auto,w_1300/v1/images/photos/000/050/740/original/1462422803_GSC4.jpg.jpg?1462422803"
}, function(err, campground) {
  if(err) {
    console.log("Error while creating campground:");
    console.log(err);
  }
  else {
    console.log("New campground created:");
    console.log(campground);
  }
});
*/


// Moved this array out of app.get so that we have acces to it inside of the campgrounds post route in the callback function
/*
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
*/

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log("Error while retrieving all campgrounds:");
      console.log(err);
    }
    else {
      // Display all campgrounds in db on campgrounds page
      res.render("campgrounds", {campgrounds: allCampgrounds});
      // Display them in the CONSOLE too
      console.log("All campgrounds in the db:");
      console.log(allCampgrounds);
    }
  });
  // res.render("campgrounds", {campgrounds: allCampgrounds});
});

// Create new campgrounds
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  // campgrounds.push(newCampground); // instead of pushing to the array which no longer exists since we have a db now
  Campground.create(newCampground, function(err, newCampground){
    if(err) {
      console.log("Error while creating a new campground:");
      console.log(err);
    }
    else {
      res.redirect("/campgrounds");
      // Display the new campground in the CONSOLE
      console.log("Newly created campground:");
      console.log(newCampground);
    }
  })

  // redirect back to campgrounds page (campgrounds get route)
  // res.redirect("/campgrounds");    // When we do a redirect, the default is to redirect as a get request
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
