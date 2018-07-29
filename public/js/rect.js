var rectView = (function () {

    function DrawRectView(chosenData) {
        //全局变量
        var rect_color_selected = "#007bff";
        var rect_color_over = "#4012B2";
        var text_color_selected = "#007bff";
        var text_color_over = "#007bff";
        var color_rect_stroke = "#F0F0F0";
        var color_text_stroke = "#666666";
        var svgRect = d3.select("#rectSvg");
        // var heat_plane = true; //为true时画热力图

        //给热力图和飞机图添加点击事件
        $("#heatMap").click(function () {
            $("#" + this.id).attr("class", "nav-link active");
            $("#planeView").attr("class", "nav-link");
            variable.heat_plane = true;
            // mapView.getData(WH_index, CG_name).then(function (data) {
            //     mapView.Heatmap(data);
            // });
        })
        $("#planeView").click(function () {
            $("#" + this.id).attr("class", "nav-link active");
            $("#heatMap").attr("class", "nav-link");
            variable.heat_plane = false;
            console.log('heat_plane: ', variable.heat_plane);
            // mapView.getData(WH_index, CG_name).then(function (data) {
            //     PlaneView.DrawPlaneView(data);
            // });
        })
        svgRect.selectAll("a").remove();
        svgRect.selectAll("g").remove()

        let minColor = "#BED5FF";
        let maxColor = "#FF130A";
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
        hour_arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
        var svgHeight = $("#rectSvg")[0].clientHeight;
        var svgWidth = $("#rectSvg")[0].clientWidth;
        var colSpace = svgWidth / 26;
        var rowSpace = svgHeight / (day_length + 1.2);

        var selected_hourId = ''; //添加小时选中标签
        var selected_dayId = ''; //添加日期选中标签
        var selected_rectId = []; //添加矩形选中标签

        //添加小时时间标签
        svgRect.append("a").selectAll("text").data(hour_arr).enter()
            .append("text")
            .attr("font-size", "10px")
            .attr("font-family", "楷体")
            .attr("x", function (d, i) {
                return colSpace * 1.5 + i * colSpace;
            })
            .attr("y", rowSpace / 3)
            .attr("id", function (d) {
                return "hour_" + d;
            })
            .style("stroke", color_text_stroke)
            .text(function (d) {
                return d;
            }).on("mouseover", function (d, i) {
                $(this).css({
                    "stroke": text_color_selected
                });
                if (selected_hourId != this.id) {
                    day_arr.forEach(element => {
                        $('#' + element + '_' + d).css("stroke", rect_color_over);
                    })
                }

            })
            .on("mouseout", function (d, i) {
                if (selected_hourId != this.id) {
                    $(this).css("stroke", color_text_stroke);
                    day_arr.forEach(element => {
                        let temp_rect = '#' + element + '_' + d;
                        if (selected_rectId.indexOf(temp_rect) == -1)
                            $(temp_rect).css("stroke", color_rect_stroke);
                        else
                            $(temp_rect).css("stroke", rect_color_selected);

                    })
                }

            }).on("click", function (d) {
                svgRect.selectAll("text").style("stroke", color_text_stroke)
                $(this).css({
                    "stroke": text_color_selected,
                });
                selected_hourId = this.id;
                let cur_hour = d; //获取当前选中的hour
                console.log('cur_hour: ', cur_hour);
                svgRect.selectAll("rect").style("stroke", color_rect_stroke).style("stroke-width",0.05 * colSpace)
                //跟新当前选中的矩形id数组
                let temp_arr = [];
                day_arr.forEach(element => {
                    $("#" + element + "_" + cur_hour).css({"stroke": rect_color_selected,"stroke-width":0.1 * colSpace});
                    temp_arr.push("#" + element + "_" + cur_hour);
                });
                selected_rectId = temp_arr;
                //跟新热力图或飞机图和折线图

                getTimeData("all", cur_hour, variable.WH_index, variable.type).then(function (data) {
                    console.log('data: ', data);
                    console.log('variable.type: ', variable.type);
                    console.log('variable.WH_index: ', variable.WH_index);
                    //重新赋值当前的变量
                    variable.chosen_data = data;
                    variable.heat_data = data;

                    console.log(' options.type: ', variable.type);
                    console.log('variable.WH_index: ',variable.WH_index);
                    console.log('heat_plane: ', variable.heat_plane);
                    if (variable.heat_plane == true)
                        mapView.Heatmap(data);
                    else
                        PlaneView.DrawPlaneView(data);
                    console.log('time wh cg data: ', data);
                    options.AddOptions(data);
                });
                getTimeOnlyData('all', cur_hour).then(function (data) {
                    variable.chart_data = data;

                    console.log('only time data: ', data);
                    lineChart.drawLineChart(data)
                });
            })
        //添加日期时间标签
        svgRect.append("a").selectAll("text").data(day_onlyArr).enter()
            .append("text")
            .attr("font-size", "10px")
            .attr("font-family", "楷体")
            .style("stroke", color_text_stroke)
            .attr("x", function (d) {
                return colSpace * 0.7 - d.length * 5;
            })
            .attr("y", function (d, i) {
                return rowSpace * 1.0 + i * rowSpace;
            })
            .attr("id", function (d, i) {
                return "day_" + day_arr[i];
            })
            .text(function (d) {
                return d;
            })
            .on("mouseover", function (d, i) {
                $(this).css({
                    "stroke": text_color_selected
                });
                if (selected_dayId != this.id) {
                    hour_arr.forEach(element => {
                        $("#" + day_arr[i] + '_' + element).css("stroke", rect_color_over);
                    })
                }

            })
            .on("mouseout", function (d, i) {
                if (selected_dayId != this.id) {
                    
                    $(this).css("stroke", color_text_stroke);
                    hour_arr.forEach(element => {
                        let temp_rect = "#" + day_arr[i] + '_' + element;
                        if (selected_rectId.indexOf(temp_rect) == -1)
                            $(temp_rect).css("stroke", color_rect_stroke);
                        else
                            $(temp_rect).css("stroke", rect_color_selected);
                    })
                }

            }).on("click", function (d, i) {
                svgRect.selectAll("text").style("stroke", color_text_stroke)
                selected_dayId = this.id;
                $(this).css({
                    "stroke": text_color_selected,
                });
                let cur_day = day_arr[i]; //获取当前选中的日期
                svgRect.selectAll("rect").style("stroke", color_rect_stroke).style("stroke-width",0.05 * colSpace)
                //跟新当前选中的矩形id数组
                let temp_arr = [];
                hour_arr.forEach(element => {
                    $("#" + cur_day + "_" + element).css({"stroke": rect_color_selected,"stroke-width":0.1 * colSpace});
                    temp_arr.push("#" + cur_day + "_" + element);
                })
                selected_rectId = temp_arr;
                //跟新热力图或飞机图和折线图
                getTimeData(cur_day, 'all', variable.WH_index, variable.type).then(function (data) {
                    console.log('data: ', data);
                    console.log(' variable.type: ',  variable.type);
                    console.log('variable.WH_index: ', variable.WH_index);
                    variable.heat_data = data;
                    variable.chosen_data = data;

                    console.log(' options.type: ', variable.type);
                    console.log('variable.WH_index: ', variable.WH_index);
                    if (variable.heat_plane == true)
                        mapView.Heatmap(data);
                    else
                        PlaneView.DrawPlaneView(data);
                    console.log('time wh cg data: ', data);
                    options.AddOptions(data);
                });
                getTimeOnlyData(cur_day, 'all').then(function (data) {
                    variable.chart_data = data;

                    console.log('only time data: ', data);
                    lineChart.drawLineChart(data)
                })
            })
        //设置就矩阵图的颜色渐变
        var rectColorScale = d3.scaleLinear()
            .domain([minData, maxData])
            .range([0, 1]);
        var rectCompute = d3.interpolateHslLong(minColor,
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
                    return day * rowSpace + 0.5 * rowSpace;
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "hour bordered")
                .attr("width", 0)
                .attr("height", 0.97 * rowSpace)
                .style("fill", function (d) {
                    return rectCompute(rectColorScale(minData));
                })
                .style("stroke", color_rect_stroke)
                .style("stroke-width", 0.05 * colSpace)
                .transition()
                .duration(1000)
                .attr("width", 0.95 * colSpace)
                .style("fill", function (d) {
                    return rectCompute(rectColorScale(d));
                })
                .attr("id", function (d, i) {
                    return day_arr[day] + '_' + (i + 1);
                })
        }

        svgRect.selectAll("rect").on("click", function (d) {
            //选中状态调整
            svgRect.selectAll("text").style("stroke", color_text_stroke) //字体重置
            svgRect.selectAll("rect").style("stroke", color_rect_stroke).style("stroke-width",0.05 * colSpace) //边框颜色重置
            d3.select(this).style("stroke", rect_color_selected).style("stroke-width",0.1 * colSpace)
            var cur_time = this.id.split("_"); //获取当前日期和小时（0为日期，1为小时）
            selected_hourId = "hour_" + cur_time[1];
            selected_dayId = "day_" + cur_time[0];
            $("#day_" + cur_time[0]).css("stroke", text_color_selected); //当前选中的日期
            $("#hour_" + cur_time[1]).css("stroke", text_color_selected); //当前选中的小时

            //跟新热力图或飞机图和折线图
            var cur_time = this.id.split("_");
            console.log('cur_time: ', cur_time);
            getTimeData(cur_time[0], cur_time[1], variable.WH_index, variable.type).then(function (data) {
                console.log('data: ', data);
                console.log('variable.WH_index: ', variable.WH_index);
                console.log('variable.type: ', variable.type);
                variable.chosen_data = data;
                variable.heat_data = data;

                console.log(' variable.type: ', variable.type);
                console.log('variable.WH_index: ', variable.WH_index);
                console.log('heat_plane: ', variable.heat_plane);
                if (variable.heat_plane == true)
                    mapView.Heatmap(data);
                else
                    PlaneView.DrawPlaneView(data);
                console.log('time wh cg data: ', data);
                options.AddOptions(data);
            });
            getTimeOnlyData(cur_time[0], cur_time[1]).then(function (data) {
                variable.chart_data = data;
                console.log('only time data: ', data);
                lineChart.drawLineChart(data)
            })
            console.log(" variable.chosen_data", variable.chosen_data);
        })
        //画Colorbar
        var defs = svgRect.append("defs");
        var linearGradient = defs.append("linearGradient")
            .attr("id", "linearColor")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
        var stop1 = linearGradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", minColor);
        var stop2 = linearGradient.append("stop")
            .attr("offset", "25%")
            .style("stop-color", "#5FFDDC");
        var stop3 = linearGradient.append("stop")
            .attr("offset", "50%")
            .style("stop-color", "#83FC40");
        var stop4 = linearGradient.append("stop")
            .attr("offset", "75%")
            .style("stop-color", "#F2F330");
        var stop5 = linearGradient.append("stop")
            .attr("offset", "100%")
            .style("stop-color", maxColor);
        var colorRect = svgRect.append("rect")
            .attr("x", colSpace * 1.05)
            .attr("y", 3 * rowSpace + 0.6 * rowSpace)
            .attr("width", 0.618 * 24 * colSpace)
            .attr("height", rowSpace / 3)
            .style("fill", "url(#" + linearGradient.attr("id") + ")");


        var defs_text_min = svgRect.append("text")
            .attr("font-size", 12)
            .attr("x", 425)
            .attr("y", 620)
            .text("渐变颜色条");

    }

    //根据时间和仓库和种类获取数据
    function getTimeData(day, hour, warehouse, type) {
        console.log("i am in ");
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/" + "day" + '/' + "hour" + '/' + warehouse + '/' + type + "/rectClick",
                data: {
                    day: day,
                    hour: hour,
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
    //只根据时间获取数据
    function getTimeOnlyData(day, hour) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/" + "day" + '/' + "hour" + "/rectClickTime",
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