function loadmore(url, dataMapping, loadingloadmore) {
    page = page + 1;
    var dataReturn;
    $.ajax({
        url: url + "&page=" + page,
        async: true,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: "POST",
        cache: false,
        data: JSON.stringify({
            page: page
        }),
        beforeSend: function () {
            // loadingButton(true, "span-loading");
            //$(loadingloadmore).show();
            showProcessing(true);
        },
        complete: function () {
            // loadingButton(false, "span-loading");
            //$(loadingloadmore).hide();
            showProcessing(false);
        },
        success: function (data) {
            if (data.length == 0) {

                $.notify("No items to load.", "error");


            } else {
                // alert(url);
                dataMapping(data, true);
            }
        },
        error: function (result, status, err) {
            $.notify("Error : " + err.Message + ".\r\nPlease refresh the page.", "error");
        }
    });


}