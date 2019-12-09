function updateMedication(ID)
{
	if (document.getElementById('update-medication')[0].value)
		$.ajax
		({
			url: '/medication/' + ID,
			type: 'PUT',
			data: $('#update-medication').serialize(),
			success: function(result)
			{
				window.location.replace("./");
			}
		})
	else
		alert("Please fill out \"Name\"");
};
