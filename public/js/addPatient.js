function addNewPatient(ID)
{
    $.ajax
	({
        url: '/doctor/add-new-patient/' + ID,
        type: 'POST',
        data: $('#add-new-patient').serialize(),
        success: function(result)
		{
            window.location.replace("./");
        }
    })
};

function addExistingPatient(ID)
{
    $.ajax
	({
        url: '/doctor/add-existing-patient/' + ID,
        type: 'POST',
        data: $('#add-existing-patient').serialize(),
        success: function(result)
		{
            window.location.replace("./");
        }
    })
};
