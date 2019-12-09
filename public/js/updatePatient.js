function updatePatient(SSN)
{
	var input = document.getElementById('update-patient');
	
    if (input[0].value && input[1].value)
		$.ajax
		({
			url: '/patient/' + SSN,
			type: 'PUT',
			data: $('#update-patient').serialize(),
			success: function(result)
			{
				window.location.replace("./");
			}
		})
	else if (input[1].value)
		alert("Please fill out \"First Name\"");
	else
		alert("Please fill out \"Last Name\"");
};
