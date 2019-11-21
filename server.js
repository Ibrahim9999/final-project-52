/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Ibrahim Mahmoud
 * Email: mahmoudi@oregonstate.edu
 */
var express = require('express');
var expressHandlebars = require('express-handlebars');
var path = require('path');
var fs = require('fs'); /* this will be obsolete soon */
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.set('port', process.argv[process.argv.length - 1]);


app.use('/patient', require('./patient.js'));
app.use('/clinic', require('./clinic.js'));
app.use('/medication', require('./medication.js'));
app.use('/doctor', require('./doctor.js'));

app.use('/patient_medication', require('./patient_medication.js'));

var patient_medicationArray = JSON.parse(fs.readFileSync("patient_medication.json"));


app.get('/', function (req, res)
{
	res.status(200).render('home');
});

app.get('/home', function (req, res)
{
	res.status(200).render('home');
});

app.get('/index.html', function (req, res)
{
	res.status(200).render('home');
});
/**/
app.get('/patient_medication', function (req, res)
{
	res.status(200).render('patient_medication',
	{
		patient_medicationArray: JSON.parse(fs.readFileSync("patient_medication.json"))
	});
});

app.use(function(req,res)
{
  res.status(404).render('404');
});

app.use(function(err, req, res, next)
{
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
