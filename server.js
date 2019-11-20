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
app.set('port', process.argv[2]);


app.use('/patient', require('./patient.js'));

//var patientArray = JSON.parse(fs.readFileSync("patient.json"));
var medicationArray = JSON.parse(fs.readFileSync("medication.json"));
var doctorArray = JSON.parse(fs.readFileSync("doctor.json"));
var clinicArray = JSON.parse(fs.readFileSync("clinic.json"));
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
/*
app.get('/patient', function (req, res)
{
	res.status(200).render('patient',
	{
		patientArray: JSON.parse(fs.readFileSync("patient.json"))
	});
});
*/
app.get('/medication', function (req, res)
{
	res.status(200).render('medication',
	{
		medicationArray: JSON.parse(fs.readFileSync("medication.json"))
	});
});

app.get('/doctor', function (req, res)
{
	res.status(200).render('doctor',
	{
		doctorArray: JSON.parse(fs.readFileSync("doctor.json"))
	});
});

app.get('/clinic', function (req, res)
{
	res.status(200).render('clinic',
	{
		clinicArray: JSON.parse(fs.readFileSync("clinic.json"))
	});
});

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