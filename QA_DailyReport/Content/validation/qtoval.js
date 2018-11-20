function qtovalidation() {
  
    $('#qtoadd').validate({
        rules: {
            nShift: {
                required: true
            },
            nSize: {
                required: true
            },
            nRebarTest: {
                required: true
            },
            nTempcore: {
                required: true
            },
            nSampler: {
                required: true
            },
            nWaterContent: {
                required: true
            },
            nStaff: {
            required: true
    }
        },
        errorClass: "has-error",
        submitHandler: function () {
            if ($('#htxtsave').val() == 1) {
                insertQTO();
            }

            else {
                updateQTO();
            }
        }
    });
};