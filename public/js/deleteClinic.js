function deleteClinic(ID)
{
    $.ajax
	({
        url: '/clinic/' + ID,
        type: 'DELETE',
        success: function(result)
		{
            window.location.reload(true);
        }
    })
};