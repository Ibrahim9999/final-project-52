function updateDoctor(ID)
{
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
};
