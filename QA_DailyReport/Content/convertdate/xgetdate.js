function getdateconvert(x) {
    if (x != null) {
        var date = x.substr(6);
        var currentTime = new Date(parseInt(date));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var date = month + "/" + day + "/" + year;
        return date

    }
    else
    {
        return ''
    }
   
}