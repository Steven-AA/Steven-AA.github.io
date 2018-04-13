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
                e.target.editor.close();
            }, 1);
            contextMenu.addItem("删除", function () {
                e.target.editor.close();
                map.remove(e.target);
            }, 2);
            contextMenu.open(map, e.lnglat);
        });
        map.setFitView();
        polygons.push(polygon);
        var temp = confirm("确定是这个围栏？")
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
        }
    });
}


function check_polygon() {
    ClearMap()
    var dots = ["118.926792,32.122329", "118.934087,32.11455", "118.930697,32.106771"]
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
                    console.log("out")
                    status = "out"
                } else if (msg.data.fencing_event_list[0].client_status == 'in') {
                    console.log("in" + msg.data.fencing_event_list[0].enter_time)
                    status = "in"
                }
                new_marker(status, location)
            } else {
                alert("系统错误")
            }
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
    var str = "118.933052,32.121796;118.924069,32.117479;118.928014,32.110847;118.927468,32.104473;118.936147,32.106632;118.934812,32.111516;118.935904,32.117016";
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