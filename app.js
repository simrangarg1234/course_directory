const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/coursedb",  {useUnifiedTopology: true, useNewUrlParser: true });

const app = express();

const courseSchema = new mongoose.Schema ({
	_id: String,
	name: String,
	ltpc: String,
	desc: String
});

const Course = mongoose.model("Course", courseSchema);


// course.save();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", function(req,res) {
	res.render("home");
});

app.get("/index", function(req,res) {
	res.render("index");
});

app.get("/signup", function(req,res) {
	res.render("signup");
});

app.get("/form", function(req,res) {
	res.render("form");
});

app.post("/form",function(req,res) {
	cou_id = req.body.cousre_id;
	cou_name = req.body.cousre_name;
	ltpc = req.body.ltpc;
	cou_des = req.body.cousre_desc;
	
	const course = new Course ({
		_id: cou_id,
		name: cou_name,
		ltpc: ltpc,
		desc: cou_des
	});

	course.save();

	Course.find(function(err, courses) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("computer_science", {
				courses_data: courses
			});
			module.exports = course;
		}
	});

});

app.get("/login", function(req,res) {
	res.render("login");
});

app.get("/computer_science", function(req,res) {
	res.render("computer_science");
});


app.listen(3000,function() {
	console.log("server is up");
});