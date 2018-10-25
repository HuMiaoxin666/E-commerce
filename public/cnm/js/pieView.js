var pieView = (function () {
    var svg = d3.select("#pieSvg");
    var width = parseFloat(svg.style("width").split('px')[0]),
        height = parseFloat(svg.style("height").split('px')[0]);

    var minRadius = d3.min([width, height]) / 2 / 3;
    var maxRadius = d3.min([width, height]) / 2 * (9 / 10);
    var tierRadius = (maxRadius - minRadius) / 8;

    var a = options.pieview_colorscale(0); //红色  
    var b = options.pieview_colorscale(1); //绿色  
    var compute = d3.interpolate(a, b);

    var defs = svg.append("defs");

    var linearGradient = defs.append("linearGradient")
        .attr("id", "linearColor")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "0%")
        .attr("y2", "0%");

    var stop1 = linearGradient.append("stop")
        .attr("offset", "0%")
        .style("stop-color", a.toString());

    var stop2 = linearGradient.append("stop")
        .attr("offset", "100%")
        .style("stop-color", b.toString());

    var colorRect = svg.append("rect")
        .attr("x", 13)
        .attr("y", 276)
        .attr("width", 20)
        .attr("height", 140)
        .style("fill", "url(#" + linearGradient.attr("id") + ")");

    svg.append("text")
        .attr("x", 10.5)
        .attr("y", 273)
        .text("Max")

    svg.append("text")
        .attr("x", 10.5)
        .attr("y", 430)
        .text("Min")

    var curClass = undefined,
        curRow = undefined,
        curCol = undefined;

    var arc = d3
        .arc()
        .startAngle(function (d) {
            return d.startAngle;
        })
        .endAngle(function (d) {
            return d.endAngle;
        })
        .innerRadius(function (d) {
            return d.innerRadius;
        })
        .outerRadius(function (d) {
            return d.outerRadius;
        });
    var flArcsG = svg.append("g").attr("class", "arcG");
    flArcsG.attr("transform", "translate(" + (width / 2) + ',' + (height / 2 + 15) + ')');

    var flInfoG = svg.append("g").attr("class", "arcInfoG");
    $(function () {
        $(".controlgroup-vertical").controlgroup({
            "direction": "vertical"
        });
        $("#globalStatus").on("click", function (e) {
            if (options.globalFlag === false) {
                options.globalFlag = true;
                pieViewInClass(options.curClass, curRow, curRow);
            }
        })
        $("#localStatus").on("click", function (e) {
            if (options.globalFlag === true) {
                options.globalFlag = false;
                pieViewInClass(options.curClass, curRow, curRow);
            }
        })
    });

    function pieViewInClass(classId, row, col) {
        flArcsG.selectAll(".path").remove();
        flInfoG.selectAll(".valueText").remove();
        if (row !== undefined && col !== undefined) {
            classId = undefined;
        }
        if (row === undefined && col === undefined) {
            curClass = classId;
            curRow = undefined;
            curCol = undefined;
            if (options.globalFlag === true) {
                var filePath = options.rootPath + 'classPieDataGlobal.json';
            } else {
                var filePath = options.rootPath + 'classPieDataLocal.json';
            }
        } else if (classId === undefined) {
            curClass = undefined;
            curRow = row;
            curCol = col;
            if (options.globalFlag === true) {
                var filePath = options.rootPath + 'eachPieDataGlobal/' + row + '_' + col + '.json';
            } else {
                var filePath = options.rootPath + 'eachPieDataLocal/' + row + '_' + col + '.json';
            }
        }
        d3.json(filePath, function (classPieData) {
            if (classId !== undefined) {
                var volumeData = classPieData[classId].pieData;
                var minFlux = classPieData[classId].min;
                var maxFlux = classPieData[classId].max;
            } else if (classId === undefined) {
                var volumeData = classPieData.pieData;
                var minFlux = 0;
                var maxFlux = classPieData.max;
            }

            var fluxExtent = ([minFlux, maxFlux]);

            var fluxScale = d3.scaleLinear()
                .domain(fluxExtent)
                .range([0, 1]);

            var arcArray = [];
            for (var i = 0; i < volumeData.length; i++) {
                for (var j = 0; j < volumeData[i].length; j++) {
                    var thisArc = new Object();
                    thisArc.value = volumeData[i][j];
                    thisArc.startAngle = 2 * Math.PI / 24 * j;
                    thisArc.endAngle = 2 * Math.PI / 24 * (j + 1);
                    thisArc.innerRadius = minRadius + i * tierRadius;
                    thisArc.outerRadius = minRadius + (i + 1) * tierRadius;
                    arcArray.push(thisArc);
                }
            }

            var dayLabel = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            let xOff = 20;
            let yOff = 45;
            let hourOff = 20;
            var valueTextText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2 - xOff)
                .attr("y", height / 2 + yOff)
                .attr("text-anchor", "middle")

            var valueText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2 + 18)
                .attr("y", height / 2 + yOff)
                .attr("text-anchor", "middle")

            var dayText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2)
                .attr("y", height / 2 + yOff - 40)
                .attr("text-anchor", "middle")
            var hourText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2)
                .attr("y", height / 2 + hourOff)
                .attr("text-anchor", "middle")

            var fl = flArcsG
                .selectAll(".path")
                .data(arcArray)
                .enter()
                .append("path")
                .attr("d", arc)
                .style("stroke", "steelblue")
                .style("stroke-width", "0.2px")
                .style("fill", function (d) {
                    return options.pieview_colorscale(fluxScale(d.value));

                })
                .on("mouseover", function (d, i) {
                    valueText.text((d.value).toFixed(2))
                    valueTextText.text("value:")
                    //
                    dayText.text(dayLabel[parseInt(i / 24)]);
                    hourText.text(convert_to_ampm(parseInt(i % 24)));
                })
        })
    }

    function pieViewAll() {
        d3.json(options.rootPath + 'pieData.json', function (volumeData) {
            var minFlux = d3.min(volumeData, function (d) {
                return d3.min(d);
            })
            var maxFlux = d3.max(volumeData, function (d) {
                return d3.max(d);
            })
            var fluxExtent = ([minFlux, maxFlux]);

            var fluxScale = d3.scaleLinear()
                .domain(fluxExtent)
                .range([0, 1]);

            var arcArray = [];
            for (var i = 0; i < volumeData.length; i++) {
                for (var j = 0; j < volumeData[i].length; j++) {
                    var thisArc = new Object();
                    thisArc.value = volumeData[i][j];
                    thisArc.startAngle = 2 * Math.PI / 24 * j;
                    thisArc.endAngle = 2 * Math.PI / 24 * (j + 1);
                    thisArc.innerRadius = minRadius + i * tierRadius;
                    thisArc.outerRadius = minRadius + (i + 1) * tierRadius;
                    arcArray.push(thisArc);
                }
            }

            let xOff = 20;
            let yOff = 45;
            let hourOff = 20;
            var valueTextText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2 - xOff)
                .attr("y", height / 2 + yOff)
                .attr("text-anchor", "middle")

            var valueText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2 + 18)
                .attr("y", height / 2 + yOff)
                .attr("text-anchor", "middle")

            var dayText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2)
                .attr("y", height / 2 + yOff - 40)
                .attr("text-anchor", "middle")
            var hourText = flInfoG.append("text").attr("class", "valueText")
                .attr("x", width / 2)
                .attr("y", height / 2 + hourOff)
                .attr("text-anchor", "middle")

            var dayLabel = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            var fl = flArcsG
                .selectAll(".path")
                .data(arcArray)
                .enter()
                .append("path")
                .attr("d", arc)
                .style("stroke", "steelblue")
                .style("stroke-width", "0.2px")
                .style("fill", function (d) {
                    return options.pieview_colorscale(fluxScale(d.value));

                })
                .on("mouseover", function (d, i) {
                    valueText.text(d.value)
                    valueTextText.text("value:")
                    //
                    dayText.text(dayLabel[parseInt(i / 24)]);
                    hourText.text(convert_to_ampm(parseInt(i % 24)));
                })
        })
    }

    pieViewAll();

    var day_labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var label_rad = 106;
    var rad_offset = tierRadius;
    for (var i = 0; i < 7; i++) {
        label = day_labels[i];
        label_angle = 4.73;
        //position
        flInfoG
            .append("def")
            .append("path")
            .attr("id", "day_path" + i)
            .attr(
                "d",
                "M" + (width / 2) + " " + (height / 2 + 47) + " m" +
                label_rad * Math.cos(label_angle) +
                " " +
                label_rad * Math.sin(label_angle) +
                "H" + " " + (width / 2) + " " + "323"
            );
        flInfoG
            .append("text")
            .attr("font-size", "12px")
            .append("textPath")
            .attr("xlink:href", "#day_path" + i)
            .text(label);
        label_rad += rad_offset;
    }

    label_rad = minRadius + tierRadius * 7 + 5;


    //circular 24 hour position
    flInfoG
        .append("def")
        .append("path")
        .attr("id", "time_path")
        .attr(
            "d",
            "M" + (width / 2) + " " + 50 + " a" + label_rad + " " + label_rad + " 0 1 1 -1 0"
        );

    for (var i = 0; i < 24; i++) {
        label_angle = (i - 6) * (2 * Math.PI / 24);
        large_arc = i < 6 || i > 18 ? 0 : 1;
        flInfoG
            .append("text")
            .append("textPath")
            .attr("font-size", "12px")
            .style("color", "black")
            .style("font-weight", "bold")
            .attr("xlink:href", "#time_path")
            .attr("startOffset", i * 100 / 24 + "%")
            .text(i);
    }

    function convert_to_ampm(h) {
        if (h == "0" || h == "24") return "Midnight";
        var suffix = "am";
        if (h > 11) suffix = "pm";
        if (h > 12) return h - 12 + suffix;
        else return h + suffix;
    }


    return {
        pieViewInClass: pieViewInClass,
        pieViewAll: pieViewAll,
    }
})();