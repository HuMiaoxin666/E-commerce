var rectView = (function () {

    var minColor = "#A9B3FF";
    var maxColor = "#FF4B4C";
    var tempdata = [];
    for (let i = 0; i < 168; i++) {
        tempdata.push(Math.random() * 1000);
    }
    var maxData = d3.max(tempdata);
    var minData = d3.min(tempdata);
    console.log('minData: ', minData);
    console.log('maxData: ', maxData);
    console.log('tempdata: ', tempdata);
    hour = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    date = ["Mon", "Thue", "Wed", "Thur", "Fri", "Sat", "Sun"]
    var svgHeight = $("#rectSvg")[0].clientHeight;
    var svgWidth = $("#rectSvg")[0].clientWidth;
    var colSpace = svgWidth / 26;
    var rowSpace = svgHeight / 8;

    d3.select("#rectSvg").append("a").selectAll("text").data(hour).enter()
        .append("text")
        .attr("font-size", "10px")
        .attr("font-family", "楷体")
        .attr("x", function (d, i) {
            return colSpace * 1.5 + i * colSpace;
        })
        .attr("y", rowSpace / 2)
        .text(function (d) {
            return d;
        })

    d3.select("#rectSvg").append("a").selectAll("text").data(date).enter()
        .append("text")
        .attr("font-size", "10px")
        .attr("font-family", "楷体")
        .attr("x", function (d) {
            return colSpace*0.7 - d.length * 5;
            
        })
        .attr("y", function (d, i) {
            return rowSpace * 1.3 + i * rowSpace;
        })
        .text(function (d) {
            return d;
        })

    //设置就矩阵图的颜色渐变
    var rectColorScale = d3.scaleLinear()
        .domain([minData,maxData])
        .range([0, 1]);
    var rectCompute = d3.interpolate(minColor,
        maxColor);
    //**矩阵绘制
    d3.select("#rectSvg").append("g").selectAll("rect").data(tempdata).enter()
        .append("rect")
        .attr("width", colSpace)
        .attr("height", rowSpace)
        .attr("x", function (d, i) {
            var start = 56;
            return i % 24 * colSpace * 1 + colSpace * 1.05;
        })
        .attr("y", function (d, i) {
            var line = 24;
            return parseInt(i / line) * rowSpace + 0.8 * rowSpace;
        })
        .attr("id", function (d, i) {
            return i;
        })
        .style("fill", function (d) {
            return rectCompute(rectColorScale(d));
        })
        .style("stroke",'white')
        .style("stroke-width",0.2);

})()