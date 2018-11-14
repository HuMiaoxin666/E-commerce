var options = (function () {
    // var heat_plane = true; //为true时画热力图
    var WhStatus = "wh_5"; //判断当前被选中的仓库
    var CgStatus = "cg_1"; //判断当前被选中的种类的index字符串
    var WH_index = WhStatus[WhStatus.length - 1];; //初始化被选中的仓库（默认全选）
    var CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1; //被选中的物品种类index
    var cgName_arr = ["服饰鞋靴", "环球美食", "家居个护", "美容彩妆", "母婴用品", "营养保健", 'all']; //用于匹配物品种类的的数组
    var CG_name = '服饰鞋靴' //初始化被选中的物品种类名称（默认全选）
    variable.type = CG_name;
    variable.WH_index = WH_index;
    // 初始化状态

    $("#" + WhStatus).css({
        "color": "#2ebaed"
    });
    $("#" + CgStatus).css({

        "color": "#2ebaed"
    });
    //给热力图和飞机图添加点击事件
    $("#heatMap").click(function () {
        $("#" + this.id).attr("class", "nav-link active");
        $("#planeView").attr("class", "nav-link");
        variable.heat_plane = true;
        // mapView.getData(WH_index, CG_name).then(function (data) {
        //     mapView.Heatmap(data);
        // });
        if (variable.heat_plane == true)
            mapView.Heatmap(variable.heat_data);
        else
            PlaneView.DrawPlaneView(variable.chosen_data);

    })
    $("#planeView").click(function () {

        $("#" + this.id).attr("class", "nav-link active");
        $("#heatMap").attr("class", "nav-link");
        variable.heat_plane = false;
        // mapView.getData(WH_index, CG_name).then(function (data) {
        //     PlaneView.DrawPlaneView(data);
        // });
        if (variable.heat_plane == true)
            mapView.Heatmap(variable.heat_data);
        else
            PlaneView.DrawPlaneView(variable.chosen_data);
    })
    //读取数据库获取数据操作
    function GetData(WH_index, CG_name) {
        mapView.getData(WH_index, CG_name).then(function (data) {
            variable.chosen_data = data;
            op_data = data;
            variable.heat_data = data;
            console.log("Search data competion !");
            if (variable.heat_plane == true)
                mapView.Heatmap(data);
            else
                PlaneView.DrawPlaneView(data);
            AddOptions(data);
            rectView.DrawRectView(data);
        });
    }
    //添加仓库悬浮事件和点击事件
    //仓库全选
    // $("#all_wh").click(function () {
    //     for (var i = 1; i <= 6; i++)
    //         $("#wh_" + String(i)).css({
    //             "color": "rgb(121, 120, 120)",
    //           //  "background-color": "white"
    //         });
    //     $("#" + this.id).css({
    //         "color": "#2ebaed",
    //        // "background-color": "#F0F0F0"
    //     });
    //     WhStatus = '', WH_index = ''; //为空时代表全选
    //     GetData(WH_index, CG_name); //读取数据库并刷新页面
    // })
    // $("#all_wh").mouseover(function () {
    //     $("#" + this.id).css({
    //         "color": "#2ebaed",
    //        // "background-color": "#F0F0F0"
    //     });
    // });
    // $("#all_wh").mouseout(function () {
    //     if (WhStatus != this.id)
    //         $("#" + this.id).css({
    //             "color": "rgb(121, 120, 120)",
    //           //  "background-color": "white"
    //         });
    // });
    //选取仓库事件
    for (var i = 1; i <= 7; i++) {
        $("#wh_" + String(i)).click(function () {
            for (var i = 1; i <= 6; i++)
                $("#wh_" + String(i)).css({
                    "color": "rgb(121, 120, 120)"
                });
            $("#" + this.id).css({
                "color": "#2ebaed"
            });
            //更新当前选中的仓库
            WhStatus = ($("#" + this.id).css("color") == "rgb(46, 186, 237)") ? this.id : false;
            
            WH_index = WhStatus[WhStatus.length - 1];
            variable.WH_index = WH_index;

            console.log("Searching !")
            console.log('cgName_arr[CgStatus]: ', CG_index);
            console.log('WH_index: ', WH_index);
            GetData(WH_index, CG_name); //读取数据库并刷新页面
        });

        $("#wh_" + String(i)).mouseover(function () {
            $("#" + this.id).css({
                "color": "#2ebaed"
            });
        });
        $("#wh_" + String(i)).mouseout(function () {
            if (WhStatus != this.id)
                $("#" + this.id).css({
                    "color": "rgb(121, 120, 120)"
                });
        });
    }


    //添加物品种类悬浮事件
    //物品类别全选事件
    // $("#all_type").click(function () {
    //     for (var i = 1; i <= 7; i++)
    //         $("#cg_" + String(i)).css({
    //             "color": "rgb(121, 120, 120)",
    //           //  "background-color": "white"
    //         });
    //     $("#" + this.id).css({
    //         "color": "#2ebaed",
    //        // "background-color": "#F0F0F0"
    //     });
    //     CgStatus = '', CG_index = '', CG_name = ''; //为空时代表全选
    //     GetData(WH_index, CG_name); //读取数据库并刷新页面
    // })
    // $("#all_type").mouseover(function () {
    //     $("#" + this.id).css({
    //         "color": "#2ebaed",
    //        // "background-color": "#F0F0F0"
    //     });
    // });
    // $("#all_type").mouseout(function () {
    //     if (CgStatus != this.id)
    //         $("#" + this.id).css({
    //             "color": "rgb(121, 120, 120)",
    //           //  "background-color": "white"
    //         });
    // });
    //选取物品种类事件
    for (var i = 1; i <= 7; i++) {
        $("#cg_" + String(i)).click(function () {
            for (var j = 1; j <= 7; j++)
                $("#cg_" + String(j)).css({
                    "color": "rgb(121, 120, 120)"
                });
            $("#" + this.id).css({
                "color": "#2ebaed"
            });
            //更新当前选中的物品种类
            CgStatus = ($("#" + this.id).css("color") == "rgb(46, 186, 237)") ? this.id : false;
            CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1;
            CG_name = cgName_arr[CG_index];
            variable.type = CG_name;
            GetData(WH_index, CG_name); //读取数据库并刷新页面
        });

        $("#cg_" + String(i)).mouseover(function () {
            $("#" + this.id).css({
                "color": "#2ebaed"
            });
        });
        $("#cg_" + String(i)).mouseout(function () {
            if (CgStatus != this.id)
                $("#" + this.id).css({
                    "color": "rgb(121, 120, 120)"
                });
        });
    }
    //根据订单号和物品种类构建查找订单的请求
    function getorderInfor(orderNum, cgType) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/vis/" + orderNum + "/" + cgType + '/0' + "/orderInfor",
                data: {
                    orderNum: orderNum,
                    type: cgType
                },
                success: function (data) {
                    resolve(data);
                },
                error: function () {

                }
            });
        });
    }
    //添加订单下拉框元素
    function AddOptions(chosenData) {
        $("#orderNum").empty();
        for (var i = 0; i < chosenData.length; i++) {
            var options = $('<option>3</option>').text(chosenData[i]["order_no"]).attr("id", i);
            $("#orderNum").append(options);
        }
        //添加下拉框选中事件
        var cgId = ['id', 'warehouse', 'startTime', 'endTime', 'name', 'qty', 'address']
        $("#orderNum").on("click", function () {
            let cur_orderNum = $("#orderNum").find("option:selected").text();
            getorderInfor(cur_orderNum, CG_name).then(function (data) {
                console.log('CG_name: ', CG_name);
                console.log('cur_orderNum: ', cur_orderNum);
                let cur_orderInfor = data[0];
                console.log('cur_orderInfor: ', cur_orderInfor);
                for (var i = 0; i < cgId.length - 1; i++) {
                    $("#" + cgId[i]).val(cur_orderInfor[cgId[i]]);
                }
                var cur_address = cur_orderInfor['province'] + ' ' + cur_orderInfor['city'] + ' ' + cur_orderInfor['country'];
                $("#address").val(cur_address);
            })
        })
    }

    console.log('WH_index: ', WH_index);
    return {
        GetData: GetData,
        WH_index: WH_index,
        type: CG_name,
        AddOptions: AddOptions,
        // heat_plane: heat_plane,
    };
})();