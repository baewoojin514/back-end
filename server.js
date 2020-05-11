var express = require('express');
var app = express();
app.use(express.json())
var router = require('./router/main')(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

//정적파일(HTML 에서 사용되는 .js 파일, css 파일, image 파일)
//app.use(express.static('public'));  