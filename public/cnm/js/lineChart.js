var lineChart = (function () {
    function drawLineChart(chosenData) {
        let dom = document.getElementById("lineChart");
        let myChart = echarts.init(dom);
        // let app = {};
        let wh_arr = ['杭州下沙仓'];
        let type_arr = ["服饰鞋靴", "环球美食", "家居个护", "美容彩妆", "母婴用品", "营养保健"];
        let typeIndex_dict = {};
        let index = 0;
        var typeCount_arr = [];
        type_arr.forEach(function (d) {
            typeIndex_dict[d] = index;
            typeCount_arr.push(0);
            index += 1;
        })
        chosenData.forEach(element => {
            let cur_type = element.type;
            typeCount_arr[typeIndex_dict[cur_type]] += 1;

        });
        console.log('typeCount_arr: ', typeCount_arr);
        option = {
            color: ['#95ccd9', '#2f4554', '#c23531', "black", "red"],
            title: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#FFB76D'
                    }
                }
            },
            legend: {
                data: wh_arr
            },
            toolbox: {
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: type_arr
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '杭州下沙仓',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color:"red",
                    }
                },
                areaStyle: {
                    normal: {}
                },
                data: typeCount_arr
            }]
        };
        // option = {
        //     color:['#95ccd9','#2f4554', '#c23531',"black","red"],
        //     tooltip : {
        //         trigger: 'axis'
        //     },
        //     legend: {
        //         data:wh_arr
        //     },
        //     toolbox: {
        //         show : true,
        //         orient: 'vertical',
        //         right: 'right',
        //         feature : {
        //             mark : {show: true},
        //             dataView : {show: true, readOnly: false},
        //             magicType : {show: true, type: ['line', 'bar']},
        //             restore : {show: true},
        //             saveAsImage : {show: true}
        //         },
        //         iconStyle: {
        //             normal: {
        //                 color: '#bed5ff'
        //             }
        //         }
        //     },
        //     calculable : true,
        //     xAxis : [
        //         {
        //             type : 'category',
        //             data : ["服饰鞋靴", "环球美食", "家居个护", "美容彩妆", "母婴用品", "营养保健"]
        //         }, {
        //             type : 'category',
        //             axisLine: {show:false},
        //             axisTick: {show:true},
        //             axisLabel: {show:false},
        //             splitArea: {show:false},
        //             splitLine: {show:false},
        //             data : ['Line','Bar','Scatter','K','Map']
        //         }
        //     ],
        //     yAxis : [
        //         {
        //             type : 'value'
        //         }
        //     ],
        //     series : [
        //         {
        //             name:'杭州下沙仓',
        //             type:'bar',
        //             smooth:true,
        //             itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //             data:typeCount_arr
        //         }
        //     ]
        // };
        /*
        option = {
            title : {
                text: '某地区蒸发量和降水量',
                subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['蒸发量']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'蒸发量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                   itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                ];
                                return colorList[params.dataIndex]
                            },label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}\n{c}'
                            }
                        }
                    }
                }
            ]
        };   */
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option, true);

    }
    return {
        drawLineChart: drawLineChart,
    }
})()