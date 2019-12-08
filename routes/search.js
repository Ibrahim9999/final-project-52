module.exports = function()
{
    var express = require('express');
    var router = express.Router();
	
	/* Displays search results based on key word */
    router.post('/', function(req, res)
	{
		/* SELECT DISTINCT
		 * 		prescription.ID AS pID,
		 * 		DATE_FORMAT(issue_date, '%m/%d/%Y') AS issue_date,
		 * 		clinic.name AS clinic_name,
		 * 		clinic.ID AS cID,
		 * 		doctor.first_name AS doctor_first_name,
		 * 		doctor.last_name AS doctor_last_name,
		 * 		doctor.ID AS dID,
		 * 		SSN,
		 * 		patient.first_name,
		 * 		patient.last_name,
		 * 		medication.name,
		 * 		medication.ID
		 * FROM
		 * 		patient
		 * INNER JOIN	prescription	ON patient.SSN			= prescription.PAT_SSN
		 * INNER JOIN	medication		ON prescription.MED_ID	= medication.ID
		 * INNER JOIN	doctor			ON prescription.DOC_ID	= doctor.ID
		 * INNER JOIN	clinic			ON doctor.C_ID			= clinic.ID
		 * WHERE
		 * 		SSN LIKE CONCAT('%', ?, '%') OR
		 * 		patient.first_name LIKE CONCAT('%', ?, '%') OR
		 * 		patient.last_name LIKE CONCAT('%', ?, '%') OR
		 * 		birthdate LIKE CONCAT('%', ?, '%') OR
		 * 		doctor.ID LIKE CONCAT('%', ?, '%') OR
		 * 		doctor.first_name LIKE CONCAT('%', ?, '%') OR
		 * 		doctor.last_name LIKE CONCAT('%', ?, '%') OR
		 * 		C_ID LIKE CONCAT('%', ?, '%') OR
		 * 		medication.ID LIKE CONCAT('%', ?, '%') OR
		 * 		medication.name LIKE CONCAT('%', ?, '%') OR
		 * 		p_safe LIKE CONCAT('%', ?, '%')
		 * ORDER BY issue_date DESC;
		 * 
		 * 
		 * 
		 * SELECT
		 * 		SSN,
		 * 		first_name,
		 * 		last_name,
		 * 		DATE_FORMAT(birthdate, '%m/%d/%Y') AS birthdate
		 * FROM
		 * 		patient
		 * WHERE
		 *		SSN LIKE CONCAT('%', ?, '%') OR
		 * 		patient.first_name LIKE CONCAT('%', ?, '%') OR
		 * 		patient.last_name LIKE CONCAT('%', ?, '%') OR
		 * 		birthdate LIKE CONCAT('%', ?, '%');
		 * 
		 * 
		 * 
		 * SELECT
		 * 		doctor.ID,
		 *		first_name,
		 *		last_name,
		 *		clinic.name
		 * FROM
		 * 		doctor
		 * INNER JOIN clinic ON doctor.C_ID = clinic.ID
		 * WHERE
		 *		doctor.ID LIKE CONCAT('%', ?, '%') OR
		 * 		first_name LIKE CONCAT('%', ?, '%') OR
		 * 		last_name LIKE CONCAT('%', ?, '%') OR
		 * 		C_ID LIKE CONCAT('%', ?, '%')
		 * ORDER BY doctor.ID ASC;
		 * 
		 * 
		 * 
		 * SELECT
		 * 		ID,
		 *		name,
		 *		CASE WHEN p_safe = 1 THEN 'Yes' ELSE 'No' END AS p_safe
		 * FROM
		 * 		medication
		 * WHERE
		 *		ID LIKE CONCAT('%', ?, '%') OR
		 * 		name LIKE CONCAT('%', ?, '%') OR
		 * 		p_safe LIKE CONCAT('%', ?, '%');
		 */
		req.app.get('mysql').pool.query("SELECT DISTINCT prescription.ID AS pID, DATE_FORMAT(issue_date, '%m/%d/%Y') AS issue_date, clinic.name AS clinic_name, clinic.ID AS cID, doctor.first_name AS doctor_first_name, doctor.last_name AS doctor_last_name, doctor.ID AS dID, SSN, patient.first_name, patient.last_name, medication.name, medication.ID FROM patient INNER JOIN prescription ON patient.SSN = prescription.PAT_SSN INNER JOIN medication ON prescription.MED_ID = medication.ID INNER JOIN doctor ON prescription.DOC_ID = doctor.ID INNER JOIN clinic ON doctor.C_ID = clinic.ID WHERE SSN LIKE CONCAT('%', ?, '%') OR patient.first_name LIKE CONCAT('%', ?, '%') OR patient.last_name LIKE CONCAT('%', ?, '%') OR birthdate LIKE CONCAT('%', ?, '%') OR doctor.ID LIKE CONCAT('%', ?, '%') OR doctor.first_name LIKE CONCAT('%', ?, '%') OR doctor.last_name LIKE CONCAT('%', ?, '%') OR C_ID LIKE CONCAT('%', ?, '%') OR medication.ID LIKE CONCAT('%', ?, '%') OR medication.name LIKE CONCAT('%', ?, '%') OR p_safe LIKE CONCAT('%', ?, '%') ORDER BY issue_date DESC; SELECT SSN, first_name, last_name, DATE_FORMAT(birthdate, '%m/%d/%Y') AS birthdate FROM patient WHERE SSN LIKE CONCAT('%', ?, '%') OR patient.first_name LIKE CONCAT('%', ?, '%') OR patient.last_name LIKE CONCAT('%', ?, '%') OR birthdate LIKE CONCAT('%', ?, '%'); SELECT doctor.ID, first_name, last_name, clinic.name FROM doctor INNER JOIN clinic ON doctor.C_ID = clinic.ID WHERE doctor.ID LIKE CONCAT('%', ?, '%') OR first_name LIKE CONCAT('%', ?, '%') OR last_name LIKE CONCAT('%', ?, '%') OR C_ID LIKE CONCAT('%', ?, '%') ORDER BY doctor.ID ASC; SELECT ID, name, CASE WHEN p_safe = 1 THEN 'Yes' ELSE 'No' END AS p_safe FROM medication WHERE ID LIKE CONCAT('%', ?, '%') OR name LIKE CONCAT('%', ?, '%') OR p_safe LIKE CONCAT('%', ?, '%');", [req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query, req.body.search_query], function(error, results, fields)
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
			console.log(req.body.search_query);
			res.render('search',
			{
				title: "Results",
				prescription: results[0],
				patient: results[1],
				doctor: results[2],
				medication: results[3]
			});
		});
    });
	
	return router;
}();