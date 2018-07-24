var PlaneView = (function () {

    var map = L.map('map');
    var osmUrl =
        'https://api.mapbox.com/styles/v1/keypro/cjjibvxa20ljx2slnphxjle4b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V5cHJvIiwiYSI6ImNqamliaTJtbjV0YTMzcG82bmthdW03OHEifQ.UBWsyfRiWMYly4gIc2H7cQ';
    layerMap =
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
    L.tileLayer(osmUrl, {

        minZoom: 1,
        maxZoom: 17,
        attribution: layerMap
    }).addTo(map);
    map.setView(L.latLng(37.550339, 104.114129), 4);

    function DrawPlaneView(chosenData) {
            d3.csv("data/province_position.csv", function (xy_data) {

                var overlay = new L.echartsLayer3(map, echarts);

                var chartsContainer = overlay.getEchartsContainer();

                var myChart = overlay.initECharts(chartsContainer);

                let ProValue_arr = [],
                    value_obj = {};
                xy_data.forEach(element => {
                    value_obj[element.province] = 0;
                    let curobj = {
                        province: element.province,
                        value: 0
                    }
                    ProValue_arr.push(curobj);
                })
                chosenData.forEach(element => {
                    value_obj[element.province] += 1;
                })
                var all = 0;
                ProValue_arr.forEach(element => {
                    element.value = value_obj[element.province];
                    all+=element.value;
                })
                console.log('all: ', all);
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
                var n1 = 0
                for (var i = 0; i < ProValue_arr.length; i++) {
                    var use1 = new Object;
                    use1["name"] = ProValue_arr[i].province;
                    use1["value"] = ProValue_arr[i].value;
                    wh_5[n1] = [xiashacang, use1];
                    n1++;
                }

                //console.log(wh_5)

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
                            }]);
                        }
                    }
                    return res;
                };

                var color = ['#FE1E00', '#FFC100', '#08FB00']; //配置颜色
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
                            color: '#fff',
                            symbolSize: 1 //球大小
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
                            color: "#D6D1EA", //飞机颜色
                            symbol: planePath, //飞行物
                            symbolSize: 7 //飞机大小
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
                            return val[2] / 70;
                        },
                        itemStyle: {
                            normal: {
                                color: color[i]
                            }
                        },
                        data: item[1].map(function (dataItem) {
                            return {
                                name: dataItem[1].name,
                                value: geoCoordMap[dataItem[1].name].concat([
                                    dataItem[1].value
                                ])
                            };
                        })
                    });
                });

                option = {
                    title: {
                        text: '动态订单地图',
                        subtext: '海仓科技',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data: ['下沙仓20150421', '下沙仓20150422', '下沙仓20150423'], //&&与前方标记处相匹配
                        textStyle: {
                            color: '#fff'
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