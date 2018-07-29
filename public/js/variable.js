var variable = (function () {
    var heat_data;//热力图数据
    var part_all = true; 
    var heat_plane = true;
    var chosen_data;//所选中的数据
    var chart_data;//表格所需数据
    return {
        heat_data:heat_data,
        part_all:part_all,
        heat_plane: heat_plane,
        chosen_data:chosen_data,
        chart_data:chart_data,
    }
})()