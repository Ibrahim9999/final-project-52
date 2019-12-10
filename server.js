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
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var app = express();

expressHandlebars.registerHelper('if_null', function(value, options)
{
    if (arguments.length < 1)
        throw new Error("Handlebars Helper \"if_null\" needs 1 parameter");
    if(value == 'null')
        return options.inverse(this);
    
    return options.fn(this);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.set('port', process.argv[process.argv.length - 1]);


app.use('/patient', require('./routes/patient.js'));
app.use('/medication', require('./routes/medication.js'));
app.use('/doctor', require('./routes/doctor.js'));
app.use('/clinic', require('./routes/clinic.js'));
app.use('/search', require('./routes/search.js'));


app.get('/', function (req, res)
{
	res.status(200).render('home',
	{
		title: "Pharmacy Database"
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
