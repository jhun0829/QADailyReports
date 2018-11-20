$(document).ready(function () {});

getQAStaff();

//load QAStaff
function getQAStaff() {
    var url = global + '/QATurnOver/LoadQAStaff';
    var data = {};

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        cache: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (data) {
            LoadQAStaff(data);
        },
        error: function () {
            $.notify("Loading information failed");
        }
    });

}

//Load QAStaff datamappign
function LoadQAStaff(data) {
    var html = "";
    html += "<option></option>"
    $.each(data, function (i, item) {
        html += "<option value='" + item.EmpID + "'> " + item.FullName + " </option>";
    });

    $("#select-qastaff").html(html);
    $("#select-qastaffstat").html(html);
}