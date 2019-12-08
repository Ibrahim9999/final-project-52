module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Display all medications */
	router.get('/', function(req, res)
	{
		/* SELECT
		 * 		ID,
		 *		name,
		 *		CASE WHEN p_safe = 1 THEN 'Yes' ELSE 'No' END AS p_safe
		 * FROM
		 * 		medication
		 */
		req.app.get('mysql').pool.query("SELECT ID, name, CASE WHEN p_safe = 1 THEN 'Yes' ELSE 'No' END AS p_safe FROM medication", function(error, results, fields)
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
			
            res.render('medication',
			{
				title: "Medications",
				jsscripts: ["deleteMedication.js"],
				medication: results
			});
        });
    });
	
	/* Creates a new medication */
    router.post('/', function(req, res)
	{
        /* INSERT INTO medication
		 * 		(name, p_safe)
		 * VALUES
		 * 		(?, ?)
		 */
        req.app.get('mysql').pool.query("INSERT INTO medication (name, p_safe) VALUES (?, ?)", [req.body.name, req.body.p_safe], function(error, results, fields)
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
                res.redirect('/medication');
            }
        });
    });
	
	/* Displays page for updating a medication based on id */
    router.get('/:ID', function(req, res)
	{
        /* SELECT
		 * 		ID,
		 *		name,
		 *		p_safe
		 * FROM
		 * 		medication
		 * WHERE
		 *		ID = ?;
		 *
		 *
		 *
		 * SELECT
		 * 		prescription.ID AS pID,
		 * 		DATE_FORMAT(prescription.issue_date, '%m/%d/%Y') AS issue_date,
		 * 		clinic.name AS clinic_name,
		 * 		clinic.ID AS cID,
		 * 		doctor.first_name AS doctor_first_name,
		 * 		doctor.last_name AS doctor_last_name,
		 * 		doctor.ID AS dID,
		 * 		patient.first_name,
		 * 		patient.last_name,
		 * 		patient.SSN
		 * FROM
		 * 		prescription
		 * INNER JOIN	medication	ON prescription.MED_ID	= medication.ID
		 * INNER JOIN	patient		ON prescription.PAT_SSN	= patient.SSN
		 * INNER JOIN	doctor		ON prescription.DOC_ID	= doctor.ID
		 * INNER JOIN	clinic		ON doctor.C_ID = clinic.ID
		 * WHERE medication.ID = ?
		 * ORDER BY prescription.issue_date DESC;
		 */
		req.app.get('mysql').pool.query("SELECT ID, name, p_safe FROM medication WHERE ID = ?; SELECT prescription.ID pID, DATE_FORMAT(prescription.issue_date, '%m/%d/%Y') AS issue_date, clinic.name AS clinic_name, clinic.ID AS cID, doctor.first_name AS doctor_first_name, doctor.last_name AS doctor_last_name, doctor.ID AS dID, patient.first_name, patient.last_name, patient.SSN FROM prescription INNER JOIN medication ON prescription.MED_ID = medication.ID INNER JOIN patient ON prescription.PAT_SSN = patient.SSN INNER JOIN doctor ON prescription.DOC_ID = doctor.ID INNER JOIN clinic ON doctor.C_ID = clinic.ID WHERE medication.ID = ? ORDER BY prescription.issue_date DESC;", [req.params.ID, req.params.ID], function(error, results, fields)
		{
			if(error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}
			
			res.render('medication_info',
			{
				title: results[0][0].name,
				jsscripts: ["updateMedication.js"],
				medication: results[0][0],
				prescription: results[1]
			});
		});
    });
	
	/* Updates a medication based on id */
	router.put('/:ID', function(req, res)
	{
        /* UPDATE
		 * 		medication
		 * SET
		 *		name = ?,
		 *		p_safe = ?
		 * WHERE
		 * 		ID = ?
		 */
		req.app.get('mysql').pool.query("UPDATE medication SET name = ?, p_safe = ? WHERE ID = ?", [req.body.name, req.body.p_safe, req.params.ID], function(error, results, fields)
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
                res.status(200).end();
            }
        });
    });
	
	/* Delete a medication based on id */
    router.delete('/:ID', function(req, res)
	{
        /* DELETE FROM
		 * 		medication
		 * WHERE
		 * 		ID = ?
		 */
		req.app.get('mysql').pool.query("DELETE FROM medication WHERE ID = ?", [req.params.ID], function(error, results, fields)
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