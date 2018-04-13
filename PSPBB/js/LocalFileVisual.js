//打开文件
function F_Open_dialog() {
    ClearMap();
    document.getElementById("btn_file").click();
    $("#map_choose").css("display", "inline-block");
}

function F_Reader(val) {
    var input = document.getElementById("btn_file")
    //支持chrome IE10
    if (window.FileReader) {
        var file = input.files[0];
        var filename = file.name.split(".")[0];
        var reader = new FileReader();
        if (val == "轨迹图") {
            var path = [];
            reader.onload = function () {
                var array = this.result.split("\n")
                for (var i = 0; i < array.length; i++) {
                    var strarr = String(array[i]).split(",");
                    path.push([
                        parseFloat(String(strarr[0]).slice(1, )),
                        parseFloat(String(strarr[1]).substr(0, String(strarr[1]).length - 1))
                    ]);
                }
            }
            reader.readAsText(file);
            return path;
        }
        else if (val == "分布图") {
            var districts = [];
            reader.onload = function () {
                var array = this.result.split("\r\n");
                for (var i = 0; i < array.length; i++) {
                    districts.push(
                        array[i].substr(1, array[i].length - 2)
                    );
                }
            }
            reader.readAsText(file);
            return districts;
        }
        else if (val == "热力图") {
            var heatmapData = [];
            reader.onload = function () {
                var array = this.result.split("\n");
                for (var i = 1; i < array.length; i++) {  //i=0是列名
                    // var strarr = String(array[i]).split("\",\"");
                    var strarr = String(array[i]).split(",");
                    heatmapData.push({
                        // "lng": parseFloat(String(strarr[0]).slice(1, )),
                        // "lat": parseFloat(String(strarr[1])),
                        // "count": parseInt(String(strarr[2]).substr(0, String(strarr[2]).length - 1))
                        "lng": parseFloat(String(strarr[0])),
                        "lat": parseFloat(String(strarr[1])),
                        "count": parseInt(String(strarr[2]))
                    });
                }
            }
            reader.readAsText(file);
            return heatmapData;
        }
    }
    //支持IE 7 8 9 10
    else if (typeof window.ActiveXObject != 'undefined') {
        var xmlDoc;
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        // alert(xmlDoc.xml);
        // alert("22")
    }
    //支持FF
    else if (document.implementation && document.implementation.createDocument) {
        var xmlDoc;
        xmlDoc = document.implementation.createDocument("", "", null);
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        // alert(xmlDoc.xml);
        // alert("33")
    } else {
        alert('error');
    }
    // d3.csv("./china5a.csv", function (error, csvdata) {
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(csvdata);
    //     for (var i = 0; i < csvdata.length; i++) {
    //         var name = csvdata[i].经纬度;
    //         console.log(name + "\n");
    //     }
    // });
}

//本地数据可视化
function LocalFileVisual(val) {
    ClearMap();
    switch (val) {
        case "轨迹图":
            var path = F_Reader(val);
            confirm("确定展示轨迹图？")
            draw_Trajectory2(path);
            break;

        case "分布图":
            var districts = F_Reader(val);
            confirm("确定展示分布图？")
            draw_PointMap(districts);
            break;

        case "热力图":
            var heatmapData = F_Reader(val);
            console.log(heatmapData)
            confirm("确定展示热力图？")
            draw_HeatMap(heatmapData);
            break;
    }
}

//点分布
function draw_PointMap(districts) {
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 11,
    });
    AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function (PointSimplifier, $) {
        if (!PointSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        var pointSimplifierIns = new PointSimplifier({
            map: map, //所属的地图实例
            getPosition: function (item) {
                if (!item) {
                    return null;
                }
                var parts = item.split(',');
                //返回经纬度
                return [parseFloat(parts[0]), parseFloat(parts[1])];
            },
            getHoverTitle: function (dataItem, idx) {
                return idx + ': ' + dataItem;
            },
            renderOptions: {
                //点的样式
                pointStyle: {
                    width: 10,
                    height: 10,
                },
                //鼠标hover时的title信息
                hoverTitleStyle: {
                    position: 'top'
                }
            }
        });
        window.pointSimplifierIns = pointSimplifierIns;
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        pointSimplifierIns.setData(districts);
        $('#loadingTip').remove();
        pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function (e, record) {
            //console.log(e.type, record);
        });
    });
}

//热力图
function draw_HeatMap(heatmapData) {
    var map = Loca.create('container', {
        features: ['bg', 'road'],
        center: [116.397475, 39.908668],
        zoom: 10
    });
    var layer = Loca.visualLayer({
        container: map,
        type: 'heatmap',
        shape: 'normal'
    });
    var list = [];
    var i = -1, length = heatmapData.length;
    while (++i < length) {
        var item = heatmapData[i];
        list.push({
            coordinate: [item.lng, item.lat],
            count: item.count
        })
    }
    layer.setData(list, {
        lnglat: 'coordinate',
        value: 'count'
    });
    layer.setOptions({
        style: {
            radius: 25,
            opacity: [0, 0.7],
        },
        gradient: {
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red'
        }
    });
    layer.render();
}

// //可视化
// function VisialDemo() {
//     $.get('http://a.amap.com/Loca/static/mock/china5a.csv', function (data) {
//         var map = Loca.create('container', {
//             center: [107.4976, 32.1697],
//             zoom: 4
//         });
//         var layer = Loca.visualLayer({
//             container: map,
//             type: 'point',
//             shape: 'circle'
//         });

//         layer.setData(data, {
//             type: 'csv',
//             lnglat: '经纬度'
//         });

//         layer.setOptions({
//             style: {
//                 radius: 10,
//                 fill: 'rgba(100, 100, 233, 0.6)',
//                 lineWidth: 1,
//                 stroke: '#eee'
//             }
//         });
//         layer.render();
//     });
// }
