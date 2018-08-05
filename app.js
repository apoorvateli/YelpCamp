require('dotenv').config();

var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    PORT = process.env.PORT || 3000,
    Campground = require("./models/campground"), // Campground model - name, image, description
    seedDB = require("./seeds");

var dbPath = process.env.DATABASEURL || "mongodb://localhost/go_camping";
mongoose.connect(dbPath);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX - Display all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log("Error while retrieving all campgrounds:");
      console.log(err);
    }
    else {
      // Display all campgrounds in db on campgrounds page
      res.render("index", {campgrounds: allCampgrounds});
      // Display them in the CONSOLE too
      // console.log("All campgrounds in the db:");
      // console.log(allCampgrounds);
    }
  });
  // res.render("campgrounds", {campgrounds: allCampgrounds});
});

// CREATE - Add new campground to the DB
// Create new campgrounds
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
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

// NEW - Display a form to create new campground
// This route will show the form to make a new campground. Then it will submit the form and
// send a post request to /campgrounds, and then we get redirected back to /campgrounds
// So, this route shows the form that will send the data to campgrounds post route
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// SHOW - Show info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(foundCampground);
      // render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

app.get("*", function(req, res) {
  res.send("Page not found");
});

app.listen(PORT, function() {
  console.log("Listening to goCamping on port " + PORT);
});
