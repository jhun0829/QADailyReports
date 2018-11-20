$(document).ready(function () {
  
});

var dailyrptPage = 1;
var dailyrptHdr = 1;
var dailyrptSummary = 1;

//load more daily report
$(document).on('click', "#rpt-list-loadmore", function () {

    // var search = $("#fld-search-task").val();
    dailyrptPage = dailyrptPage + 1;
    //getData("MRP", "BilletArrival", "loadContracts2", "#loading", "#loading2", "contractMapping", 1, "search", "page", page, "#fld-search-contract", "Contracts");
    // getData("samc", "Dashboard", "loadtask", "#loading", "#loading2", "taskMapping", 1, "search", "page", taskpage, "#fld-search-task", "Task");
    // getQATO();
    searchDailyRpt();
});

//load more daily report summary
$(document).on('click', '#summary-list-loadmore', function () {
    dailyrptSummary = dailyrptSummary + 1

    var search = $('#txtFilterDailyRptSummary').val();
    var sdate =  $('#htxtReportDate').val();
    getDailyRprtSummary(dailyrptSummary, sdate, search)
});

//laod more daily report summary header
$(document).on('click','#btnLoadMoreDailyRPT',function(){
    dailyrptSummary = dailyrptSummary + 1
    getDailyRpt();
});

//getQARpt();
getDailyRpt();

//Load Daily Report from physical mapping
function qadailyrpt(data, xpage) {
    var html = "";
    $.each(data, function (i, item) {
        html += "<tr>";
        html += "<td>" + item.FileNos + "</td>";
        html += "<td>" + getdateconvert(item.Test_Date) + "</td>";
        html += "<td>" + item.Diameter + "</td>";
        html += "<td>" + item.BatchNo + "</td>";
        html += "<td>" + item.Grade + "</td>";
        html += "<td>" + item.Yield_Strength + "</td>";
        html += "<td>" + item.Tensile_Strength + "</td>";
        html += "<td>" + item.TSYS + "</td>";
        html += "<td>" + item.Elongation + "</td>";
        html += "<td>" + item.Spacing + "</td>";
        html += "<td>" + item.Height + "</td>";
        html += "<td>" + item.Gap + "</td>";
        html += "<td>" + item.Mass_Variation + "</td>";
        html += "<td>" + item.Bend_Test + "</td>";
        html += "<td>" + item.Remarks + "</td>";
        html += "</tr>";
        
    });

    // $("#tblqto").html(html);
    if (xpage == 1) {
        $("#tblqarpt").html(html);
    }
    else {
        $("#tblqarpt").append(html);
    }
    // $('#tbllu').addCounter();
}

function qadailyrptsummarymapping(data, xpage) {
    var html = "";
    $.each(data, function (i, item) {
        html += "<tr>";
        html += "<td>" + item.FileNos + "</td>";
        html += "<td>" + getdateconvert(item.Test_Date) + "</td>";
        html += "<td>" + item.Diameter + "</td>";
        html += "<td>" + item.BatchNo + "</td>";
        html += "<td>" + item.Grade + "</td>";
        html += "<td>" + item.Yield_Strength + "</td>";
        html += "<td>" + item.Tensile_Strength + "</td>";
        html += "<td>" + item.TSYS + "</td>";
        html += "<td>" + item.Elongation + "</td>";
        html += "<td>" + item.Spacing + "</td>";
        html += "<td>" + item.Height + "</td>";
        html += "<td>" + item.Gap + "</td>";
        html += "<td>" + item.Mass_Variation + "</td>";
        html += "<td>" + item.Bend_Test + "</td>";
        html += "<td>" + item.Remarks + "</td>";
        html += "</tr>";

    });

    // $("#tblqto").html(html);
    if (xpage == 1) {
        $("#tblqarptsummary").html(html);
    }
    else {
        $("#tblqarptsummary").append(html);
    }
    // $('#tbllu').addCounter();
}

//Load Daily Report from Daily Report mapping
function loadDailyQARpt(data, xpage) {
    var html = "";
    $.each(data, function (i, item) {
        html += "<tr>";
        html += "<td>" + item.DateProduced + "</td>";
        html += "<td><button class='btn btn-success report' id='report-" + item.DateProduced + "' data-toggle='modal' data-target='#ViewDailyRpt' ReportDate='" + item.DateProduced + "'>View Details</button></td>";
        html += "</tr>";

    });

    // $("#tblqto").html(html);
    if (xpage == 1) {
        $("#tbldaily").html(html);
    }
    else {
        $("#tbldaily").append(html);
    }
}

//Load Daily Report from physical
function getQARpt() {
    var url = global + '/QATurnOver/GetPhysicalData/';
    var data = { Page: dailyrptPage };
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
            qadailyrpt(data, dailyrptPage);
        },
        error: function () {
            alert("Loading information failed");
        }
    });
}

//Load Daily Report from Daily Report
function getDailyRpt() {
    var url = global + '/QATurnOver/LoadDailyReport/';
    var search = $('#txtsearchqarpt').val();
    var data = { Page: dailyrptHdr , search : search };
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
            loadDailyQARpt(data, dailyrptPage);
        },
        error: function () {
            alert("Loading information failed");
        }
    });
}

function getDailyRprtSummary(xpage,sdate,search)
{
    var DateStamp = sdate;
    var url = global + '/QATurnOver/LoadDailyReportSummary'
    data = { Page: dailyrptSummary, DateStamp: sdate, search: search }

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        cache: false,
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () { },
        success: function (data) {
            if (data.length == 0) {
                $.notify("No data to load.", "warn");
            }
            else {

            }
            qadailyrptsummarymapping(data, dailyrptSummary)
        },
        error: function(){
            $.notify("Error Loading Data.", "warn");
        }

    });
}

//run when enter
$(document).on('keydown', '#txtFilterDailyRpt', function (e) {

    var key = e.which;
    var search = $("#txtFilterDailyRpt").val();
    dailyrptPage = 1;
    switch (key) {
        case 13: // enter
            if ($.trim(search).length > 0) {
               
                //getData("samc", "Dashboard", "loadtasksearch", "#loading", "#loading2", "taskMapping", 1, "search", "page", taskpage, "#fld-search-task", "Task");
                //alert($(this).val());
                searchDailyRpt();
            }
            else {
                //alert('No text entered');
                //getData("samc", "Dashboard", "loadtask", "#loading", "#loading2", "taskMapping", 0, "search", "page", 1, "#fld-search-task", "Task");
                getQARpt();
            }

            break;
        default:
            break;
    }
});

//filter qa report summary
$(document).on('keydown', '#txtFilterDailyRptSummary', function (e) {

    var key = e.which;
    var search = $("#txtFilterDailyRptSummary").val();
    var sdate = $('#htxtReportDate').val();
    dailyrptSummary = 1;
    switch (key) {
        case 13: // enter
            if ($.trim(search).length > 0) {

                //getData("samc", "Dashboard", "loadtasksearch", "#loading", "#loading2", "taskMapping", 1, "search", "page", taskpage, "#fld-search-task", "Task");
                //alert($(this).val());                
                getDailyRprtSummary(dailyrptSummary, sdate, search)
            }
            else {
                //alert('No text entered');
                //getData("samc", "Dashboard", "loadtask", "#loading", "#loading2", "taskMapping", 0, "search", "page", 1, "#fld-search-task", "Task");
                getDailyRprtSummary(dailyrptSummary, sdate, search)
            }

            break;
        default:
            break;
    }
});

$(document).on('keydown', '#txtsearchqarpt', function (e) {

    var key = e.which;
    var search = $("#txtsearchqarpt").val();
    dailyrptSummary = 1;
    switch (key) {
        case 13: // enter
            if ($.trim(search).length > 0) {

                //getData("samc", "Dashboard", "loadtasksearch", "#loading", "#loading2", "taskMapping", 1, "search", "page", taskpage, "#fld-search-task", "Task");
                //alert($(this).val());                
                getDailyRpt();
            }
            else {
                //alert('No text entered');
                //getData("samc", "Dashboard", "loadtask", "#loading", "#loading2", "taskMapping", 0, "search", "page", 1, "#fld-search-task", "Task");
                getDailyRpt();
            }

            break;
        default:
            break;
    }
});


//filter Daily Report
function searchDailyRpt() {
    var search = $("#txtFilterDailyRpt").val();
    //var url = '/QATurnOver/SearchQTO?search=' + search + '&page=' + qtoPage;
    var url = global + '/QATurnOver/SearchDailyQA';
    var data = { search: search, Page: dailyrptPage };
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
            qadailyrpt(data, dailyrptPage);
        },
        error: function () {
            alert("Loading information failed");
        }
    });
}

//$(function () {
//    $(".tblSummary").table2excel({
//        exclude: ".noExl",
//        name: "Excel Document Name",
//        filename: "myFileName",
//        fileext: ".xls",
//        exclude_img: true,
//        exclude_links: true,
//        exclude_inputs: true
//    });
//});

//retreive query before modal shows
$(document).on('click', '#btnViewDailyRPT', function () {
    getQARpt();
    //var search = $("#txtFilterDailyRpt").val();
    ////var url = '/QATurnOver/SearchQTO?search=' + search + '&page=' + qtoPage;
    //var url = '/QATurnOver/SearchDailyQA';
    //var data = { search: search, Page: dailyrptPage };
    //$.ajax({
    //    url: url,
    //    data: JSON.stringify(data),
    //    type: 'POST',
    //    cache: false,
    //    contentType: 'application/json; charset=utf-8',
    //    beforeSend: function () {

    //    },
    //    complete: function () {

    //    },
    //    success: function (data) {
    //        if (data.length == 0) {
    //            $.notify("No data to load.", "warn");
    //            // xpage = xpage;
    //        }
    //        else {
    //            // window[xdetails](data, xpage);
    //            //xdetails(data, xpage);

    //        }
    //        qadailyrpt(data, dailyrptPage);
    //    },
    //    error: function () {
    //        alert("Loading information failed");
    //    }
    //});
});

$(document).on('click', '#btnSaveRpt', function () {
    var url = global + '/QATurnOver/InsertDailyQA/';
    var data = { Page: dailyrptHdr };
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
            // window[qtodatamapping](data, qtoPage);            
            getDailyRpt();
            $('#DailyRpt').modal('hide');
            dailyrptHdr = 1;
        },
        error: function () {
            alert("Loading information failed");
        }
    });
});

//cliclk to load report summary
$(document).on('click', '.report', function () {

    var sdate = $(this).attr("ReportDate");
    $('#htxtReportDate').val(sdate);
    var search = '';
    getDailyRprtSummary(dailyrptSummary, sdate, search)

});

$(document).on('click', '#btnPrintRpt', function () {
    $(".tblSummary").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: "QA Daily Report",
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });
})
