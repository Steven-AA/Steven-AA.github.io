function load_path(code, starttime, endtime) {
    var path = [];
    $.ajax({
        type: "post",
        url: "../php/draw_line.php",
        async: true,
        dataType: "json",
        data: "id=" + code + "&" + "starttime=" + starttime + "&" + "endtime=" + endtime,
        success: function (msg) {
            for (var i = 0; i < msg.length; i++) {
                var strarr = String(msg[i]).split(",");
                path.push([parseFloat(strarr[0]), parseFloat(strarr[1])]);
            }
        }
    });
    return path;
}
