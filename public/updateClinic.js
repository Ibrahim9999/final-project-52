function updateClinic(ID)
{
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
};
