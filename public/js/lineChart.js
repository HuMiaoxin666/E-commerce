var lineChart = (function () {
    function drawLineChart(chosenData) {
        let dom = document.getElementById("lineChart");
        let myChart = echarts.init(dom);
        let app = {};
        let wh_arr = ['杭州下沙'];
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
        // for(var i = 0; i< )
        option = null;
        option = {
            title: {},
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
                data: wh_arr
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
                data: type_arr
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '杭州下沙',
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
                data:typeCount_arr
            }]
        };;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
    return {
        drawLineChart: drawLineChart,
    }

})()