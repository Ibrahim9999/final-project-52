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
		 *		IfNull(clinic.name, 'null') AS name
		 * FROM
		 * 		doctor
		 * LEFT JOIN clinic ON doctor.C_ID = clinic.ID
		 * ORDER BY doctor.ID ASC;
		 *
		 *
		 *
		 * SELECT
		 * 		ID,
		 * 		name
		 * FROM
		 * 		clinic;
		 */
		req.app.get('mysql').pool.query("SELECT doctor.ID, first_name, last_name, IfNull(clinic.name, 'null') as name FROM doctor LEFT JOIN clinic ON doctor.C_ID = clinic.ID ORDER BY doctor.ID ASC; SELECT ID, name FROM clinic;", function(error, results, fields)
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
				doctor: results[0],
				clinic: results[1]
			});
        });
		
		
    });
	
	/* Inserts a new doctor */
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
		 *		IfNull(C_ID, 0) as C_ID
		 * FROM
		 * 		doctor
		 * WHERE
		 *		ID = ?;
		 *
		 *
		 *
		 * SELECT
		 * 		ID,
		 * 		name
		 * FROM
		 * 		clinic;
		 *
		 *
		 *
		 * SELECT
		 * 		SSN,
		 *		patient.first_name,
		 *		patient.last_name,
		 *		DATE_FORMAT(birthdate, '%m/%d/%Y') AS birthdate,
		 * 		DOC_ID
		 * FROM
		 * 		patient
		 * INNER JOIN patient_doctor ON patient.SSN = patient_doctor.PAT_SSN
		 * WHERE patient_doctor.DOC_ID = ?
		 * ORDER BY patient.SSN ASC;
		 *
		 *
		 *
		 * SELECT DISTINCT
		 *		SSN,
		 *		patient.first_name,
		 *		patient.last_name
		 * FROM
		 *		patient
		 * WHERE NOT EXISTS
		 * (
		 *		SELECT
		 *			*
		 *		FROM
		 *			patient_doctor
		 *		WHERE
		 *			patient_doctor.PAT_SSN = patient.SSN AND patient_doctor.DOC_ID = '1'
		 * )
		 * ORDER BY patient.first_name ASC
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
		 * LEFT JOIN	clinic		ON doctor.C_ID = clinic.ID
		 * WHERE prescription.DOC_ID = ?
		 * ORDER BY prescription.issue_date DESC;
		 *
		 *
		 *
		 * SELECT
		 * 		ID,
		 * 		name
		 * FROM
		 * 		medication;
		 */
		req.app.get('mysql').pool.query("SELECT ID, first_name, last_name, C_ID FROM doctor WHERE ID = ?; SELECT ID, name FROM clinic; SELECT SSN, patient.first_name, patient.last_name, DATE_FORMAT(birthdate, '%m/%d/%Y') AS birthdate, DOC_ID FROM patient INNER JOIN patient_doctor ON patient.SSN = patient_doctor.PAT_SSN WHERE patient_doctor.DOC_ID = ? ORDER BY patient.SSN ASC; SELECT DISTINCT SSN, patient.first_name, patient.last_name FROM patient WHERE NOT EXISTS (SELECT * FROM patient_doctor WHERE patient_doctor.PAT_SSN = patient.SSN AND patient_doctor.DOC_ID = ?) ORDER BY patient.first_name ASC; SELECT prescription.ID pID, DATE_FORMAT(prescription.issue_date, '%m/%d/%Y') AS issue_date, clinic.name AS clinic_name, clinic.ID AS cID, patient.first_name, patient.last_name, patient.SSN, medication.name, medication.ID FROM prescription INNER JOIN medication ON prescription.MED_ID = medication.ID INNER JOIN patient ON prescription.PAT_SSN = patient.SSN INNER JOIN doctor ON prescription.DOC_ID = doctor.ID LEFT JOIN clinic ON doctor.C_ID = clinic.ID WHERE prescription.DOC_ID = ? ORDER BY prescription.issue_date DESC; SELECT ID, name FROM medication;", [req.params.ID, req.params.ID, req.params.ID, req.params.ID], function(error, results, fields)
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
				jsscripts: ["updateDoctor.js", "addPatient.js", "deletePatient_Doctor.js", "addPrescription.js"],
				doctor: results[0][0],
				clinic: results[1],
				patient: results[2],
				not_patient: results[3],
				prescription: results[4],
				medication: results[5]
			});
		});
    });
	
	/* Inserts an existing patient based on doctor's ID */
    router.post('/add-patient/:ID', function(req, res)
	{
        /* INSERT INTO patient_doctor
		 * 		(PAT_SSN, DOC_ID)
		 * 	VALUES
		 * 		(?, ?);
		 */
        req.app.get('mysql').pool.query("INSERT INTO patient_doctor (PAT_SSN, DOC_ID) VALUES (?, ?);", [req.body.SSN, req.params.ID], function(error, results, fields)
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
                res.redirect(303, '/doctor/' + req.params.ID);
            }
        });
    });
	
	/* Inserts an existing patient based on doctor's ID */
    router.post('/add-prescription/:ID', function(req, res)
	{
        /* INSERT INTO prescription
		 * 		(issue_date, PAT_SSN, MED_ID, DOC_ID)
		 * 	VALUES
		 * 		(Now(), ?, ?, ?);
		 */
        req.app.get('mysql').pool.query("INSERT INTO prescription (issue_date, PAT_SSN, MED_ID, DOC_ID) VALUES (Now(), ?, ?, ?);", [req.body.SSN, req.body.ID, req.params.ID], function(error, results, fields)
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
                res.redirect(303, '/doctor/' + req.params.ID);
            }
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
		{console.log("HERE");
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
    router.delete('/deletePatient_Doctor/:PAT_SSN/:DOC_ID', function(req, res)
	{
        /* DELETE FROM
		 * 		patient_doctor
		 * WHERE
		 * 		PAT_SSN = ? AND DOC_ID = ?
		 */
		req.app.get('mysql').pool.query("DELETE FROM patient_doctor WHERE PAT_SSN = ? AND DOC_ID = ?", [req.params.PAT_SSN, req.params.DOC_ID], function(error, results, fields)
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
                res.redirect(303, '/doctor/' + req.params.DOC_ID);
            }
        });
    });
	
	return router;
}();