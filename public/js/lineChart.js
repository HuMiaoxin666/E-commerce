var lineChart = (function () {
    drawLineChart();
    function drawLineChart(chosenData){
        var dom = document.getElementById("lineChart");
        var myChart = echarts.init(dom);
        var app = {};
        // //解析数据
        let warehouse_arr = [];
        let type_arr = [];
        let data_arr = [];
        // for(var i = 0; i< )
        option = null;
        option = {
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {
                        normal: {}
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
    return {
        drawLineChart: drawLineChart,
    }

})()