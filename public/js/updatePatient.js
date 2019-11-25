function updatePatient(SSN)
{
    $.ajax
	({
        url: '/patient/' + SSN,
        type: 'PUT',
        data: $('#update-patient').serialize(),
        success: function(result)
		{
            window.location.replace("./");
        }
    })
};
