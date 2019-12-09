function updateDoctor(ID)
{
	var input = document.getElementById('update-doctor');
	
    if (input[0].value && input[1].value)
		$.ajax
		({
			url: '/doctor/' + ID,
			type: 'PUT',
			data: $('#update-doctor').serialize(),
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
