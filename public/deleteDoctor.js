function deleteDoctor(ID)
{
    $.ajax
	({
        url: '/doctor/' + ID,
        type: 'DELETE',
        success: function(result)
		{
            window.location.reload(true);
        }
    })
};