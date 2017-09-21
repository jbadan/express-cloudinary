var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var cloudinary = require('cloudinary');
require('dotenv').config();
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);

var images = [];

app.get('/', function(req, res) {
  res.render('index', {images, cloudinary});
});

app.post('/', upload.single('myFile'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){
    images.push(result.public_id);
    res.redirect('/');
  });
  // res.send(req.file);

});

app.listen(3000);
