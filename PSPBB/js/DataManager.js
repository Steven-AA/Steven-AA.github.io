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
        },
        error: function (data) {
            alert("数据库访问失败，可查看演示视频了解详细效果。");
        }
    });
    return path;
}
//javascript