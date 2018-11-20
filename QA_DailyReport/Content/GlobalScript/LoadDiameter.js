$(document).ready(function () { });

getDiameter();

//load Grades
function getDiameter() {
    var url = global + '/QATurnOver/LoadDiameter';
    var data = {};
    $.ajax({
        url: url,
        data: data,
        type: 'POST',
        cache: false,
        beforeSend: function () {

        },
        complete: function () {

        },
        success: function (data) {
            LoadDiameter(data);

        },
        error: function () {
            alert("Loading information failed");
        }
    });
}

//LoadGrades data mapping
function LoadDiameter(data) {
    var html = "";
    $.each(data, function (i, item) {
        html += "<option value='" + item.Diameter + "'> " + item.Diameter + " </option>";
    });

    $("#select-ssdiameter").html(html);
    $("#select-ssdiameterstat").html(html);
}