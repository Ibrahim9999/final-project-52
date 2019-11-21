module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Gets a single doctor based on ID */
	function getDoctor(res, mysql, context, ID, complete)
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
		var sql = "SELECT ID, first_name, last_name, C_ID FROM doctor WHERE ID = ?";
        var inserts = [ID];
		
		mysql.pool.query(sql, inserts, function(error, results, fields)
		{
			if(error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			
			context.doctor = results[0];
			complete();
		});
    }
	
	/* Gets all doctors */
	function getDoctors(res, mysql, context, complete)
	{
		/* SELECT
		 * 		ID,
		 *		first_name,
		 *		last_name,
		 *		C_ID
		 * FROM
		 * 		doctor
		 */
		mysql.pool.query("SELECT ID, first_name, last_name, C_ID FROM doctor", function(error, results, fields)
		{
            if(error)
			{
                res.write(JSON.stringify(error));
                res.end();
            }
			
            context.doctor = results;
            complete();
        });
    }
	
	/* Display all doctors */
	router.get('/', function(req, res)
	{
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deleteDoctor.js"];
		var mysql = req.app.get('mysql');
		
		getDoctors(res, mysql, context, complete);
		
		function complete()
		{
			callbackCount++;
			
			if(callbackCount >= 1)
			{
				res.render('doctor', context);
			}
		}
    });
	
	/* Creates a new doctor */
    router.post('/', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* INSERT INTO doctor
		 * 		(first_name, last_name, C_ID)
		 * VALUES
		 * 		(?, ?, ?)
		 */
        var sql = "INSERT INTO doctor (first_name, last_name, C_ID) VALUES (?, ?, ?, ?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.C_ID];
		
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
                res.redirect('/doctor');
            }
        });
    });
	
	/* Displays page for updating a doctor based on id */
    router.get('/:ID', function(req, res)
	{
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateDoctor.js"];
        var mysql = req.app.get('mysql');
		
        getDoctor(res, mysql, context, req.params.ID, complete);
		
        function complete()
		{
            callbackCount++;
			
            if(callbackCount >= 1)
			{
                res.render('update_doctor', context);
            }

        }
    });
	
	/* Updates a doctor based on id */
	router.put('/:ID', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
        console.log(req.body)
        console.log(req.params.ID)
		
        /* UPDATE
		 *  	doctor
		 * SET
		 *		first_name = ?,
		 *		last_name = ?,
		 *		C_ID = ?
		 * WHERE
		 * 		ID = ?
		 */
		var sql = "UPDATE doctor SET first_name = ?, last_name = ?, C_ID = ? WHERE ID = ?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.C_ID, req.params.ID];
		
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
	
	/* Delete a doctor based on id */
    router.delete('/:ID', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* DELETE FROM
		 * 		doctor
		 * WHERE
		 * 		ID = ?
		 */
		var sql = "DELETE FROM doctor WHERE ID = ?";
        var inserts = [req.params.ID];
		
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