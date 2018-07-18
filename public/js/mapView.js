var mapView = (function () {

    var map = L.map('map', {
        renderer: L.canvas()
    }).setView([30.309882, 120.376905], 4)
    var osmUrl = 'https://api.mapbox.com/styles/v1/keypro/cjjibvxa20ljx2slnphxjle4b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V5cHJvIiwiYSI6ImNqamliaTJtbjV0YTMzcG82bmthdW03OHEifQ.UBWsyfRiWMYly4gIc2H7cQ',
        layer = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
    L.tileLayer(osmUrl, {
        minZoom: 1,
        maxZoom: 17,
        //用了mapbox的图层
        attribution: layer
        //访问令牌
    }).addTo(map);
    map.zoomControl.remove();
    //初始化界面
    /*
    d3.csv("data/LocName.csv", function (error, data) {
        console.log(data);
        var pointLoc = [];
        pointLoc = data.map(function (d) {
            d.latLng = [+d.lat, +d.lng];
            d.name = d["市"] + '、' + d['区'];
            return d;
        });
        console.log('pointLoc: ', pointLoc);
        var d3Overlay = L.d3SvgOverlay(function (selection, projection) {

            var updateSelection = selection.selectAll('circle').data(pointLoc);
            updateSelection.enter()
                .append('circle')
                .attr("r", 1)
                .attr("cx", function (d) {
                    return projection.latLngToLayerPoint(d.latLng).x
                })
                .attr("cy", function (d) {
                    return projection.latLngToLayerPoint(d.latLng).y
                })
                .attr("fill", '#4AC2F1')
                .attr("id", function (d) {
                    return d.name
                })
                .attr("text", function (d) {
                    return d.name;
                })
                .transition()
                .duration(2000)
                .attr("r", 5);

        });

        d3Overlay.addTo(map);
    });*/
    
    // getChosenData(options.WhStatus, options.type).then(function (suspedingData) {
    //     console.log('suspedingData: ', suspedingData);
    //     Heatmap(suspedingData);
    //     DrawRectView(suspedingData);
    // });

    function Heatmap(chosenData) {
        console.log('chosenData: ', chosenData);
        let container = $("#map").find("canvas");
        container.remove();

        let heatData = [];
        for (var i = 0; i < chosenData.length; i++) {
            chosenData[i]['lat'] = parseFloat(chosenData[i]['lat']);
            chosenData[i]['lng'] = parseFloat(chosenData[i]['lng']);
            heatData.push([chosenData[i]['lat'], chosenData[i]['lng']])
        }
        var heat = L.heatLayer(heatData, {
                maxZoom: 17,
                radius: 10
            }).addTo(map),
            draw = true;
        heat.redraw();
        heat.setLatLngs(heatData);
        console.log('container: ', container);
    }

    function getAllData(){
        return new Promise(function(resolve, reject){
            $.ajax({
                type: "get",
                url: "/orderInfor",
                success: function (data){
                    resolve(data);
                },
                error: function () {

                }
            });
        });
    }

    function test() {
        console.log("It work !");
    }

    function getChosenData(warehouse, type) {
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
                error: function () {
                }
            });
        });
    }

    return {
        getChosenData: getChosenData,
        test: test,
        Heatmap: Heatmap,
    }
})()