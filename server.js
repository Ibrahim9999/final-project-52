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


var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var patientArray = JSON.parse(fs.readFileSync("patient.json"));
var medicationArray = JSON.parse(fs.readFileSync("medication.json"));
var doctorArray = JSON.parse(fs.readFileSync("doctor.json"));
var clinicArray = JSON.parse(fs.readFileSync("clinic.json"));
var patient_medicationArray = JSON.parse(fs.readFileSync("patient_medication.json"));

/*
app.get('/posts/:n', function (req, res, next)
{
	var index = req.params.n;
	
	if (index >= 0 && index < postArray.length)
	{
		res.status(200).render('partials/posts',
		{
			title: postArray[index].title,
			reference: postArray[index].reference,
			image1: postArray[index].image1,
			image2: postArray[index].image2,
			image3: postArray[index].image3,
			description: postArray[index].description
		});
	}
	else
		res.status(404).render('404', {});
	
});
*/
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

app.get("*", function (req, res) {
	res.status(404).render('404', {});
});

app.listen(port, function () {
	console.log("== Server is listening on port", port);
});