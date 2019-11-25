module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Gets a single clinic based on ID */
	function getClinic(res, mysql, context, ID, complete)
	{
		/* SELECT
		 * 		ID,
		 *		name,
		 *		address,
		 *		city,
		 *		state,
		 *		zip
		 * FROM
		 * 		clinic
		 * WHERE
		 *		ID = ?
		 */
		var sql = "SELECT ID, name, address, city, state, zip FROM clinic WHERE ID = ?";
        var inserts = [ID];
		
		mysql.pool.query(sql, inserts, function(error, results, fields)
		{
			if(error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			
			context.clinic = results[0];
			complete();
		});
    }
	
	/* Gets all clinics */
	function getClinics(res, mysql, context, complete)
	{
		/* SELECT
		 * 		ID,
		 *		name,
		 *		address,
		 *		city,
		 *		state,
		 *		zip
		 * FROM
		 * 		clinic
		 */
		mysql.pool.query("SELECT ID, name, address, city, state, zip FROM clinic", function(error, results, fields)
		{
            if(error)
			{
                res.write(JSON.stringify(error));
                res.end();
            }
			
            context.clinic = results;
            complete();
        });
    }
	
	/* Display all clinics */
	router.get('/', function(req, res)
	{
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deleteClinic.js"];
		var mysql = req.app.get('mysql');
		
		getClinics(res, mysql, context, complete);
		
		function complete()
		{
			callbackCount++;
			
			if(callbackCount >= 1)
			{
				res.render('clinic', context);
			}
		}
    });
	
	/* Creates a new clinic */
    router.post('/', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* INSERT INTO clinic
		 * 		(name, address, city, state, zip)
		 * VALUES
		 * 		(?, ?, ?, ?, ?)
		 */
        var sql = "INSERT INTO clinic (name, address, city, state, zip) VALUES (?, ?, ?, ?, ?)";
        var inserts = [req.body.name, req.body.address, req.body.city, req.body.state, req.body.zip];
		
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
                res.redirect('/clinic');
            }
        });
    });
	
	/* Displays page for updating a clinic based on id */
    router.get('/:ID', function(req, res)
	{
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateClinic.js"];
        var mysql = req.app.get('mysql');
		
        getClinic(res, mysql, context, req.params.ID, complete);
		
        function complete()
		{
            callbackCount++;
			
            if(callbackCount >= 1)
			{
                res.render('update_clinic', context);
            }

        }
    });
	
	/* Updates a clinic based on id */
	router.put('/:ID', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
        console.log(req.body)
        console.log(req.params.ID)
		
        /* UPDATE
		 * 		clinic
		 * SET
		 *		name = ?,
		 *		address = ?,
		 *		city = ?,
		 *		state = ?,
		 *		zip = ?
		 * WHERE
		 * 		ID = ?
		 */
		var sql = "UPDATE clinic SET name = ?, address = ?, city = ?, state = ?, zip = ? WHERE ID = ?";
        var inserts = [req.body.name, req.body.address, req.body.city, req.body.state, req.body.zip, req.params.ID];
		
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
	
	/* Delete a clinic based on id */
    router.delete('/:ID', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* DELETE FROM
		 * 		clinic
		 * WHERE
		 * 		ID = ?
		 */
		var sql = "DELETE FROM clinic WHERE ID = ?";
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