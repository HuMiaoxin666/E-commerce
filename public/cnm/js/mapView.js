var mapView = (function () {
    //黑色地图
    //https://api.mapbox.com/styles/v1/keypro/cjjibvxa20ljx2slnphxjle4b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V5cHJvIiwiYSI6ImNqamliaTJtbjV0YTMzcG82bmthdW03OHEifQ.UBWsyfRiWMYly4gIc2H7cQ
    //白色
    //https://api.mapbox.com/styles/v1/keypro/cjjs6cawt25iq2snp6kqxu3r3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V5cHJvIiwiYSI6ImNqamliaTJtbjV0YTMzcG82bmthdW03OHEifQ.UBWsyfRiWMYly4gIc2H7cQ
    //地图设置
    var map = L.map('map', {}).setView([30.309882, 120.376905], 4)
    var osmUrl = 'https://api.mapbox.com/styles/v1/keypro/cjjs6cawt25iq2snp6kqxu3r3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V5cHJvIiwiYSI6ImNqamliaTJtbjV0YTMzcG82bmthdW03OHEifQ.UBWsyfRiWMYly4gIc2H7cQ',
        layer = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
    L.tileLayer(osmUrl, {

        minZoom: 1,
        maxZoom: 17,
        //用了mapbox的图层
        attribution: layer
        //访问令牌
    }).addTo(map);
    //初始化界面

    getData('5', 'all').then(function (data) {
        variable.chart_data = data;
        variable.chosen_data = data;
        variable.heat_data = data;
        if (variable.heat_plane == true)
            Heatmap(data);
        else
          PlaneView.DrawPlaneView(data);
        options.AddOptions(data);
        lineChart.drawLineChart(data);
        rectView.DrawRectView(data);

    })
    //全局变量
    // var part_all = true;
    L.easyButton('<strong>All</strong>', function (controlArg, mapArg) {
        variable.part_all = false;
        Heatmap(variable.heat_data);
        console.log('map_data: ', variable.heat_data);
    }).addTo(map);
    L.easyButton('<strong>Pt</strong>', function (controlArg, mapArg) {
        variable.part_all = true;
        Heatmap(variable.heat_data);
        console.log('map_data: ', variable.heat_data);
    }).addTo(map);

    function Heatmap(chosenData) {
        console.log('chosenData: ', chosenData);
        // $("#planeJs").remove();
        // console.log('$("#planeJs"): ', $("#planeJs"));
        // var map = L.map('map', {
        // }).setView([30.309882, 120.376905], 4)
        // var osmUrl = 'https://api.mapbox.com/styles/v1/keypro/cjjs6cawt25iq2snp6kqxu3r3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V5cHJvIiwiYSI6ImNqamliaTJtbjV0YTMzcG82bmthdW03OHEifQ.UBWsyfRiWMYly4gIc2H7cQ',
        //     layer = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
        //     L.tileLayer(osmUrl, {

        //         minZoom: 1,
        //         maxZoom: 17,
        //         //用了mapbox的图层
        //         attribution: layer
        //         //访问令牌
        //     }).addTo(map);

        // map.zoomControl.remove();
        let container = $("#map").find("canvas");
        container.remove();


        d3.json("data/address_lat&lng.json", function (allAdress) {
            let heatData = [];
            var cur_address = '';
            // for(var t in allAdress){
            //     allAdress[t]
            // }
            for (var i = 0; i < chosenData.length; i++) {
                cur_address = chosenData[i]['province'] + chosenData[i]['city'] + chosenData[i]['country'];
                allAdress[cur_address].value += 1;
            }
            for (var t in allAdress) {
                if (allAdress[t].value > 0)
                    heatData.push([allAdress[t].lat, allAdress[t].lng, allAdress[t].value])
            }
            if (variable.part_all == true) {
                let max_value = d3.max(heatData, function (d) {
                    return d[2];
                })
                let min_value = d3.min(heatData, function (d) {
                    return d[2];
                })
                //定义值比例尺
                var valueScale = d3.scaleLinear().domain([min_value, max_value]).range([10, 5000]);
                heatData.forEach(element => {
                    element[2] = valueScale(element[2]);
                })
            }

            console.log('allAdress: ', allAdress);
            console.log('heatData: ', heatData);
            var heat = L.heatLayer(heatData, {
                    maxZoom: 17,
                    radius: 10
                }).addTo(map),
                draw = true;
        })

    }

    // function getPlaneJs() {
    //     $.ajax({
    //         async: false,
    //         type: "GET",
    //         url: "js/main.min.js",
    //         dataType: "script",
    //         error: function () {
    //             alert('当前脚本加载出错')
    //         }
    //     });
    // }

    // function getHeatJs() {
    //     $.ajax({
    //         async: false,
    //         type: "GET",
    //         url: "js/leaflet-heat.js",
    //         dataType: "script",
    //         error: function () {
    //             alert('当前脚本加载出错')
    //         }
    //     });
    // }

    function test() {
        console.log("It work !");
    }
    //根据仓库和物品种类获取数据
    function getData(warehouse, type) {
        console.log('type: ', type);
        console.log('warehouse: ', warehouse);
        console.log("It work !");
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/" + "warehouse" + '/' + "type" + "/orderInfor",
                data: {
                    warehouse: warehouse,
                    type: type,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function () {}
            });
        });
    }

    return {
        getData: getData,
        test: test,
        Heatmap: Heatmap,
        map: map,
    }
})()