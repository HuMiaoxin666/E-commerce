var rectView = (function () {
    lineChart.drawLineChart(1);
    mapView.getChosenData('','').then(function(data){
        rectView.DrawRectView(data);
        mapView.Heatmap(data);
    })
})()