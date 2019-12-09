function updateClinic(ID)
{
    var input = document.getElementById('update-clinic');
	
    if (input[0].value && input[1].value && input[2].value && input[4].value)
		$.ajax
		({
			url: '/clinic/' + ID,
			type: 'PUT',
			data: $('#update-clinic').serialize(),
			success: function(result)
			{
				window.location.replace("./");
			}
		})
	else if (!input[0].value)
		alert("Please fill out \"Name\"");
	else if (!input[1].value)
		alert("Please fill out \"Address\"");
	else if (!input[2].value)
		alert("Please fill out \"City\"");
	else
		alert("Please fill out \"Zipcode\"");
};
