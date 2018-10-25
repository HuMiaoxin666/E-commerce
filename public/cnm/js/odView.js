var odView = (function () {
    var canvas = d3.select("#odCanvas");
    var width = parseFloat(canvas.style("width").split('px')[0]),
        height = parseFloat(canvas.style("height").split('px')[0]);

    var margin = {
        left: 20,
        right: 20,
        top: height * 0.5
    };

    const SEC = 12;
    var timeScale = d3.scaleLinear()
        .domain([0, 1440])
        .range([margin.left, width - margin.left - margin.right])
    var axis = d3.axisBottom(timeScale);
    var axisXSacle = d3.scaleLinear()
        .domain([0, 1440])
        .range([margin.left + 0.5 * margin.left, (width - margin.right)]);

    var axisXSacleBottom = d3.scaleLinear()
        .domain([0, 1440])
        .range([(width - margin.right), margin.left + 0.5 * margin.left]);

    var axisWidth = width - margin.right - margin.left - 0.5 * margin.left;

    var stage = new PIXI.Container(); 
    var ScatterPlotGraphics = new PIXI.Graphics() 
    stage.addChild(ScatterPlotGraphics); 
    var lineCanvas = document.getElementById("odCanvas"); 
    //定义渲染器渲染在canvas上
    var renderer = PIXI.autoDetectRenderer(width, height, {
        view: lineCanvas,
        forceFXAA: false,
        antialias: true,
        transparent: !0,
        resolution: 1,
    });
    //将渲染器添加到dom节点上
    document.getElementById("odView").appendChild(renderer.view);
    //range X:transform + margin
    /* svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(axis); */

    stage.removeChildren(1, 53);

    //add axisLine
    ScatterPlotGraphics.lineStyle(1, 0x000000, 1)

    var axisPadding = 3;
    ScatterPlotGraphics.moveTo(margin.left + 0.5 * margin.left, margin.top - (SEC - axisPadding));
    ScatterPlotGraphics.lineTo(width - margin.right, margin.top - (SEC - axisPadding));

    ScatterPlotGraphics.moveTo(margin.left + 0.5 * margin.left, margin.top + (SEC - axisPadding));
    ScatterPlotGraphics.lineTo(width - margin.right, margin.top + (SEC - axisPadding));

    for (var i = 0; i <= 24; i++) {
        let x = (margin.left + 0.5 * margin.left) + (axisWidth / 24) * i;
        let y = margin.top - (SEC - axisPadding);
        ScatterPlotGraphics.beginFill(0x000000);
        ScatterPlotGraphics.drawCircle(x, y, 1)
        ScatterPlotGraphics.endFill();
        var text = new PIXI.Text(i, {
            fontFamily: 'Arial',
            fontSize: 10,
            fill: 0x000000,
            align: 'start',
            fontWeight: 'bold'
        });
        text.x = x - 4;
        text.y = margin.top - 8;
        stage.addChild(text); //将显示精灵添加进显示容器  
    }
    for (var i = 0; i <= 24; i++) {
        let x = (margin.left + 0.5 * margin.left) + (axisWidth / 24) * i;
        let y = margin.top + (SEC - axisPadding);
        ScatterPlotGraphics.beginFill(0x000000);
        ScatterPlotGraphics.drawCircle(x, y, 1)
        ScatterPlotGraphics.endFill();
    }
    renderer.render(stage);

    function addLineInClassOnCanvas(classId, data) {

        ScatterPlotGraphics.clear();

        //add text

        stage.removeChildren(1, 53);

        //add axisLine
        ScatterPlotGraphics.lineStyle(1, 0x000000, 1)

        var axisPadding = 3;
        ScatterPlotGraphics.moveTo(margin.left + 0.5 * margin.left, margin.top - (SEC - axisPadding));
        ScatterPlotGraphics.lineTo(width - margin.right, margin.top - (SEC - axisPadding));

        ScatterPlotGraphics.moveTo(margin.left + 0.5 * margin.left, margin.top + (SEC - axisPadding));
        ScatterPlotGraphics.lineTo(width - margin.right, margin.top + (SEC - axisPadding));

        for (var i = 0; i <= 24; i++) {
            let x = (margin.left + 0.5 * margin.left) + (axisWidth / 24) * i;
            let y = margin.top - (SEC - axisPadding);
            ScatterPlotGraphics.beginFill(0x000000);
            ScatterPlotGraphics.drawCircle(x, y, 1)
            ScatterPlotGraphics.endFill();
            var text = new PIXI.Text(i, {
                fontFamily: 'Arial',
                fontSize: 10,
                fill: 0x000000,
                align: 'start',
                fontWeight: 'bold'
            });
            text.x = x - 4;
            text.y = margin.top - 8;
            stage.addChild(text); //将显示精灵添加进显示容器  
        }
        for (var i = 0; i <= 24; i++) {
            let x = (margin.left + 0.5 * margin.left) + (axisWidth / 24) * i;
            let y = margin.top + (SEC - axisPadding);
            ScatterPlotGraphics.beginFill(0x000000);
            ScatterPlotGraphics.drawCircle(x, y, 1)
            ScatterPlotGraphics.endFill();
        }
        
        if (classId === -1) {
            renderer.render(stage);
            return;
        }

        ScatterPlotGraphics.lineStyle(1, options.odLineColor, options.odLineOpacity)


        //ScatterPlotGraphics.lineStyle(1, options.areaScale(classId).replace("#","0x"), options.odLineOpacity)
        if (classId !== undefined) {
            var odDrawData = data[classId].od;
        } else {
            var odDrawData = data;
        }
        odDrawData = odDrawData.sort((a, b) => {
            return (a[1] - a[0]) - (b[1] - b[0]);
        })


        var sourceY = margin.top - SEC;
        var targetY = margin.top + SEC;
        var minHeight = 10;
        var controlPointYScale = d3.scaleLinear()
            .domain([0, width - margin.left - margin.right])
            .range([sourceY - minHeight, sourceY - 2 * margin.top])

        var controlPointYScaleBottom = d3.scaleLinear()
            .domain([0, width - margin.left - margin.right])
            .range([targetY + minHeight, sourceY + 2 * margin.top])



        for (var j = 0; j < odDrawData.length / 2; j++) {
            let source = axisXSacle(odDrawData[j][0]),
                target = axisXSacle(odDrawData[j][1]);
            //此时的source,target代表轴上的坐标,坐标原点是左上角（0,0）
            let diffLength = target - source;
            let controlPointY = controlPointYScale(diffLength);
            ScatterPlotGraphics.moveTo(source, sourceY);
            ScatterPlotGraphics.quadraticCurveTo(((source + target) / 2), controlPointY, target, sourceY);
        }
        for (var j = parseInt(odDrawData.length / 2); j < odDrawData.length; j++) {
            let source = axisXSacle(odDrawData[j][0]),
                target = axisXSacle(odDrawData[j][1]);
            //此时的source,target代表轴上的坐标,坐标原点是左上角（0,0）
            let diffLength = target - source;
            let controlPointY = controlPointYScaleBottom(diffLength);
            ScatterPlotGraphics.moveTo(source, targetY);
            ScatterPlotGraphics.quadraticCurveTo(((source + target) / 2), controlPointY, target, targetY);
        }
        ScatterPlotGraphics.x = 0;
        ScatterPlotGraphics.y = 0;
        renderer.render(stage);
    }

    function addLineInterClassOnCanvas(sourceClassId, targetClassId, data) {
        var drawData = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].direc.indexOf(sourceClassId) != -1 && data[i].direc.indexOf(targetClassId) != -1) {
                drawData.push(data[i])
            }
        }
        //add text
        stage.removeChildren(1, 53);

        const SEC = 25;
        ScatterPlotGraphics.clear();

        var sourceY = margin.top - SEC;
        var targetY = margin.top + SEC;
        var axisPadding = 3;
        var minHeight = 10;
        var controlPointYScale = d3.scaleLinear()
            .domain([0, width - margin.left - margin.right])
            .range([sourceY - minHeight, sourceY - 1.6 * margin.top])

        var controlPointYScaleBottom = d3.scaleLinear()
            .domain([0, width - margin.left - margin.right])
            .range([targetY + minHeight, sourceY + 1.6 * margin.top])

        let extraLength = 10;
        ScatterPlotGraphics.lineStyle(1, 0x000000, options.odLineOpacity)

        //axis and arrow for top
        ScatterPlotGraphics.moveTo(margin.left + 0.5 * margin.left, sourceY + axisPadding);
        ScatterPlotGraphics.lineTo(width - margin.right + extraLength, sourceY + axisPadding);

        ScatterPlotGraphics.moveTo(width - margin.right + extraLength, sourceY + axisPadding);
        ScatterPlotGraphics.lineTo(width - margin.right + extraLength - 5, sourceY - 5 + axisPadding);

        for (var i = 0; i <= 24; i++) {
            let x = (margin.left + 0.5 * margin.left) + (axisWidth / 24) * i;
            let y = sourceY + axisPadding;
            ScatterPlotGraphics.beginFill(0x000000);
            ScatterPlotGraphics.drawCircle(x, y, 1)
            ScatterPlotGraphics.endFill();

            var text = new PIXI.Text(i, {
                fontFamily: 'Arial',
                fontSize: 10,
                fill: 0x000000,
                align: 'start',
                fontWeight: 'bold'
            });
            text.x = x - 4;
            text.y = margin.top - 19;
            stage.addChild(text); //将显示精灵添加进显示容器  

            var text = new PIXI.Text(24 - i, {
                fontFamily: 'Arial',
                fontSize: 10,
                fill: 0x000000,
                align: 'start',
                fontWeight: 'bold'
            });
            text.x = x - 4;
            text.y = margin.top + 6;
            stage.addChild(text); //将显示精灵添加进显示容器  


        }


        //axis and arrow for bottom
        ScatterPlotGraphics.moveTo(margin.left + 0.5 * margin.left - extraLength, targetY - axisPadding);
        ScatterPlotGraphics.lineTo(width - margin.right, targetY - axisPadding);

        ScatterPlotGraphics.moveTo(margin.left + 0.5 * margin.left - extraLength, targetY - axisPadding);
        ScatterPlotGraphics.lineTo(margin.left + 0.5 * margin.left - extraLength + 5, targetY + 5 - axisPadding);

        for (var i = 0; i <= 24; i++) {
            let x = (margin.left + 0.5 * margin.left) + (axisWidth / 24) * i;
            let y = targetY - axisPadding;
            ScatterPlotGraphics.beginFill(0x000000);
            ScatterPlotGraphics.drawCircle(x, y, 1)
            ScatterPlotGraphics.endFill();
        }


        ScatterPlotGraphics.lineStyle(1, 0x000000, 1)

        ScatterPlotGraphics.lineStyle(1, options.odLineColor, options.odLineOpacity)

        for (var i = 0; i < drawData.length; i++) {
            if (i % 2 == 0) {
                ScatterPlotGraphics.lineStyle(1, options.areaScale(sourceClassId).replace('#', '0x'), options.odLineOpacity)
                let firstOD = drawData[i].od;
                for (var j = 0; j < firstOD.length; j++) {
                    let source = axisXSacle(firstOD[j][0]),
                        target = axisXSacle(firstOD[j][1]);
                    let diffLength = target - source;
                    let controlPointY = controlPointYScale(diffLength);
                    ScatterPlotGraphics.moveTo(source, margin.top - SEC);
                    ScatterPlotGraphics.quadraticCurveTo(((source + target) / 2), controlPointY, target, margin.top - SEC);
                }
            } else if (i % 2 != 0) {
                ScatterPlotGraphics.lineStyle(1, options.areaScale(targetClassId).replace('#', '0x'), options.odLineOpacity)
                let secondOD = drawData[i].od;
                for (var j = 0; j < secondOD.length; j++) {
                    let source = axisXSacleBottom(secondOD[j][0]),
                        target = axisXSacleBottom(secondOD[j][1]);
                    let diffLength = source - target;
                    let controlPointY = controlPointYScaleBottom(diffLength);
                    ScatterPlotGraphics.moveTo(source, margin.top + SEC);
                    ScatterPlotGraphics.quadraticCurveTo(((source + target) / 2), controlPointY, target, margin.top + SEC);
                }
            }
        }
        ScatterPlotGraphics.x = 0;
        ScatterPlotGraphics.y = 0;
        renderer.render(stage);
    }


    function getOdInData() {
        return new Promise(function (resolve, reject) {
            d3.json(options.rootPath + 'odIn.json', (error, data) => {
                resolve(data);
            })
        })
    }

    function addLineInClassOnSvg(classId) {
        //把坐标差映射成高度
        //坐标差最小为0，最大是轴的长度
        svg.selectAll(".lineG").remove();
        var controlPointYScale = d3.scaleLinear()
            .domain([0, width - margin.left - margin.right])
            .range([margin.top - 15, -margin.top])
        var lineG = svg.append("g")
            .attr("class", "lineG")
        d3.json(options.rootPath + 'odIn.json', (error, data) => {
            for (var j = 0; j < data[classId].od.length; j++) {
                let source = axisXSacle(data[classId].od[j][0]),
                    target = axisXSacle(data[classId].od[j][1]);
                //此时的source,target代表轴上的坐标,坐标原点是左上角（0,0）
                let diffLength = target - source;
                let controlPointY = controlPointYScale(diffLength);
                let path = d3.path();
                path.moveTo(source, margin.top);
                path.quadraticCurveTo(((source + target) / 2), controlPointY, target, margin.top);
                lineG.append("path")
                    .attr("d", path)
                    .attr("stroke", "black")
                    .attr("fill", "none")
            }
        })
    }
    return {
        addLineInterClass: addLineInterClassOnCanvas,
        addLineInClass: addLineInClassOnCanvas,
        getOdInData: getOdInData
    }
}())