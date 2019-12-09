function deletePatient_Doctor(PAT_SSN, DOC_ID)
{
    $.ajax
	({
        url: '/doctor/deletePatient_Doctor/' + PAT_SSN + '/' + DOC_ID,
        type: 'DELETE',
        success: function(result)
		{
            window.location.reload(true);
        }
    })
};