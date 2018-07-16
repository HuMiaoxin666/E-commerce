(function () {
    var svg = d3.select("#netSvg");
    var width = parseFloat(svg.style("width").split('px')[0]),
        height = parseFloat(svg.style("height").split('px')[0]);
    var maxDis = 250;
    var lineClicked = false;
    var curLine = undefined;
    var force = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
                return d.index
            })
            .distance(function (d) {
                return 200 - Math.pow(1.32, d.value);
            })
        )
        .force("charge", d3.forceManyBody().strength(-2000).distanceMin(0).distanceMax(maxDis))
        .alphaTarget(0.05)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY(0.001))
        .force("x", d3.forceX(0.001))

    function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.05).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0.05);
        d.fx = null;
        d.fy = null;
    }

    d3.json(options.rootPath + "netFlux.json", function (json) {
        d3.json(options.rootPath + "odInter.json", function (data) {
            d3.json(options.rootPath + 'odIn.json', (error, odInData) => {
                var valueRange = d3.extent(json.links, function (d) {
                    return d.value
                })

                var strokeScale = d3.scaleLinear()
                    .domain([valueRange[0] + 3.5, valueRange[1]])
                    .range([0, 15])

                force
                    .nodes(json.nodes)
                    .force("link").links(json.links)

                var link = svg.selectAll(".link")
                    .data(json.links)
                    .enter()

                    .append("line")
                    .style("stroke", options.fluxLineColor)
                    .style("stroke-width", function (d) {
                        return strokeScale(d.value)
                    })
                    .attr("id", function (d) {
                        return d.source.class + '-' + d.target.class;
                    })
                    .style("opacity", 0.3)
                    .style("cursor", "crosshair")
                    .style("stroke-linecap", "round")
                    .attr("class", "link")
                    .on("click", function (d) {
                        if (curLine !== undefined && this.id == curLine.id) {
                            svg.selectAll("circle").style("stroke", "none");
                            svg.selectAll("circle").style("stroke", "none");
                            d3.select("#map").selectAll(".hex").style("opacity", options.normal_opacity).style("stroke-width", 0.1);
                            odView.addLineInterClass(-1, -1, data);
                            curLine = undefined;
                        } else if (curLine !== this) {
                            svg.selectAll("circle").style("stroke", "none");
                            svg.selectAll("circle").style("stroke", "none");

                            svg.selectAll("[id='" + d.source.class + "']").style("stroke", "black").style("stroke-width", 2)
                            svg.selectAll("[id='" + d.target.class + "']").style("stroke", "black").style("stroke-width", 2)

                            d3.select("#map").selectAll(".hex").style("opacity", options.normal_opacity).style("stroke-width", 0.1)

                            d3.select("#map").selectAll("[id='" + d.source.class + "']").style("opacity", options.mouseover_opacity).style("stroke-width", 1)
                            d3.select("#map").selectAll("[id='" + d.target.class + "']").style("opacity", options.mouseover_opacity).style("stroke-width", 1)

                            let source = d.source.class;
                            let target = d.target.class;
                            odView.addLineInterClass(source, target, data);
                            curLine = this;
                        }

                        /*       if (lineClicked === false) {
                            lineClicked = true;
                            svg.selectAll("circle").style("stroke", "none");
                            svg.selectAll("circle").style("stroke", "none");

                            svg.selectAll("[id='" + d.source.class + "']").style("stroke", "black").style("stroke-width", 2)
                            svg.selectAll("[id='" + d.target.class + "']").style("stroke", "black").style("stroke-width", 2)

                            d3.select("#map").selectAll("[id='" + d.source.class + "']").style("opacity", options.mouseover_opacity).style("stroke-width", 1)
                            d3.select("#map").selectAll("[id='" + d.target.class + "']").style("opacity", options.mouseover_opacity).style("stroke-width", 1)

                            let source = d.source.class;
                            let target = d.target.class;
                            odView.addLineInterClass(source, target, data)
                        } else {
                            lineClicked = false;
                            svg.selectAll("circle").style("stroke", "none");
                            svg.selectAll("circle").style("stroke", "none");

                            d3.select("#map").selectAll("[id='" + d.source.class + "']").style("opacity", options.normal_opacity).style("stroke-width", 0.1)
                            d3.select("#map").selectAll("[id='" + d.target.class + "']").style("opacity", options.normal_opacity).style("stroke-width", 0.1)
                        }
 */
                    })
                    .on("mouseout", d => {
                        /* 
                                                lineClicked = false;
                                                svg.selectAll("circle").style("stroke", "none");
                                                svg.selectAll("circle").style("stroke", "none");

                                                d3.select("#map").selectAll("[id='" + d.source.class + "']").style("opacity", options.normal_opacity).style("stroke-width", 0.1)
                                                d3.select("#map").selectAll("[id='" + d.target.class + "']").style("opacity", options.normal_opacity).style("stroke-width", 0.1)
                         */
                    })

                var node = svg.selectAll(".node")
                    .data(json.nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));
                var nodeNumberRange = d3.extent(json.nodes, function (d) {
                    return d.number
                })
                var rScale = d3.scaleLinear()
                    .domain(nodeNumberRange)
                    .range([10, 22])

                node.append('circle')
                    .attr('r', function (d) {
                        return rScale(d.number)
                    })
                    .style('fill', function (d) {
                        return options.areaScale(d.class);
                    })
                    .style("stroke", "none")
                    .attr("id", function (d) {
                        return d.class
                    })
                    .on("click", function (d) {
                        d3.select(this).style("stroke", "black").style("stroke-width", 2)
                        odView.addLineInClass(d.class, odInData);
                        pieView.pieViewInClass(d.class);
                        d3.select("#map").selectAll("[id='" + d.class + "']").style("stroke-width", 1)
                            .style("opacity", options.mouseover_opacity);
                    })
                    .on("mouseout", function (d) {
                        if (options.curClass === -1) {
                            pieView.pieViewAll();
                        } else {
                            pieView.pieViewInClass(options.curClass);
                        }
                        d3.select(this).style("stroke", "none")
                        d3.select("#map").selectAll("[id='" + d.class + "']").style("stroke-width", 0.1)
                            .style("opacity", options.mouseover_opacity);
                        mapView.hideDiv();
                    })

                node.append("text")
                    .attr("dx", -18)
                    .attr("dy", 8)
                    .style("font-family", "overwatch")
                    .style("font-size", "18px")
                    .text(function (d) {
                        return d.name
                    });

                force.on("tick", function () {
                    link.attr("x1", function (d) {
                            return d.source.x;
                        })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });
                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                });
            });
        });
    })
})()