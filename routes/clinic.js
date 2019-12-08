module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Display all clinics */
	router.get('/', function(req, res)
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
		req.app.get('mysql').pool.query("SELECT ID, name, address, city, state, zip FROM clinic", function(error, results, fields)
		{
            if(error)
			{
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
				res.redirect('500',
				{
					error: JSON.stringify(error)
				});
            }
			
            res.render('clinic',
			{
				title: "Clinics",
				jsscripts: ["deleteClinic.js"],
				clinic: results
			});
        });
		
    });
	
	/* Creates a new clinic */
    router.post('/', function(req, res)
	{
        /* INSERT INTO clinic
		 * 		(name, address, city, state, zip)
		 * VALUES
		 * 		(?, ?, ?, ?, ?)
		 */
        req.app.get('mysql').pool.query("INSERT INTO clinic (name, address, city, state, zip) VALUES (?, ?, ?, ?, ?)", [req.body.name, req.body.address, req.body.city, req.body.state, req.body.zip], function(error, results, fields)
		{
            if(error)
			{
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
				res.redirect('500',
				{
					error: JSON.stringify(error)
				});
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
		 *		ID = ?;
		 *
		 *
		 *
		 * SELECT
		 * 		doctor.ID,
		 *		first_name,
		 *		last_name,
		 * FROM
		 * 		doctor
		 * INNER JOIN clinic ON doctor.C_ID = clinic.ID
		 * WHERE doctor.C_ID = ?
		 * ORDER BY doctor.ID ASC;
		 *
		 *
		 *
		 * SELECT
		 * 		prescription.ID AS pID,
		 * 		DATE_FORMAT(prescription.issue_date, '%m/%d/%Y') AS issue_date,
		 * 		doctor.first_name AS doctor_first_name,
		 * 		doctor.last_name AS doctor_last_name,
		 * 		doctor.ID AS dID,
		 * 		patient.first_name,
		 * 		patient.last_name,
		 * 		patient.SSN,
		 * 		medication.name,
		 * 		medication.ID
		 * FROM
		 * 		prescription
		 * INNER JOIN	medication	ON prescription.MED_ID	= medication.ID
		 * INNER JOIN	patient		ON prescription.PAT_SSN	= patient.SSN
		 * INNER JOIN	doctor		ON prescription.DOC_ID	= doctor.ID
		 * INNER JOIN	clinic		ON doctor.C_ID = clinic.ID
		 * WHERE doctor.C_ID = ?
		 * ORDER BY prescription.issue_date DESC;
		 */
		req.app.get('mysql').pool.query("SELECT ID, name, address, city, state, zip FROM clinic WHERE ID = ?;  SELECT doctor.ID, first_name, last_name FROM doctor INNER JOIN clinic ON doctor.C_ID = clinic.ID WHERE doctor.C_ID = ? ORDER BY doctor.ID ASC; SELECT prescription.ID pID, DATE_FORMAT(prescription.issue_date, '%m/%d/%Y') AS issue_date, doctor.first_name AS doctor_first_name, doctor.last_name AS doctor_last_name, doctor.ID AS dID, patient.first_name, patient.last_name, patient.SSN, medication.name, medication.ID FROM prescription INNER JOIN medication ON prescription.MED_ID = medication.ID INNER JOIN patient ON prescription.PAT_SSN = patient.SSN INNER JOIN doctor ON prescription.DOC_ID = doctor.ID INNER JOIN clinic ON doctor.C_ID = clinic.ID WHERE doctor.C_ID = ? ORDER BY prescription.issue_date DESC;", [req.params.ID, req.params.ID, req.params.ID], function(error, results, fields)
		{
			if(error)
			{
				console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
				res.redirect('500',
				{
					error: JSON.stringify(error)
				});
			}
			
			res.render('clinic_info',
			{
				title: results[0][0].name,
				jsscripts: ["updateClinic.js"],
				clinic: results[0][0],
				doctor: results[1],
				prescription: results[2]
			});
		});
    });
	
	/* Updates a clinic based on id */
	router.put('/:ID', function(req, res)
	{
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
		req.app.get('mysql').pool.query("UPDATE clinic SET name = ?, address = ?, city = ?, state = ?, zip = ? WHERE ID = ?", [req.body.name, req.body.address, req.body.city, req.body.state, req.body.zip, req.params.ID], function(error, results, fields)
		{
            if(error)
			{
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
				res.redirect('500',
				{
					error: JSON.stringify(error)
				});
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
        /* DELETE FROM
		 * 		clinic
		 * WHERE
		 * 		ID = ?
		 */
		req.app.get('mysql').pool.query("DELETE FROM clinic WHERE ID = ?", [req.params.ID], function(error, results, fields)
		{
            if(error)
			{
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
				res.redirect('500',
				{
					error: JSON.stringify(error)
				});
            }
			else
			{
                res.status(202).end();
            }
        });
    });
	
	return router;
}();