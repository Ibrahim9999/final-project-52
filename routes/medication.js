module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Gets a single medication based on ID */
	function getMedication(res, mysql, context, ID, complete)
	{
		/* SELECT
		 * 		ID,
		 *		name,
		 *		p_safe
		 * FROM
		 * 		medication
		 * WHERE
		 *		ID = ?
		 */
		var sql = "SELECT ID, name, p_safe FROM medication WHERE ID = ?";
        var inserts = [ID];
		
		mysql.pool.query(sql, inserts, function(error, results, fields)
		{
			if(error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			
			context.medication = results[0];
			complete();
		});
    }
	
	/* Gets all medications */
	function getMedications(res, mysql, context, complete)
	{
		/* SELECT
		 * 		ID,
		 *		name,
		 *		p_safe
		 * FROM
		 * 		medication
		 */
		mysql.pool.query("SELECT ID, name, p_safe FROM medication", function(error, results, fields)
		{
            if(error)
			{
                res.write(JSON.stringify(error));
                res.end();
            }
			
            context.medication = results;
            complete();
        });
    }
	
	/* Display all medications */
	router.get('/', function(req, res)
	{
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deleteMedication.js"];
		var mysql = req.app.get('mysql');
		
		getMedications(res, mysql, context, complete);
		
		function complete()
		{
			callbackCount++;
			
			if(callbackCount >= 1)
			{
				res.render('medication', context);
			}
		}
    });
	
	/* Creates a new medication */
    router.post('/', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* INSERT INTO medication
		 * 		(name, p_safe)
		 * VALUES
		 * 		(?, ?)
		 */
        var sql = "INSERT INTO medication (name, p_safe) VALUES (?, ?)";
        var inserts = [req.body.name, req.body.p_safe];
		
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
                res.redirect('/medication');
            }
        });
    });
	
	/* Displays page for updating a medication based on id */
    router.get('/:ID', function(req, res)
	{
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateMedication.js"];
        var mysql = req.app.get('mysql');
		
        getMedication(res, mysql, context, req.params.ID, complete);
		
        function complete()
		{
            callbackCount++;
			
            if(callbackCount >= 1)
			{
                res.render('update_medication', context);
            }

        }
    });
	
	/* Updates a medication based on id */
	router.put('/:ID', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
        console.log(req.body)
        console.log(req.params.ID)
		
        /* UPDATE
		 * 		medication
		 * SET
		 *		name = ?,
		 *		p_safe = ?
		 * WHERE
		 * 		ID = ?
		 */
		var sql = "UPDATE medication SET name = ?, p_safe = ? WHERE ID = ?";
        var inserts = [req.body.name, req.body.p_safe, req.params.ID];
		
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
	
	/* Delete a medication based on id */
    router.delete('/:ID', function(req, res)
	{
        var mysql = req.app.get('mysql');
		
		/* DELETE FROM
		 * 		medication
		 * WHERE
		 * 		ID = ?
		 */
		var sql = "DELETE FROM medication WHERE ID = ?";
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