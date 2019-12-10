function deletePatient_Doctor(PAT_SSN, DOC_ID, base)
{
    $.ajax
	({
        url: '/' + base + '/deletePatient_Doctor/' + PAT_SSN + '/' + DOC_ID,
        type: 'DELETE',
        success: function(result)
		{
            window.location.reload(true);
        }
    })
};