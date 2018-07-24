var PlaneView = (function () {
    function DrawPlaneView(chosenData) {
        console.log('chosenData: ', chosenData);

        let container = $("#map").find("canvas");
        container.remove();
        d3.csv("data/province_position.csv", function (xy_data) {
            var overlay = new L.echartsLayer3(mapView.map, echarts);
            var chartsContainer = overlay.getEchartsContainer();
            var myChart = overlay.initECharts(chartsContainer);
            let ProValue_arr = [],
                value_obj = {},
                timeDif_obj = {};
            xy_data.forEach(element => {
                value_obj[element.province] = 0;
                timeDif_obj[element.province] = 0;
                let curobj = {
                    province: element.province,
                    value: 0
                }
                ProValue_arr.push(curobj);
            })
            chosenData.forEach(element => {
                value_obj[element.province] += 1;
                timeDif_obj[element.province] += parseFloat(element.timeDif);
            })
            console.log('timeDif_obj: ', timeDif_obj);
            var max_value = 0;
            var maxAve_time = 0; //求最大平均推送时间差
            ProValue_arr.forEach(element => {
                element.value = value_obj[element.province];
                element.ave_time = timeDif_obj[element.province] / element.value;
                if (element.ave_time > maxAve_time)
                    maxAve_time = element.ave_time;
                if (element.value > max_value)
                    max_value = element.value;
            })
            console.log('maxAve_time: ', maxAve_time);
            console.log('max_value: ', max_value);
            //设置半径和飞机到达指定地点的时间比例尺
            var radiusScale = d3.scaleLinear().domain([0, max_value]).range([0, 20]);
            var timeScale = d3.scaleLinear().domain([0, maxAve_time]).range([0, 10]);
            console.log('ProValue_arr: ', ProValue_arr);
            //************数据处理*****************
            //将省份座位键值
            var geoCoordMap = new Object
            for (var i = 0; i < xy_data.length; i++) {
                var use = new Array
                use[0] = parseFloat(xy_data[i].x)
                use[1] = parseFloat(xy_data[i].y)
                geoCoordMap[xy_data[i].province] = use
            }
            geoCoordMap["下沙"] = [120.357546, 30.319716]
            //console.log(geoCoordMap)
            //根据事件来分组数据
            var wh_5 = new Array;
            var xiashacang = {
                name: "下沙"
            }
            var n1 = 0;
            for (var i = 0; i < ProValue_arr.length; i++) {
                if (ProValue_arr[i].value > 0) {
                    var use1 = new Object;
                    use1["name"] = ProValue_arr[i].province;
                    use1["value"] = ProValue_arr[i].value;
                    use1["ave_time"] = ProValue_arr[i].ave_time;
                    wh_5[n1] = [xiashacang, use1];
                    n1++;
                }
            }
            console.log('wh_5: ', wh_5);
            var test = [];
            for (var i = 0; i < ProValue_arr.length; i++) {
                test.push(i);
            }
            //var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
            var planePath =
                'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[0].name];
                    var toCoord = geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord
                        }, {
                            coord: toCoord
                        }, dataItem[1].ave_time]);
                    }
                }
                return res;
            };
            var color = ['#FE7787']; //配置颜色
            var series = [];
            [
                ['下沙仓', wh_5]
            ].forEach(function (item, i) { //&&与后方标记处相匹配
                series.push({
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#A0B1FF',
                        symbolSize: 2 //球大小
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                }, {
                    name: item[0],
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6, //特效动画的时间，单位为 s。
                        trailLength: 0,
                        color: "#6079FF", //飞机颜色
                        symbol: planePath, //飞行物
                        symbolSize: 10 //飞机大小
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            opacity: 0.1,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                }, {
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function (val) {
                        return radiusScale(val[2]);
                    },
                    itemStyle: {
                        normal: {
                            color: '#FE7787'
                        }
                    },
                    data: item[1].map(function (dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([
                                dataItem[1].value,
                                dataItem[1].ave_time
                            ])
                        };
                    })
                });
            });

            option = {
                title: {},
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data: ['下沙仓'], //&&与前方标记处相匹配
                    textStyle: {
                        color: 'black'
                    },
                    selectedMode: 'single'
                },
                geo: {
                    map: '',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series: series
            };
            // 使用刚指定的配置项和数据显示图表。
            overlay.setOption(option);
            $(".leaflet-bottom.leaflet-right").remove();
        });
    }
    return {
        DrawPlaneView: DrawPlaneView,
    }
})()