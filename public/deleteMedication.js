function deleteMedication(ID)
{
    $.ajax
	({
        url: '/medication/' + ID,
        type: 'DELETE',
        success: function(result)
		{
            window.location.reload(true);
        }
    })
};