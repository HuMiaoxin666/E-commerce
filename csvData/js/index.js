var mapView = (function () {
    var map = new BMap.Map("map");
        map.enableScrollWheelZoom(new BMap.Point(116.404, 39.915), 14);
        var myGeo = new BMap.Geocoder(); // 将地址解析结果显示在地图上，并调整地图视野  
        myGeo.getPoint("浙江财经大学", function (point) {
            if (point) {
                console.log('point: ', point);

                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            }
        }, "杭州市");
})()