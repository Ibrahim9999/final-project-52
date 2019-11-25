module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Gets all patients to populate dropdown */
    function getPeople(res, mysql, context, complete)
	{
        /* SELECT
		 * 		ID,
		 *		first_name,
		 *		last_name,
		 *		C_ID
		 * FROM
		 * 		doctor
		 * WHERE
		 *		ID = ?
		 */
		mysql.pool.query("SELECT character_id AS pid, fname, lname FROm bsg_people", function(error, results, fields)
		{
            if(error)
			{
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
	
    /* Gets all patients to populate dropdown */
    function getCertificates(res, mysql, context, complete){
        sql = "SELECT certification_id AS cid, title FROM bsg_cert";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.certificates = results
            complete();
        });
    }
	
	/* Display all patients */
	router.get('/', function(req, res)
	{
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deletePatient.js"];
		var mysql = req.app.get('mysql');
		
		getPatients(res, mysql, context, complete);
		
		function complete()
		{
			callbackCount++;
			
			if(callbackCount >= 1)
			{
				res.render('patient', context);
			}
		}
    });
	
	/* Creates a new patient */
    router.post('/', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* INSERT INTO patient
		 * 		(SSN, first_name, last_name, birthdate)
		 * VALUES
		 * 		(?, ?, ?, ?)
		 */
        var sql = "INSERT INTO patient (SSN, first_name, last_name, birthdate) VALUES (?, ?, ?, ?)";
        var inserts = [req.body.SSN, req.body.first_name, req.body.last_name, req.body.birthdate];
		
        sql = mysql.pool.query(sql, inserts, function(error, results, fields)
		{
            if(error)
			{
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }
			else
			{
                res.redirect('/patient');
            }
        });
    });
	
	/* Displays page for updating a patient based on ssn */
    router.get('/:SSN', function(req, res)
	{
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatePatient.js"];
        var mysql = req.app.get('mysql');
		
        getPatient(res, mysql, context, req.params.SSN, complete);
		
        function complete()
		{
            callbackCount++;
			
            if(callbackCount >= 1)
			{
                res.render('update_patient', context);
            }

        }
    });
	
	/* Updates a patient based on ssn */
	router.put('/:SSN', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
        console.log(req.body)
        console.log(req.params.SSN)
		
        /* UPDATE
		 *  	patient
		 * SET
		 *		first_name = ?,
		 *		last_name = ?
		 * WHERE
		 * 		SSN = ?
		 */
		var sql = "UPDATE patient SET first_name = ?, last_name = ? WHERE SSN = ?";
        var inserts = [req.body.first_name, req.body.last_name, req.params.SSN];
		
        sql = mysql.pool.query(sql, inserts, function(error, results, fields)
		{
            if(error)
			{
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }
			else
			{
                res.status(200);
                res.end();
            }
        });
    });
	
	/* Delete a patient based on ssn */
    router.delete('/:SSN', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* DELETE FROM
		 * 		patient
		 * WHERE
		 * 		SSN = ?
		 */
		var sql = "DELETE FROM patient WHERE SSN = ?";
        var inserts = [req.params.SSN];
		
        sql = mysql.pool.query(sql, inserts, function(error, results, fields)
		{
            if(error)
			{
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }
			else
			{
                res.status(202).end();
            }
        });
    });
	
	return router;
}();