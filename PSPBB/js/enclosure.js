var polygons = [];
var arr = [];//构建多边形经纬度坐标数组
var markers = [];
var enclosure = false;


function draw_polygon() {
    ClearMap();
    var polygon;
    var el = document.getElementById('drploy');
    if (enclosure == false) {
        enclosure = true;
        el.value = '结束绘制';
    }
    else {
        polygon = new AMap.Polygon({
            map: map,
            path: arr,
            strokeColor: "#0000ff",
            strokeOpacity: 1,
            strokeWeight: 3,
            fillColor: "#f5deb3",
            fillOpacity: 0.35,
        });
        polygon.editor = new AMap.PolyEditor(map, polygon);
        polygon.on('rightclick', function (e) {
            var contextMenu = new AMap.ContextMenu();  //创建右键菜单
            contextMenu.addItem("编辑", function () {
                e.target.editor.open();
            }, 0);
            contextMenu.addItem("结束编辑", function () {
                var temp = confirm("确定是这个围栏？")
                e.target.editor.close();
                alert("地理围栏创建成功")
            }, 1);
            contextMenu.addItem("删除", function () {
                e.target.editor.close();
                map.remove(e.target);
            }, 2);
            contextMenu.open(map, e.lnglat);
        });
        map.setFitView();
        polygons.push(polygon);
        if (temp) {
            // new_fencing(arr)
        } else {
            ClearMap()
        }
        el.value = '开始绘制';
        enclosure = false;
        map.remove(markers);
        arr = [];//绘制完成后清除坐标点
        markers = [];
    }
}

//申请围栏
function new_fencing(arr) {
    var points
    for (i = 0; i < arr.length; i++) {
        if (i == 0) {
            points = points + arr[i].lng + ',' + arr[i].lat
        } else {
            points = points + ';' + arr[i].lng + ',' + arr[i].lat
        }
    }
    $.ajax({
        type: "POST",
        url: "http://restapi.amap.com/v4/geofence/meta?key=f19bf2045e819a5945f9cde45db1aca3",
        async: true,
        dataType: "json",
        data: {
            "name": "定位服务平台",
            "points": points,
            "enable": "true",
            "repeat": "Mon,Tues,Wed,Thur,Fri,Sat,Sun",
            "time": "00:00,23:59",
            "alert_condition": "enter;leave"
        },
        success: function (msg) {
            msg = eval(msg)
            console.log(msg)
        },
        error: function (data) {
            alert("数据库访问失败，可查看演示视频了解详细效果。");
        }
    });
}


function check_polygon() {
    ClearMap()
    var dots = ["118.785428,31.986246", "118.782896,31.986919", "118.784419,31.989831"]
    show_enclosure();
    for (i = 0; i < dots.length; i++) {
        Isin_fencing(dots[i])
        sleep(500)
    }
}

//判断点在不在围栏里
function Isin_fencing(location) {
    var timestamp = Date.parse(new Date());//当前时间戳
    $.ajax({
        type: "get",
        url: "http://restapi.amap.com/v4/geofence/status?key=f19bf2045e819a5945f9cde45db1aca3&locations=" + location + "," + timestamp / 1000 + "&diu=35856807286040",
        async: true,
        dataType: "json",
        success: function (msg) {
            msg = eval(msg)
            if (msg.errmsg == 'OK') {
                if (msg.data.fencing_event_list.length == 0) {
                    // console.log("out")
                    status = "out"
                } else if (msg.data.fencing_event_list[0].client_status == 'in') {
                    // console.log("in" + msg.data.fencing_event_list[0].enter_time)
                    status = "in"
                }
                new_marker(status, location)
            } else {
                alert("系统错误")
            }
        },
        error: function (data) {
            alert("数据库访问失败，可查看演示视频了解详细效果。");
        }
    });
}

//创建新图标
function new_marker(status, location) {
    // var map = new AMap.Map('container', {
    //     zoom: 11
    // });
    var loc = location.split(",");
    var position = new AMap.LngLat(parseFloat(loc[0]), parseFloat(loc[1]));
    AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
        if (status == "in") {
            new SimpleMarker({
                iconLabel: {
                    innerHTML: 'in',
                    style: {
                        color: '#fff',
                        fontSize: '120%',
                        marginTop: '2px'
                    }
                },
                iconStyle: 'blue',
                map: map,
                position: position
            });
        } else {
            new SimpleMarker({
                iconLabel: {
                    innerHTML: 'out',
                    style: {
                        color: '#fff',
                        fontSize: '120%',
                        marginTop: '2px'
                    }
                },
                iconStyle: 'red',
                map: map,
                position: position
            });
        }
    });
    AMap.plugin(['AMap.ToolBar'], function () {
        map.addControl(new AMap.ToolBar({
            map: map
        }));
    });
}

//挂起
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function show_enclosure() {
    //围栏数据
    var str = "118.782529, 31.982936; 118.787582, 31.985011; 118.788956, 31.986658; 118.788054, 31.98795; 118.787175, 31.988869; 118.78431, 31.988741; 118.781306, 31.988641;118.781381, 31.98704";
    var array = str.split(";");
    var array3 = [];
    for (var i = 0; i < array.length; i++) {
        var array2 = array[i].split(",");
        array3.push([parseFloat(array2[0]), parseFloat(array2[1])]);
    }
    var polygon = new AMap.Polygon({
        map: map,
        path: array3,
        strokeColor: "#0000ff",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#f5deb3",
        fillOpacity: 0.35,
    });
}