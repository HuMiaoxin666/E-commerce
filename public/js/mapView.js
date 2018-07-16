var mapView = (function () {
    
    var map = L.map('map', {
        renderer: L.canvas()
    }).setView([30.309882,120.376905], 5)
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
    d3.csv("data/LocName.csv", function(error,data){
        console.log(data);
        var pointLoc = [];
        pointLoc = data.map(function(d){
            d.latLng  = [+d.lat, +d.lng];
            d.name = d["市"] + '、'+d['区'];
            return d;
        });
        console.log('pointLoc: ', pointLoc);
        var d3Overlay = L.d3SvgOverlay(function(selection, projection){

            var updateSelection = selection.selectAll('circle').data(pointLoc);
            updateSelection.enter()
                .append('circle')
                .attr("r", 1)
                .attr("cx", function(d) { return projection.latLngToLayerPoint(d.latLng).x })
                .attr("cy", function(d) { return projection.latLngToLayerPoint(d.latLng).y })
                .attr("fill",'#4AC2F1')
                .attr("id", function(d){return d.name})
                .attr("text",function(d){return d.name;})
                .transition()
                .duration(2000)
                .attr("r",5)
                .attr("fill",'red');
            
        });
        
        d3Overlay.addTo(map);
    });
    
    getChosenData(options.warehouse,options.type).then(function (suspedingData) {
        
        console.log('suspedingData: ', suspedingData);

    });
    
    function getAllData() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/po_infor",
                success: function (data) {
                    resolve(data);
                },
                error: function () {

                }
            });
        });
    }
    function getChosenData(warehouse,type) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/" + warehouse+'/'+type+"/po_infor",
                data:{
                    warehouse: warehouse,
                    type:type,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function () {

                }
            });
        });
    }


   
})()