module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Display all doctors */
	router.get('/', function(req, res)
	{
		/* SELECT
		 * 		doctor.ID,
		 *		first_name,
		 *		last_name,
		 *		clinic.name
		 * FROM
		 * 		doctor
		 * INNER JOIN clinic ON doctor.C_ID = clinic.ID
		 * ORDER BY doctor.ID ASC;
		 */
		req.app.get('mysql').pool.query("SELECT doctor.ID, first_name, last_name, name FROM doctor INNER JOIN clinic ON doctor.C_ID = clinic.ID ORDER BY doctor.ID ASC;", function(error, results, fields)
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
			
            res.render('doctor',
			{
				title: "Doctors",
				jsscripts: ["deleteDoctor.js"],
				doctor: results
			});
        });
		
		
    });
	
	/* Creates a new doctor */
    router.post('/', function(req, res)
	{
        /* INSERT INTO doctor
		 * 		(first_name, last_name, C_ID)
		 * VALUES
		 * 		(?, ?, ?)
		 */
        req.app.get('mysql').pool.query("INSERT INTO doctor (first_name, last_name, C_ID) VALUES (?, ?, ?)", [req.body.first_name, req.body.last_name, req.body.C_ID], function(error, results, fields)
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
                res.redirect('/doctor');
            }
        });
    });
	
	/* Displays page for updating a doctor based on ID */
    router.get('/:ID', function(req, res)
	{
        /* SELECT
		 * 		ID,
		 *		first_name,
		 *		last_name,
		 *		C_ID
		 * FROM
		 * 		doctor
		 * WHERE
		 *		ID = ?;
		 *
		 *
		 *
		 * SELECT DISTINCT
		 * 		SSN,
		 *		patient.first_name,
		 *		patient.last_name,
		 *		DATE_FORMAT(birthdate, '%m/%d/%Y') AS birthdate
		 * FROM
		 * 		patient
		 * INNER JOIN prescription	ON patient.SSN			= prescription.PAT_SSN
		 * INNER JOIN doctor		ON prescription.DOC_ID	= doctor.ID
		 * WHERE doctor.ID = ?
		 * ORDER BY patient.SSN ASC;
		 *
		 *
		 *
		 * SELECT
		 * 		prescription.ID AS pID,
		 * 		DATE_FORMAT(prescription.issue_date, '%m/%d/%Y') AS issue_date,
		 * 		clinic.name AS clinic_name,
		 * 		clinic.ID AS cID,
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
		 * WHERE prescription.DOC_ID = ?
		 * ORDER BY prescription.issue_date DESC;
		 */
		req.app.get('mysql').pool.query("SELECT ID, first_name, last_name, C_ID FROM doctor WHERE ID = ?; SELECT DISTINCT SSN, patient.first_name, patient.last_name, DATE_FORMAT(birthdate, '%m/%d/%Y') AS birthdate FROM patient INNER JOIN prescription ON patient.SSN = prescription.PAT_SSN INNER JOIN doctor ON prescription.DOC_ID = doctor.ID WHERE doctor.ID = ? ORDER BY patient.SSN ASC; SELECT prescription.ID pID, DATE_FORMAT(prescription.issue_date, '%m/%d/%Y') AS issue_date, clinic.name AS clinic_name, clinic.ID AS cID, patient.first_name, patient.last_name, patient.SSN, medication.name, medication.ID FROM prescription INNER JOIN medication ON prescription.MED_ID = medication.ID INNER JOIN patient ON prescription.PAT_SSN = patient.SSN INNER JOIN doctor ON prescription.DOC_ID = doctor.ID INNER JOIN clinic ON doctor.C_ID = clinic.ID WHERE prescription.DOC_ID = ? ORDER BY prescription.issue_date DESC;", [req.params.ID, req.params.ID, req.params.ID], function(error, results, fields)
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
			
			res.render('doctor_info',
			{
				title: results[0][0].first_name + " " + results[0][0].last_name,
				jsscripts: ["updateDoctor.js"],
				doctor: results[0][0],
				patient: results[1],
				prescription: results[2]
			});
		});
    });
	
	/* Updates a doctor based on id */
	router.put('/:ID', function(req, res)
	{
        /* UPDATE
		 *  	doctor
		 * SET
		 *		first_name = ?,
		 *		last_name = ?,
		 *		C_ID = ?
		 * WHERE
		 * 		ID = ?
		 */
		req.app.get('mysql').pool.query("UPDATE doctor SET first_name = ?, last_name = ?, C_ID = ? WHERE ID = ?", [req.body.first_name, req.body.last_name, req.body.C_ID, req.params.ID], function(error, results, fields)
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
	
	/* Delete a doctor based on id */
    router.delete('/:ID', function(req, res)
	{
        /* DELETE FROM
		 * 		doctor
		 * WHERE
		 * 		ID = ?
		 */
		req.app.get('mysql').pool.query("DELETE FROM doctor WHERE ID = ?", [req.params.ID], function(error, results, fields)
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