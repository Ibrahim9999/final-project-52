function updateMedication(ID)
{
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
};
