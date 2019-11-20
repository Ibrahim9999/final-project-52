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
var fs = require('fs');
var mysql = require('./dbcon.js');


var app = express();

app.use(express.static('public'));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.argv[process.argv.length - 1]);


var patientArray = JSON.parse(fs.readFileSync("patient.json"));
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

app.get('/home.html', function (req, res)
 {
	res.status(200).render('home');
});

app.get('/index.html', function (req, res)
{
	res.status(200).render('home');
});

app.get('/patient', function (req, res)
{
	res.status(200).render('patient',
	{
		patientArray: JSON.parse(fs.readFileSync("patient.json"))
	});
});

app.get('/patients', function (req, res)
{
	res.status(200).render('patient',
	{
		patientArray: JSON.parse(fs.readFileSync("patient.json"))
	});
});

app.get('/patient.html', function (req, res)
{
	res.status(200).render('patient',
	{
		patientArray: JSON.parse(fs.readFileSync("patient.json"))
	});
});

app.get('/patients.html', function (req, res)
{
	res.status(200).render('patient',
	{
		patientArray: JSON.parse(fs.readFileSync("patient.json"))
	});
});

app.get('/medication', function (req, res)
{
	res.status(200).render('medication',
	{
		medicationArray: JSON.parse(fs.readFileSync("medication.json"))
	});
});

app.get('/medications', function (req, res)
{
	res.status(200).render('medication',
	{
		medicationArray: JSON.parse(fs.readFileSync("medication.json"))
	});
});

app.get('/medication.html', function (req, res)
{
	res.status(200).render('medication',
	{
		medicationArray: JSON.parse(fs.readFileSync("medication.json"))
	});
});

app.get('/medications.html', function (req, res)
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

app.get('/doctors', function (req, res)
{
	res.status(200).render('doctor',
	{
		doctorArray: JSON.parse(fs.readFileSync("doctor.json"))
	});
});

app.get('/doctor.html', function (req, res)
{
	res.status(200).render('doctor',
	{
		doctorArray: JSON.parse(fs.readFileSync("doctor.json"))
	});
});

app.get('/doctors.html', function (req, res)
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

app.get('/clinics', function (req, res)
{
	res.status(200).render('clinic',
	{
		clinicArray: JSON.parse(fs.readFileSync("clinic.json"))
	});
});

app.get('/clinic.html', function (req, res)
{
	res.status(200).render('clinic',
	{
		clinicArray: JSON.parse(fs.readFileSync("clinic.json"))
	});
});

app.get('/clinics.html', function (req, res)
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

app.get('/patients_medications', function (req, res)
{
	res.status(200).render('patient_medication',
	{
		patient_medicationArray: JSON.parse(fs.readFileSync("patient_medication.json"))
	});
});

app.get('/patient_medication.html', function (req, res)
{
	res.status(200).render('patient_medication',
	{
		patient_medicationArray: JSON.parse(fs.readFileSync("patient_medication.json"))
	});
});

app.get('/patients_medications.html', function (req, res)
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
