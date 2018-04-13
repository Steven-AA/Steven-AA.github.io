// 天气预报
function weather() {
    ClearMap();
    document.getElementById("tip").hidden = false
    AMap.service('AMap.Weather', function () {
        var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
        weather.getLive('南京', function (err, data) {
            if (!err) {
                var str = [];
                str.push('<div style="color: #3366FF;">实时天气' + '</div>');
                str.push('<div>城市/区：' + data.city + '</div>');
                str.push('<div>天气：' + data.weather + '</div>');
                str.push('<div>温度：' + data.temperature + '℃</div>');
                str.push('<div>风向：' + data.windDirection + '</div>');
                str.push('<div>风力：' + data.windPower + ' 级</div>');
                str.push('<div>空气湿度：' + data.humidity + '</div>');
                str.push('<div>发布时间：' + data.reportTime + '</div>');
                var marker = new AMap.Marker({ map: map, position: map.getCenter() });
                var infoWin = new AMap.InfoWindow({
                    content: str.join(''),
                    offset: new AMap.Pixel(0, -20)
                });
                infoWin.open(map, marker.getPosition());
                marker.on('mouseover', function () {
                    infoWin.open(map, marker.getPosition());
                });
            }
        });
        //未来4天天气预报
        weather.getForecast('南京', function (err, data) {
            if (err) { return; }
            var str = [];
            for (var i = 0, dayWeather; i < data.forecasts.length; i++) {
                dayWeather = data.forecasts[i];
                str.push(dayWeather.date + ' <div id="weather">' + dayWeather.dayWeather + '</div> ' + dayWeather.nightTemp + '~' + dayWeather.dayTemp + '℃');
            }
            document.getElementById('tip').innerHTML = str.join('<br>');
        });
    });
}

//设置时间
function settime() {
    var myDate = new Date()
    y = myDate.getFullYear()
    m = myDate.getMonth() + 1
    d = myDate.getDate()
    h = myDate.getHours()
    i = myDate.getMinutes()
    var endtime = y + "-" + m + "-" + d + " " + h + ":" + i
    document.getElementById("endtime").value = endtime
    // myDate.setDate(myDate.getDate() - 4);
    // y = myDate.getFullYear()
    // m = myDate.getMonth() + 1
    // d = myDate.getDate()
    // h = myDate.getHours()
    // i = myDate.getMinutes()
    h = h - 4
    var starttime = y + "-" + m + "-" + d + " " + h + ":" + i
    document.getElementById("starttime").value = starttime
}
// 标记点
function addMarker(pos) {
    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: pos
    });
    marker.setMap(map);
};

// 输入设备号
function pos_q() {
    ClearMap();
    var code = $("#code").val();
    if (code != null && code != "") {
        ClearMap();
        info(code);
    }
};

// 绘制轨迹
var Trajectory = []
function adddata() {
    var starttime = $("#starttime").val()
    var endtime = $("#endtime").val()
    var code = $("#code2").val();
    if (code != null && code != "") {
        var path_ = load_path(code, starttime, endtime);
    }
    Trajectory.push(
        {
            name: code + ' ' + starttime.substr(5, ) + '-' + endtime.substr(5, ),
            path: path_
        });
    alert("添加数据成功")
}

function draw_Trajectory() {
    ClearMap();
    var code = $("#code").val();
    if (code != null && code != "") {
        var path_ = load_path(code);
    }
    draw_Trajectory2(path_)
}

function draw_Trajectory1() {
    ClearMap();
    //创建地图
    document.getElementById("panel").hidden = false
    document.getElementById("routes-container").hidden = false
    AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        //just some colors
        var colors = [
            "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
            "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
            "#651067", "#329262", "#5574a6", "#3b3eac"
        ];
        var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: map, //所属的地图实例
            getPath: function (pathData, pathIndex) {
                return pathData.path;
            },
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
                if (pointIndex >= 0) {
                    //point 
                    return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                }
                return pathData.name + '，点数量' + pathData.path.length;
            },
            renderOptions: {
                pathLineStyle: {
                    dirArrowStyle: true
                },
                getPathStyle: function (pathItem, zoom) {

                    var color = colors[pathItem.pathIndex],
                        lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3)) / 3;
                    return {
                        pathLineStyle: {
                            strokeStyle: color,
                            lineWidth: lineWidth
                        },
                        pathLineSelectedStyle: {
                            lineWidth: lineWidth + 2
                        },
                        pathNavigatorStyle: {
                            fillStyle: color
                        }
                    }
                }
            }
        });
        var pathNavigs = [];
        function getNavg(pathIndex) {
            if (!pathNavigs[pathIndex]) {
                //创建一个轨迹巡航器
                var navgtr = pathSimplifierIns.createPathNavigator(pathIndex, {
                    loop: true,
                    speed: parseInt($('#speedInp_' + pathIndex).val())
                });
                var $markerContent = $('<div class="markerInfo"></div>');
                $markerContent.html(pathSimplifierIns.getPathData(pathIndex).name);
                navgtr.marker = new AMap.Marker({
                    offset: new AMap.Pixel(12, -10),
                    content: $markerContent.get(0),
                    map: map
                });
                var $msg = $('#routes-container').find('div.route-item[data-idx="' +
                    pathIndex + '"]').find('.msg');
                navgtr.on('move', function () {
                    navgtr.marker.setPosition(navgtr.getPosition());
                });
                navgtr.onDestroy(function () {
                    pathNavigs[pathIndex] = null;
                    navgtr.marker.setMap(null);
                    $msg.html('');
                });
                navgtr.on('start resume', function () {
                    navgtr._startTime = Date.now();
                    navgtr._startDist = this.getMovedDistance();
                });
                navgtr.on('stop pause', function () {
                    navgtr._movedTime = Date.now() - navgtr._startTime;
                    navgtr._movedDist = this.getMovedDistance() - navgtr._startDist;
                    navgtr._realSpeed = (navgtr._movedDist / navgtr._movedTime * 3600);
                    var msgInfo = {
                        '状态': this.getNaviStatus(),
                        '设定速度': this.getSpeed() + ' km/h',
                        '总行进距离': Math.round(this.getMovedDistance() / 1000) + ' km',
                        '本段行进距离': Math.round(navgtr._movedDist / 1000) + ' km',
                        '本段耗时': (navgtr._movedTime / 1000) + ' s',
                        '本段实际速度': Math.round(navgtr._realSpeed) + ' km/h'
                    };
                    $msg.html('<pre>' + JSON.stringify(msgInfo, null, 2) + '</pre>');
                    refreshNavgButtons();
                });
                navgtr.on('move', function () {
                    var msgInfo = {
                        '状态': this.getNaviStatus(),
                        '设定速度': this.getSpeed() + ' km/h',
                        '总行进距离': Math.round(this.getMovedDistance() / 1000) + ' km'
                    };
                    $msg.html('<pre>' + JSON.stringify(msgInfo, null, 2) + '</pre>');
                });
                pathNavigs[pathIndex] = navgtr;
            }
            return pathNavigs[pathIndex];
        }
        var navigBtnsConf = [{
            name: '开始巡航',
            action: 'start',
            enableExp: 'navgStatus === "stop" || navgStatus === "pause"'
        }, {
            name: '暂停',
            action: 'pause',
            enableExp: 'navgStatus === "moving"'
        }, {
            name: '恢复',
            action: 'resume',
            enableExp: 'navgStatus === "pause"'
        }, {
            name: '停止',
            action: 'stop',
            enableExp: 'navgStatus === "moving"'
        }, {
            name: '销毁',
            action: 'destroy',
            enableExp: 'navgExists'
        }];
        function refreshNavgButtons() {
            $('#routes-container').find('div.route-item').each(function () {
                var pathIndex = parseInt($(this).attr('data-idx'), 0);
                if (pathIndex < 0) {
                    return;
                }
                var navgStatus = 'stop',
                    navgExists = !!pathNavigs[pathIndex];
                if (navgExists) {
                    navgStatus = pathNavigs[pathIndex].getNaviStatus();
                }
                $(this).find('.navigBtn').each(function () {
                    var btnIdx = parseInt($(this).attr('data-btnIdx'));
                    $(this).prop('disabled', !eval(navigBtnsConf[btnIdx].enableExp));
                });
            });
        }

        function initRoutesContainer(data) {
            $('#routes-container').on('click', '.navigBtn', function () {
                var pathIndex = parseInt($(this).closest('.route-item').attr('data-idx'), 0);
                var navg = getNavg(pathIndex);
                navg[$(this).attr('data-act')]();
                refreshNavgButtons();
            });
            for (var i = 0, len = data.length; i < len; i++) {
                initRouteItem(data[i], i);
            }
            refreshNavgButtons();
        }

        function initRouteItem(pathData, idx) {
            var $routeItem = $('<div class="route-item"></div>');
            $routeItem.attr('data-idx', idx);
            $('<h3/>').css({
                color: colors[idx]
            }).html(pathData.name + '(点数： ' + pathData.path.length + ')').appendTo($routeItem).on('click', function () {
                pathSimplifierIns.setSelectedPathIndex(idx);
            });
            for (var i = 0, len = navigBtnsConf.length; i < len; i++) {
                $('<button class="navigBtn" data-btnIdx="' + i + '" data-act="' + navigBtnsConf[i].action + '"></button>').html(navigBtnsConf[i].name).appendTo($routeItem);
            }
            $speedBox = $('<div class="speedBox"></div>').appendTo($routeItem);
            var speedTxt = $('<span><span>').appendTo($speedBox);
            var speedRangeInput = $('<input id="speedInp_' + idx +
                '" class="speedRange" type="range" min="100" max="10000" step="1" value="200" />').appendTo($speedBox);
            function updateSpeedTxt() {
                var speed = parseInt(speedRangeInput.val(), 10);
                speedTxt.html('时速：' + speed + ' km/h');
                if (pathNavigs[idx]) {
                    pathNavigs[idx].setSpeed(speed);
                }
            }
            speedRangeInput.on('change', updateSpeedTxt);
            updateSpeedTxt();
            $speedBox.appendTo($routeItem);
            $('<div class="msg"></div>').appendTo($routeItem);
            $routeItem.appendTo('#routes-container');
        }
        window.pathSimplifierIns = pathSimplifierIns;
        console.log(Trajectory)
        pathSimplifierIns.setData(Trajectory);
        initRoutesContainer(Trajectory);
    });
}

function draw_Trajectory2(path_) {
    AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: map, //所属的地图实例
            getPath: function (pathData, pathIndex) {
                return pathData.path;
            },
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
                if (pointIndex >= 0) {
                    //point
                    return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                }
                return pathData.name + '，点数量' + pathData.path.length;
            },
            renderOptions: {
                renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
            }
        });
        window.pathSimplifierIns = pathSimplifierIns;
        //设置数据
        pathSimplifierIns.setData([{
            name: '路线0',
            path: path_
        }]);
        // 对第一条线路（即索引 0）创建一个巡航器
        var navg = pathSimplifierIns.createPathNavigator(0, {
            loop: true, //循环播放
            speed: 700 //巡航速度，单位千米/小时
        });
        navg.start();
    });
}

//清理地图
function ClearMap() {
    map.clearMap();
    document.getElementById("panel").hidden = true
    document.getElementById("tip").hidden = true
    if (window.pathSimplifierIns != null) {
        window.pathSimplifierIns.setData();
    }

}

