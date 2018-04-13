function TurnToSelect() {
    ClearMap();
    // document.getElementById("Route_planning").hidden = true
    $("#route_input").css("display", "inline-block");

    var auto_1 = new AMap.Autocomplete({
        input: "start"
    });
    var auto_2 = new AMap.Autocomplete({
        input: "dest"
    });
    AMap.event.addListener(auto_1, "select", select);
    function select(e) {
        if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
        }
    };
    AMap.event.addListener(auto_2, "select", select);
    function select(e) {
        if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
        }
    };
}

function route_choose(value) {
    ClearMap();
    $("#route_input").css("display", "inline-block");
    document.getElementById("routes-container").hidden = true
    document.getElementById("panel").hidden = false

    var val = value;
    // var obj = document.getElementById('Route_Choose');
    // var index = obj.selectedIndex; //序号，取当前选中选项的序号
    // var val = obj.options[index].value;

    var start = $("#start").val();
    var dest = $("#dest").val();
    var start_city = null;
    var dest_city = null;
    if (start != "" && dest != "") {
        AMap.service('AMap.Geocoder', function () {//回调函数
            //实例化Geocoder
            geocoder = new AMap.Geocoder({
                city: "010"//城市，默认：“全国”
            });
            geocoder.getLocation(start, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    start_city = result.geocoder.city;
                } else {

                }
            });
            geocoder.getLocation(dest, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    dest_city = result.geocoder.city;
                } else {

                }
            });
        })


        switch (val) {
            case "驾车":
                var driving = new AMap.Driving({
                    map: map,
                    panel: "panel"
                });
                driving.search([
                    { keyword: start, city: start_city },
                    { keyword: dest, city: dest_city }
                ]);
                break;
            case "骑行":
                var riding = new AMap.Riding({
                    map: map,
                    panel: "panel"
                });
                riding.search([
                    { keyword: start, city: start_city },
                    { keyword: dest, city: dest_city }
                ]);
                break;
            case "步行":
                var walking = new AMap.Walking({
                    map: map,
                    panel: "panel"
                });
                walking.search([
                    { keyword: start, city: start_city },
                    { keyword: dest, city: dest_city }
                ]);
                break;
            // case "公交":
            //     var wa = new AMap.Walking({
            //         map: map,
            //         panel:"panel"
            //     });
            //     walking.search([
            //         { keyword: start, city: start_city },
            //         { keyword: dest, city: dest_city }
            //     ]);
            //     break;
        }
    }
}