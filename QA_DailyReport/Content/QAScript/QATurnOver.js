$(document).ready(function () {
    $('.js-example-basic-single').select2({ placeholder: "Please select.." });
   // $('.js-example-basic-single').select2();
    $('#htxtsave').val(0);
    qtovalidation();
});

var qtoPage = 1;

$(document).on('click', '#btnAddNew', function () {
    $('#htxtsave').val(1);
    clearfields();
});
$(document).on('click', "#qto-list-loadmore", function () {
   // var search = $("#fld-search-task").val();
    qtoPage = qtoPage + 1;
    //getData("MRP", "BilletArrival", "loadContracts2", "#loading", "#loading2", "contractMapping", 1, "search", "page", page, "#fld-search-contract", "Contracts");
    // getData("samc", "Dashboard", "loadtask", "#loading", "#loading2", "taskMapping", 1, "search", "page", taskpage, "#fld-search-task", "Task");
   // getQATO();
    searchQATO();
});
    //insert date in qaturnover
    //$(document).on('click', '#btnadd', function () {
    //    console.log('Run');
    //    //var url = '/QATurnOver/InsertQATurnOver';
    //    //var data = {
    //    //    shift: $('#select-ssShift').val(),
    //    //    size: $('#select-ssdiameter').val(),
    //    //    rebartest: $('#txtRebarTest').val(),
    //    //    tempcore: $('#txtTempcore').val(),
    //    //    sampler: $('#txtSampler').val(),
    //    //    watercontent: $('#txtWaterContent').val(),
    //    //}
    //    //$.ajax({
    //    //    url: url,
    //    //    type: 'POST',
    //    //    cache: false,
    //    //    data: data,
    //    //    beforeSend: function () {

    //    //    },
    //    //    complete: function () {

    //    //    },
    //    //    success: function () {
    //    //        alert(data);
    //    //        getQATO();
    //    //    }

    //    //});

       
    //});


    //Insert new QTO report
    function insertQTO() {
        console.log('insert');
        var url = global + '/QATurnOver/InsertQATurnOver';
        var data = {
            shift: $('#select-ssShift').val(),
            size: $('#select-ssdiameter').val(),
            rebartest: $('#txtRebarTest').val(),
            tempcore: $('#txtTempcore').val(),
            sampler: $('#txtSampler').val(),
            watercontent: $('#txtWaterContent').val(),
            preparedby: $('#select-qastaff').val(),

        }
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            data: data,
            beforeSend: function () {

            },
            complete: function () {

            },
            success: function () {
                $.notify("Information successfully saved!", "success");
                getQATO();
                clearfields();
                $('#htxtsave').val(0);
                qtoPage = 1;
                $('#AddQTOModal').modal('hide');
            }

        });
    }

    //Update new QTO report
    function updateQTO() {
        var url = global + '/QATurnOver/RunUpdate';
        var data = {

            reportid: $('#htxtReportID').val(),
            shift: $('#select-ssShift').val(),
            size: $('#select-ssdiameter').val(),
            rebartest: $('#txtRebarTest').val(),
            tempcore: $('#txtTempcore').val(),
            sampler: $('#txtSampler').val(),
            watercontent: $('#txtWaterContent').val(),
            preparedby: $('#select-qastaff').val(),
        }
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            data: data,
            beforeSend: function () { },
            complete: function () { },
            success: function () {
                $.notify("Information successfully updated!", "success");
                getQATO();
                clearfields();
                $('#AddQTOModal').modal('hide');
                qtoPage = 1;
            },
            error: function () {
                alert("Update failed check the details");
            }
        });
    }

    getQATO();

    //load all QTO Data
    function getQATO() {
        var url = global + '/QATurnOver/GetQTO/';
        var data = {Page:qtoPage};
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: 'POST',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {

            },
            complete: function () {

            },
            success: function (data) {
                if (data.length == 0) {
                    $.notify("No data to load.", "warn");
                    // xpage = xpage;
                }
                else {
                    // window[xdetails](data, xpage);
                    //xdetails(data, xpage);

                }
               // window[qtodatamapping](data, qtoPage);
                qtodatamapping(data, qtoPage);
            },
            error: function () {
                alert("Loading information failed");
            }
        });
    }

    //map data into table
    function qtodatamapping(data, xpage) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<tr>";
           
            html += "<td>" + getdateconvert(item.ReportDate) + "</td>";
            html += "<td>" + item.Shift + "</td>";
            html += "<td>" + item.Size + "</td>";
            html += "<td>" + item.PreparedBy + "</td>";
            html += "<td><button class='btn btn-success edit' id='edit-" + item.ReportID + "' data-toggle='modal' data-target='#AddQTOModal'  ReportID='" + item.ReportID + "'>Edit</button></td>";
            html += "<td><button class='btn btn-danger delete' id='delete-" + item.ReportID + "' ReportID='" + item.ReportID + "'>Delete</button></td>";
            html += "</tr>";

        });

        // $("#tblqto").html(html);
        if (xpage == 1) {
            $("#tblqto").html(html);
        }
        else {
            $("#tblqto").append(html);
        }
       // $('#tbllu').addCounter();
    }

    //run filter
    $(document).on('keydown', '#txtsearch', function (e) {
        
        var key = e.which;
        var search = $("#txtsearch").val();
        qtoPage = 1;
        switch (key) {
            case 13: // enter
                if ($.trim(search).length > 0) {
                    //getData("samc", "Dashboard", "loadtasksearch", "#loading", "#loading2", "taskMapping", 1, "search", "page", taskpage, "#fld-search-task", "Task");
                    //alert($(this).val());
                    searchQATO();
                }
                else {
                    //alert('No text entered');
                    //getData("samc", "Dashboard", "loadtask", "#loading", "#loading2", "taskMapping", 0, "search", "page", 1, "#fld-search-task", "Task");
                    getQATO();
                }

                break;
            default:
                break;
        }
    });
    //filter QATO
    function searchQATO() {
      
        var search = $("#txtsearch").val();
        //var url = '/QATurnOver/SearchQTO?search=' + search + '&page=' + qtoPage;
        var url = global + '/QATurnOver/SearchQTO';
        var data = {search: search,Page:qtoPage};
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: 'POST',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {

            },
            complete: function () {

            },
            success: function (data) {
                if (data.length == 0) {
                    $.notify("No data to load.", "warn");
                    // xpage = xpage;
                }
                else {
                    // window[xdetails](data, xpage);
                    //xdetails(data, xpage);

                }
                // window[qtodatamapping](data, qtoPage);
                qtodatamapping(data, qtoPage);
            },
            error: function () {
                alert("Loading information failed");
            }
        });
    }

    //call data to be edit
    $(document).on('click', '.edit', function () {
        
        var ReportID = $(this).attr("ReportID");
        var url = global + '/QATurnOver/EditQTO';
        console.log(ReportID);
        var data = { ReportID: ReportID };

        $.ajax({
            url: url,
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            data: JSON.stringify(data),
            beforeSend: function () {  },
            complete: function () { },
            success: function (data) {
               // $('#username').prop('disabled', true);
                //$('#code').prop('disabled', true);
                $.each(data, function (i, item) {
                    $('#select-ssShift').select2().val(item.Shift).trigger('change');
                    $('#select-ssdiameter').select2().val(item.Size).trigger('change');
                    $('#htxtReportID').val(item.ReportID);
                    $('#txtRebarTest').val(item.RebarTest);
                    $('#txtTempcore').val(item.Tempcore);
                    $('#txtSampler').val(item.Sampler);
                    $('#txtWaterContent').val(item.WaterContent);
                    $('#select-qastaff').select2().val(item.PreparedBy).trigger('change');
                    //console.log(data);
                    //alert(item.ContractID)
                });
            },
            error: function (result, status, err) {
               
            }
        });
    });

    // run edit data
    $(document).on('click', '#btnupdate', function () {
        //var url = '/QATurnOver/RunUpdate';
        //var data = {

        //    reportid:     $('#htxtReportID').val(),
        //    shift:        $('#select-ssShift').val(),
        //    size:         $('#select-ssdiameter').val(),
        //    rebartest:    $('#txtRebarTest').val(),
        //    tempcore:     $('#txtTempcore').val(),
        //    sampler:      $('#txtSampler').val(),
        //    watercontent: $('#txtWaterContent').val(),
        //}
        //$.ajax({
        //    url: url,
        //    type: 'POST',
        //    cache: false,
        //    data : data,
        //    beforeSend: function () { },
        //    complete: function () { },
        //    success: function () {
        //        getQATO();
        //    },
        //    error: function () {
        //        alert("Update failed check the details");
        //}
        //});
    });

    //delete qa report
    $(document).on('click', '.delete', function () {
        var reportID = $(this).attr("ReportID");

        var url = global + '/QATurnOver/RunDelete';
        var data = { ReportID: reportID };

        $.ajax({
            url: url,
            data: data,
            type: 'POST',
            cache: false,
            beforeSend: function () { },
            complete: function () { },
            success: function () {
                getQATO();
            },
            error: function () {
                alert();
            }
        });
    });
