var options = (function () {
    var WhStatus = "wh_5";//判断当前被选中的仓库
    var CgStatus = "cg_1";//判断当前被选中的种类
    var WH_index = WhStatus[WhStatus.length-1];
    var CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1;
    var cgName = ["服饰鞋靴","环球美食","家居个护","美容彩妆","母婴儿童","营养保健"];
    //添加仓库悬浮事件和点击事件
    for (var i = 1; i <= 6; i++) {
        $("#wh_" + String(i)).click(function () {
            for (var i = 1; i <=6; i++)
                $("#wh_" + String(i)).css("color", "black");
            $("#" + this.id).css("color", "rgb(0, 123, 255)");
            WhStatus = ($("#" + this.id).css("color") == "rgb(0, 123, 255)") ? this.id : false;
            console.log("Searching !")
            console.log('cgName[CgStatus]: ', CG_index);
            console.log('WhStatus: ', WH_index);
            mapView.getChosenData(WH_index, cgName[CG_index]).then(function(data){
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
            for (var i = 1; i <=6; i++)
                $("#cg_" + String(i)).css("color", "black");
            $("#" + this.id).css("color", "rgb(0, 123, 255)");
            CgStatus = ($("#" + this.id).css("color") == "rgb(0, 123, 255)") ? this.id : false;
            CG_index = parseInt(CgStatus[CgStatus.length - 1]) - 1;
            console.log(cgName[CG_index]);
            mapView.getChosenData(WH_index, cgName[CG_index]).then(function(data){
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

    var warehouse = '5';
    var type = '浙江省';
    return {
        WhStatus:WhStatus,
        CgStatus:CgStatus,
        warehouse: warehouse,
        type: cgName[CgStatus - 1]
    };
})();