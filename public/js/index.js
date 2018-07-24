var rectView = (function () {
    lineChart.drawLineChart(1);
    mapView.getChosenData('5','家居个护').then(function(data){
        rectView.DrawRectView(data);
        mapView.Heatmap(data);
    })
})()