var rectView = (function () {
    function DrawRectView(chosenData) {
        var svgRect = d3.select("#rectSvg");
        svgRect.selectAll("a").remove();
        svgRect.selectAll("g").remove()

        let minColor = "#FFF57B";
        let maxColor = "#FE2D0B";
        //获取数据内一共有几天的数据
        var day_arr = [];

        chosenData.forEach(element => {
            if (day_arr.indexOf(element['start_date']) != -1) {} else {
                day_arr.push(element['start_date']);
            }

        });
        var day_length = day_arr.length;
        var day_onlyArr = [];
        for (var i = 0; i < day_length; i++) {
            day_onlyArr.push(day_arr[i].substr(day_arr[i].length - 2, 2) + '号');
        }
        console.log('day_arr: ', day_arr);
        console.log('day_arr: ', day_onlyArr);

        //初始化矩阵数据
        var rectData = [];
        for (let d = 0; d < day_length; d++) {
            rectData.push([]);
            for (let h = 0; h < 24; h++)
                rectData[d].push(0);
        }
        console.log('rectData: ', rectData);
        //给矩阵赋值
        chosenData.forEach(element => {
            let cur_hIndex = parseInt(element.start_hour) - 1;
            let cur_day = element.start_date;
            let cur_dayIndex = day_arr.indexOf(cur_day);
            rectData[cur_dayIndex][cur_hIndex] += 1;
        });



        //求最值
        console.log('rectData: ', rectData);
        var maxDataArr = [],
            minDataArr = [];
        for (var i = 0; i < rectData.length; i++) {
            maxDataArr.push(d3.max(rectData[i]));
            console.log('rectData[i]: ', rectData[i]);
            console.log('d3.max(rectData[i]): ', d3.max(rectData[i]));

            minDataArr.push(d3.min(rectData[i]));
        }
        console.log('maxDataArr: ', maxDataArr);
        var maxData = d3.max(maxDataArr);
        var minData = d3.min(minDataArr);
        console.log('minData: ', minData);
        console.log('maxData: ', maxData);
        console.log('rectData: ', rectData);
        hour = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
        var svgHeight = $("#rectSvg")[0].clientHeight;
        var svgWidth = $("#rectSvg")[0].clientWidth;
        var colSpace = svgWidth / 26;
        var rowSpace = svgHeight / (day_length + 1);
        //添加时间标签
        svgRect.append("a").selectAll("text").data(hour).enter()
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

        svgRect.append("a").selectAll("text").data(day_onlyArr).enter()
            .append("text")
            .attr("font-size", "10px")
            .attr("font-family", "楷体")
            .attr("x", function (d) {
                return colSpace * 0.7 - d.length * 5;
            })
            .attr("y", function (d, i) {
                return rowSpace * 1.3 + i * rowSpace;
            })
            .text(function (d) {
                return d;
            })

        //设置就矩阵图的颜色渐变
        var rectColorScale = d3.scaleLinear()
            .domain([minData, maxData])
            .range([0, 1]);
        var rectCompute = d3.interpolate(minColor,
            maxColor);
        //**矩阵绘制
        for (var day = 0; day < rectData.length; day++) {
            console.log('day: ', day);
            svgRect.append("g").selectAll("rect").data(rectData[day]).enter()
                .append("rect")
                .attr("x", function (d, i) {
                    return i % 24 * colSpace * 1 + colSpace * 1.05;
                })
                .attr("y", function () {
                    return day * rowSpace + 0.8 * rowSpace;
                })
                .attr("width", 0)
                .attr("height", rowSpace)
                .style("fill", function (d) {
                    return rectCompute(rectColorScale(minData));
                })
                .style("stroke", 'white')
                .style("stroke-width", 0.2)
                .transition()
                .duration(1000)
                .attr("width", colSpace)
                .style("fill", function (d) {
                    return rectCompute(rectColorScale(d));
                })
                .attr("id", function (d, i) {
                    return day_arr[day] + '_' + (i + 1);
                })
        }
        svgRect.selectAll("rect").on("click", function (d) {
            var cur_time = this.id.split("_");
            console.log('cur_time: ', cur_time);
            getTimeData(cur_time[0], cur_time[1], options.WhStatus, options.type).then(function (data) {
                mapView.Heatmap(data);
                console.log('data: ', data);
            });
            getTimeData(cur_time[0], cur_time[1]).then(function(data){
                console.log('data: ', data);
                lineChart.drawLineChart(data)
            })
        })


    }
   
    //根据时间和仓库和种类获取数据
    function getTimeData(day, hour, warehouse, type) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/" + day + '/' + hour +'/' + warehouse+'/' + type+ "/rectClick",
                data: {
                    day: day,
                    hour: hour,
                    warehouse:warehouse,
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
    //只根据时间获取数据
    function getTimeData(day, hour) {
        return new Promise(function (resolve, reject){
            $.ajax({
                type: "get",
                url: "/" + day + '/' + hour  + "/rectClickTime",
                data: {
                    day: day,
                    hour: hour,
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
        DrawRectView: DrawRectView,
    }
})()