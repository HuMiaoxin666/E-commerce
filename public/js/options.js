var options = (function () {
    var WhStatus = "wh_5"; //判断当前被选中的仓库
    var CgStatus = "cg_1"; //判断当前被选中的种类
    var WH_index = WhStatus[WhStatus.length - 1];
    var CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1;
    var cgName = ["服饰鞋靴", "环球美食", "家居个护", "美容彩妆", "母婴儿童", "营养保健"];
    //添加仓库悬浮事件和点击事件
    for (var i = 1; i <= 6; i++) {
        $("#wh_" + String(i)).click(function () {
            for (var i = 1; i <= 6; i++)
                $("#wh_" + String(i)).css("color", "black");
            $("#" + this.id).css("color", "rgb(0, 123, 255)");
            WhStatus = ($("#" + this.id).css("color") == "rgb(0, 123, 255)") ? this.id : false;
            console.log("Searching !")
            console.log('cgName[CgStatus]: ', CG_index);
            console.log('WhStatus: ', WH_index);
            mapView.getChosenData(WH_index, cgName[CG_index]).then(function (data) {
                AddOptions(data);
                console.log('data: ', data);
            });
            console.log("Ok !")
        });

        $("#wh_" + String(i)).mouseover(function () {
            $("#" + this.id).css("color", "#007bff");
        });
        $("#wh_" + String(i)).mouseout(function () {
            if (WhStatus != this.id)
                $("#" + this.id).css("color", "black");
        });
    }


    //添加物品种类悬浮事件

    for (var i = 1; i <= 6; i++) {
        $("#cg_" + String(i)).click(function () {
            for (var i = 1; i <= 6; i++)
                $("#cg_" + String(i)).css("color", "black");
            $("#" + this.id).css("color", "rgb(0, 123, 255)");
            CgStatus = ($("#" + this.id).css("color") == "rgb(0, 123, 255)") ? this.id : false;
            CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1;
            console.log(cgName[CG_index]);
            mapView.getChosenData(WH_index, cgName[CG_index]).then(function (data) {
                AddOptions(data);
                console.log('data: ', data);
            });
        });

        $("#cg_" + String(i)).mouseover(function () {
            $("#" + this.id).css("color", "rgb(0, 123, 255)");
        });
        $("#cg_" + String(i)).mouseout(function () {
            if (CgStatus != this.id)
                $("#" + this.id).css("color", "black");
        });
    }
    //添加订单下拉框元素
    function AddOptions(chosenData) {
        $("#orderNum").empty();
        for (var i = 0; i < chosenData.length; i++) {
            var options = $('<option>3</option>').text(chosenData[i]["order_no"]).attr("id",i);
            $("#orderNum").append(options);
        }
        //添加下拉框选中事件
        var cgId = ['id','warehouse','startTime','endTime','name','qty','address']
        $("#orderNum").on("click",function(){
            let cur_orderNum = $("#orderNum").find("option:selected").text();
            let cur_orderInfor;

            for (var i = 0; i < chosenData.length; i++) {
                console.log('chosenData[i].order_no: ', chosenData[0].order_no);
                if(chosenData[i].order_no == cur_orderNum){
                    
                    cur_orderInfor = chosenData[i];
                    console.log("yes");
                }
            }
            console.log('cur_orderInfor: ', cur_orderInfor);
            for(var i = 0; i < cgId.length -1; i++){
                $("#" + cgId[i]).val(cur_orderInfor[cgId[i]]);
            }
            var cur_address = cur_orderInfor['province'] + ' '+ cur_orderInfor['city']  +' '+cur_orderInfor['country'];
            $("#address").val(cur_address);
        })
    }
   

    return {
        WhStatus: WhStatus,
        CgStatus: CgStatus,
        type: cgName[CgStatus - 1]
    };
})();