function addPrescription(ID)
{
    $.ajax
	({
        url: '/doctor/add-prescription/' + ID,
        type: 'POST',
        data: $('#add-prescription').serialize(),
        success: function(result)
		{
            window.location.replace("./");
        }
    })
};
