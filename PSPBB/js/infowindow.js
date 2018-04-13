var infowindow;
function info(code, pos) {
    var latitude, longitude, ms
    $.ajax({
        type: "post",
        url: "../php/Location_now.php",
        async: true,
        dataType: "json",
        data: "id=" + code,
        success: function (msg) {
            var strarr = String(msg['Location']).split(",");
            longitude = parseFloat(strarr[0])
            latitude = parseFloat(strarr[1])
            ms = msg
        }
    });
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
        var marker = new AMap.Marker({
            map: map,
            zIndex: 9999999,
            position: [longitude, latitude]
        });

        AMap.service('AMap.Geocoder', function () {//回调函数
            //实例化Geocoder
            geocoder = new AMap.Geocoder({
                city: "010"//城市，默认：“全国”
            });

            //逆地理编码
            var lnglatXY = [longitude, latitude];//地图上所标点的坐标
            geocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    infoWindow = new SimpleInfoWindow({
                        infoTitle: code,
                        infoBody: '<p><strong>地址:</strong>' + result.regeocode.formattedAddress + '</p>' +
                            '<p><strong>定位:</strong>' + longitude + ' E,' + latitude + ' N' + '</p>' +
                            '<p><strong>海拔:</strong>' + ms["altitude"] + 'm' + '</p>' +
                            '<p><strong>时间:</strong>' + ms["LocalTime"] + '</p>' +
                            '<p><strong>时长:</strong>test</p>' +
                            '<p><strong>工作卫星个数:</strong>' + ms["num_sats"] + '</p>' +
                            '<p><strong>信号质量:</strong>' + ms["gps_qual"] + '</p>' +
                            '<p><strong>系统误差:</strong>' + ms["horizontal_dil"] + '</p>',
                        offset: new AMap.Pixel(0, -31)
                    });

                    infoWindow.open(map, marker.getPosition());
                } else {
                    //获取地址失败
                }
            });
        })
    });
}





