function clearfields(){
    $('#txtRebarTest').val('');
    $('#txtTempcore').val('');
    $('#txtSampler').val('');
    $('#txtWaterContent').val('');
    $("#select-ssShift").select2({ placeholder: "Please select.." }).val('').trigger('change');
    $("#select-ssdiameter").select2({ placeholder: "Please select.." }).val('').trigger('change');
    $("#select-qastaff").select2({ placeholder: "Please select.." }).val('').trigger('change');
}