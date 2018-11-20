$(document).ready(function () {
    statvalidation();
});

var statPage = 1;
var detPage = 1;
var statsummary = 1;
var statdetpage = 1;
var statfilterdetpage = 1;
LoadStatDailyRpt();

$(document).on('click', "#bntLoadMoreStatistics", function () {
    statPage = 1;
    statfilterdetpage = statfilterdetpage + 1;
    LoadStatDailyRpt();
});

$(document).on('click', "#stat-listdetail-loadmore", function () {
    statdetpage = statdetpage + 1;
    
    var search = $("#txtFilterStatdetails").val();
    var dateproduced = $('#htxtdateproduced').val();
    var diameter = $('#htxtdiameter').val();
    var page = statdetpage;
    LoadStatisticalDetails(page,dateproduced, diameter, search)
});

//filter qa report summary
$(document).on('keydown', '#txtsearchstat', function (e) {

    var key = e.which;
    var search = $("#txtsearchstat").val();
    statsummary = 1;
    switch (key) {
        case 13: // enter
            if ($.trim(search).length > 0) {
                       LoadStatDailyRpt();
            }
            else {
                      LoadStatDailyRpt();
            }

            break;
        default:
            break;
    }
});


//filter stat details
$(document).on('keydown', '#txtFilterStatdetails', function (e) {

    var key = e.which;
    var search = $("#txtFilterStatdetails").val();
    var dateproduced = $('#htxtdateproduced').val();
    var diameter = $('#htxtdiameter').val();
    statdetpage = 1;
    var page = statdetpage;
    switch (key) {
        case 13: // enter
            if ($.trim(search).length > 0) {
                
                LoadStatisticalDetails(page,dateproduced, diameter, search)
            }
            else {
                LoadStatisticalDetails(page,dateproduced, diameter, search)
            }

            break;
        default:
            break;
    }
});

//load pyhsical ys and ts
function GetPhyStat(x) {

    var diameter = x;
    var url = global + '/QATurnOver/GetPhysicalStatistic';
    var data = { diameter: diameter, Page: statPage };

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        cache: false,
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () { },
        success: function (data) {
            if ($.data.lenght == 0) {
                $.notify("No Data to Load", "warn");
            }
            else {

            }
            statisticrpt(data, statPage);
        },
        error: function () {
            $.notify("Loading information failed");
        }
    });
}
//load physical ts ys mapping
function statisticrpt(data,xpage) {
    var html = "";
    $.each(data,function(i,item){
        html += "<tr>";
        html += "<td>" + item.FileNos + "</td>";
        html += "<td>" + getdateconvert(item.Test_Date) + "</td>";
        html += "<td>" + item.Diameter + "</td>";
        html += "<td>" + item.Yield_Strength + "</td>";
        html += "<td>" + item.Tensile_Strength + "</td>";
        html += "<tr>";
    })

    if (xpage == 1) {
        $("#tblphystat").html(html);
    }
    else {
        $("#tblphystat").append(html);
    }
}
//Insert Statistical Report
function SaveStatRpt(x, staff,shift) {
    var diameter = x;
    var qastatff = staff
    var shift = shift
    var url = global + "/QATurnOver/InsertStatReport";
    data = { diameter: diameter, qastatff: qastatff, shift: shift, Page: statPage };

    $.ajax({
        url:url,
        data: JSON.stringify(data),
        type: 'POST',
        cache: false,
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () { },
        success: function (data) {
            GetPhyStat(x);
            $('#StatRpt').modal('hide');
            statPage = 1;
            $.notify("Information saved successfully","success");
        },
        error: function () {
            $.notify("Saving information failed");
        }
    });

}

//load statdaily report
function LoadStatDailyRpt() {
    var search = $('#txtsearchstat').val();
    var url = global + "/QATurnOver/LoadStatisticalRpt"
    var data = { Page: statPage, search : search }
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
                // xpage = xpage;
            }
            else {
                // window[xdetails](data, xpage);
                //xdetails(data, xpage);
            }
            statdailymapping(data, statPage)
        },
        error: function () {
            $.notify("Error Loading Data.", "warn");
        }
    });
    
}

// load statdaily report mapping
function statdailymapping(data, xpage) {
    var html = "";
    $.each(data, function (i,item) {
        html += "<tr>";
        html += "<td>" + item.DateProduced + "</td>";
        html += "<td>" + item.Shift + "</td>";
        html += "<td>" + item.Diameter + "</td>";
        html += "<td>" + item.QAStaff + "</td>";
        html += "<td><button class='btn btn-success view' id='view-" + item.DateProduced + "' data-toggle='modal' data-target='#StatDetails' DateProduced='" + item.DateProduced + "' Diameter='" + item.Diameter + "'>View</button></td>";
        html += "</tr>";
    });

    if (xpage == 1) {
        $("#tblstat").html(html);
    }
    else {
        $("#tblstat").append(html);
    }
}


//// trigger insert stat
//$(document).on('click', '#btnSaveStat', function () {
//    var x = $("#select-ssdiameterstat").val();
//    var staff = $("#select-qastaffstat").val();
//    var shift = $("#select-ssShiftstat").val();
//    SaveStatRpt(x, staff, shift);
   
//});

//load dateproduce per diameter
$(document).on('click', '.view', function () {

    var dateproduced = $(this).attr("DateProduced");
    var diameter = $(this).attr("Diameter");
    $('#htxtdateproduced').val(dateproduced);
    $('#htxtdiameter').val(diameter);
    statdetpage = 1;
    var page = detPage;

    LoadStatisticalDetails(page,dateproduced, diameter)

    //working
    //var dateProduce = $(this).attr("DateProduced");
    //var diameter = $(this).attr("Diameter");
    //var seacrh = $("#txtFilterStat").val();
    ////alert(dateProduce + ' - ' + diameter);
    //var url = global + "/QATurnOver/LoadStatisticalDetails";
    //var data = { Page: detPage, dateProduce: dateProduce, diameter: diameter, search: search }
    
    //$.ajax({
    //    url: url,
    //    data: JSON.stringify(data),
    //    type : 'POST',
    //    cache: false,
    //    contentType: 'application/json; charset=utf-8',
    //    beforeSend: function () { },
    //    success: function (data) {
    //        statdetailmapping(data, statPage)
    //        LoadGraph(dateProduce)
    //    },
    //    error: function () {
    //        $.notify("Error Loading Data", "warn");
    //    }
    //})
});

function LoadStatisticalDetails(page,dateproduced,diameter,search)
{
    var page = page;
    var dateproduced = dateproduced;
    var diameter = diameter
    var seacrh = search
    //alert(dateProduce + ' - ' + diameter);
    var url = global + "/QATurnOver/LoadStatisticalDetails";
    var data = { Page: page, dateProduce: dateproduced, diameter: diameter, search: search }

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
                // xpage = xpage;
            }
            else {
                // window[xdetails](data, xpage);
                //xdetails(data, xpage);
            }

            statdetailmapping(data, page)
            LoadGraph(dateproduced)
        },
        error: function () {
            $.notify("Error Loading Data", "warn");
        }
    })
}

function LoadGraph(sdate) {
    var url = global + "/QATurnOver/LoadGraphs";
    var data = { Page: statPage, sdate: sdate }

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        cache: " false",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () { },
        success: function (data) {
         
            //var chart = new CanvasJS.Chart("tslines", {
            //    animationEnabled: true,
            //    //exportEnabled: true,
            //    title: {
            //        text: "Tensile Strength"
            //    },
            //    axisY: {
            //        includeZero: false
            //    },
            //    data: [
            //    {
            //        // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
            //        type: "splineArea",
            //        markerSize: 1,
            //        dataPoints: datapoints,
            //        responsive: true,
            //        maintainAspectRatio : true
            //    }
            //    ]
            //});

            //chart.render();

            //var datapointsYs = [];
            //for (var i = 0; i <= data.length - 1; i++) {
            //    datapointsYs.push({ label: data[i].FileNo, y: parseInt(data[i].Yield_Strength) });
            //}
            //var chart = new CanvasJS.Chart("yslines", {
            //    theme: "theme3",//theme1
            //    title: {
            //        text: "Yield Strength"
            //    },
            //    data: [
            //    {
            //        // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
            //        type: "splineArea",
            //        dataPoints: datapointsYs,
            //        responsive: true,
            //        maintainAspectRatio: true
            //    }
            //    ]
            //});



            var datapoints = [];
            for (var i = 0; i <= data.length - 1; i++) {
                datapoints.push({ label: data[i].FileNos, y: parseInt(data[i].Tensile_Strength) });
            }

            var chart = new CanvasJS.Chart("tslines", {
                animationEnabled: true,
                theme: "light2",
                title: {
                       text: "Tensile Strength"
                },
                axisX: {
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    },
                    gridThickness: 0,
                    tickLength: 0,
                    lineThickness: 0,
                    margin: 0,
                    labelFormatter: function () {
                        return " ";
                    }

                },
                axisY: {
                     includeZero: false
                },
                data: [{
                    type: "line",
                    dataPoints: datapoints
                }]
            })

            chart.render();

            var datapointsys = [];
            for (var i = 0; i <= data.length - 1; i++) {
                datapointsys.push({ label: data[i].FileNos, y: parseInt(data[i].Yield_Strength) });
            }

            var chartys = new CanvasJS.Chart("yslines", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Yield Strength"
                },
                axisX: {
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true,
                    },
                    gridThickness: 0,
                    tickLength: 0,
                    lineThickness: 0,
                    margin : 0,
                    labelFormatter: function () {
                        return " ";
                    }
                },
                axisY: {
                    includeZero: false
                },
                data: [{
                    type: "line",
                    dataPoints: datapointsys
                }]
            })

            chartys.render();

        },
        error: function () {
            $.notify("Error Loading Data", "warn");
        }
    });
}

//load dateproduce per diameter mapping
function statdetailmapping(data,xpage) {
    var html = "";

    $.each(data, function (i,item) {
        html += "<tr>"
        html += "<td>" + item.FileNos + "</td>"
        html += "<td>" + item.DateProduced + "</td>"
        html += "<td>" + item.Diameter + "</td>"
        html += "<td>" + item.Tensile_Strength + "</td>"
        html += "<td>" + item.Yield_Strength + "</td>"
        html += "</tr>"

    });
    
    if (xpage == 1) {
        $("#tblstatdetails").html(html);
    }
    else {
        $("#tblstatdetails").append(html);
    }
}
