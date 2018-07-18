var options = (function () {
    var WhStatus = "wh_5"; //判断当前被选中的仓库
    var CgStatus = "cg_1"; //判断当前被选中的种类的index字符串
    var WH_index = WhStatus[WhStatus.length - 1];; //初始化被选中的仓库（默认全选）
    var CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1; //被选中的物品种类index
    var cgName_arr = ["服饰鞋靴", "环球美食", "家居个护", "美容彩妆", "母婴用品", "营养保健"]; //用于匹配物品种类的的数组
    var CG_name = cgName_arr[CG_index];; //初始化被选中的物品种类名称（默认全选）

    //读取数据库获取数据操作
    function GetData(WH_index, CG_name) {
        mapView.getChosenData(WH_index, CG_name).then(function (data) {
            console.log('data: ', data);
            // AddOptions(data);
            // mapView.Heatmap(data);
            // rectView.DrawRectView(data);
        });
    }

    //添加仓库悬浮事件和点击事件
    //仓库全选
    $("#all_wh").click(function () {
        for (var i = 1; i <= 6; i++)
            $("#wh_" + String(i)).css({
                "color": "black",
                "background-color": "white"
            });
        WhStatus = '', WH_index = ''; //为空时代表全选
        GetData(WH_index, CG_name); //读取数据库并刷新页面
    })
    //选取仓库事件
    for (var i = 1; i <= 6; i++) {
        $("#wh_" + String(i)).click(function () {
            for (var i = 1; i <= 6; i++)
                $("#wh_" + String(i)).css({
                    "color": "black",
                    "background-color": "white"
                });
            $("#" + this.id).css({
                "color": "#007bff",
                "background-color": "#E0E0E0"
            });
            //更新当前选中的仓库
            WhStatus = ($("#" + this.id).css("color") == "rgb(0, 123, 255)") ? this.id : false;
            WH_index = WhStatus[WhStatus.length - 1];

            console.log("Searching !")
            console.log('cgName_arr[CgStatus]: ', CG_index);
            console.log('WH_index: ', WH_index);
            GetData(WH_index, CG_name); //读取数据库并刷新页面
            console.log("Ok !")
        });

        $("#wh_" + String(i)).mouseover(function () {
            $("#" + this.id).css({
                "color": "#007bff",
                "background-color": "#E0E0E0"
            });
        });
        $("#wh_" + String(i)).mouseout(function () {
            if (WhStatus != this.id)
                $("#" + this.id).css({
                    "color": "black",
                    "background-color": "white"
                });
        });
    }


    //添加物品种类悬浮事件
    //物品类别全选事件
    $("#all_type").click(function () {
        for (var i = 1; i <= 6; i++)
            $("#cg_" + String(i)).css({
                "color": "black",
                "background-color": "white"
            });
        CgStatus = '', CG_index = '', CG_name = ''; //为空时代表全选
        GetData(WH_index, CG_name); //读取数据库并刷新页面
    })
    //选取物品种类事件
    for (var i = 1; i <= 6; i++) {
        $("#cg_" + String(i)).click(function () {
            for (var i = 1; i <= 6; i++)
                $("#cg_" + String(i)).css({
                    "color": "black",
                    "background-color": "white"
                });
            $("#" + this.id).css({
                "color": "#007bff",
                "background-color": "#E0E0E0"
            });
            //更新当前选中的物品种类
            CgStatus = ($("#" + this.id).css("color") == "rgb(0, 123, 255)") ? this.id : false;
            CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1;
            CG_name = cgName_arr[CG_index];
            GetData(WH_index, CG_name); //读取数据库并刷新页面
        });

        $("#cg_" + String(i)).mouseover(function () {
            $("#" + this.id).css({
                "color": "#007bff",
                "background-color": "#E0E0E0"
            });
        });
        $("#cg_" + String(i)).mouseout(function () {
            if (CgStatus != this.id)
                $("#" + this.id).css({
                    "color": "black",
                    "background-color": "white"
                });
        });
    }
    //构建查找订单的请求
    function getorderInfor(orderNum, cgType) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/" + orderNum + "/" + cgType + '/0' + "/orderInfor",
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
        GetData:GetData,
        WhStatus: WH_index,
        type: CG_name
    };
})();