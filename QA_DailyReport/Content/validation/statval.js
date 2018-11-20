function statvalidation() {
    $('#xstat').validate({
        rules: {
            nStaffStat: {
                required: true
            },
            nSizeStat: {
                required: true
            },
            nShiftStat: {
                required: true
            }
        },
        errorClass: "has-error",
        submitHandler: function () {
            var x = $("#select-ssdiameterstat").val();
            var staff = $("#select-qastaffstat").val();
            var shift = $("#select-ssShiftstat").val();
            SaveStatRpt(x, staff, shift);
        }

    });
};