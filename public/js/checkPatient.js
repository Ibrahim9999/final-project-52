function checkPatient(patients)
{
	var i;
	var SSN = document.getElementById("SSN-input").value;
	
	for (i = 0; i < patients.length; i++)
		if (SSN == patients[i])
		{
			alert("SSN already exists, please input a valid SSN");
			return false;
		}
	
	return true;
};
