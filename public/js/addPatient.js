function addPatient(ID)
{
    $.ajax
	({
        url: '/doctor/add-patient/' + ID,
        type: 'POST',
        data: $('#add-patient').serialize(),
        success: function(result)
		{
            window.location.replace("./");
        }
    })
};
