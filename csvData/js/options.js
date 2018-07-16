var options = (function () {
    var clusterNumber = d3.select("#container-main").attr("clusterNumber");
    var status = d3.select("#container-main").attr("status");
    console.log('status: ', status);
    var rootPath =
        "data/drawData/" + clusterNumber.toString() + "/" + status + "/";
    var areaScale = d3
        .scaleOrdinal()
        .domain([])
        .range([
            "#8C8B8B",
            "#D7EFA1",
            "#DAFF00",
            "#4daf4a",
            "#80428A",
            "#ff7f00",
            "#FF0000",
            "#a65628",
            "#f781bf",
            "#8400E8",
            "#e41a1c",
            "#984ea3",
            "#f4cae4",
            "#e7298a"
        ]);
    if (clusterNumber > 15) {
        var areaScale = d3.scale.category20();
    }
    var globalFlag = true;
    var curClass = -1;
    $(function () {
        $("input").checkboxradio();
        $("#radio-1").on("click", e => {
            $("input").prop("checked", false);
            window.location.href = clusterNumber + "?status=-1";
        });
        $("#radio-2").on("click", e => {
            $("input").prop("checked", false);
            window.location.href = clusterNumber + "?status=1";
        });
        $("#radio-3").on("click", e => {
            $("input").prop("checked", false);
            window.location.href = clusterNumber + "?status=0";
        });
    });

    if (status == -1) {
        $("#radio-1").prop("checked", true);
    } else if (status == 1) {
        $("#radio-2").prop("checked", true);
    } else if (status == 0) {
        $("#radio-3").prop("checked", true);
    }

    var svg = d3.select("#headingSvg");
    var width = parseFloat(svg.style("width").split("px")[0]),
        height = parseFloat(svg.style("height").split("px")[0]);
    for (var i = 0; i < clusterNumber; i++) {
        svg
            .append("circle")
            .attr("cx", width - 13 - 26 * i)
            .attr("cy", height / 2)
            .attr("r", 10)
            .style("fill", areaScale(i));
    }
    var classScale = d3.scale.category20();
    return {
        rootPath: rootPath,
        clusterNumber: clusterNumber,
        status: status,
        normal_opacity: 0.6,
        mouseover_opacity: 0.75,
        suspending_outer_color: "#D6BD3E",
        suspending_inner_color: "#CEDDE8",
        pieview_colorscale: d3.interpolateYlGnBu,
        areaScale: areaScale,
        classScale: classScale,
        forceLineColor: "#D4D4D4",
        odLineOpacity: 0.5,
        odLineColor: "0x00D3FF",
        fluxLineColor: "#D6D5D3",
        globalFlag: globalFlag,
        curClass: curClass
    };
})();