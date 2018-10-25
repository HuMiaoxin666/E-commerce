(function () {
    /*
        d3.json("data/test_data.json", function (data) {
            var temp_data = [
                {
                    name: '凯文米特尼克',
                    birth: '1963年8月6日',
                    home: '美国洛杉矶',
                    job: '网络安全咨询师'
                },
                {
                    name: '沃兹尼亚克',
                    birth: '1950年8月11日',
                    home: '美国加利福利亚',
                    job: '电脑工程师'
                }
            ];

            console.log('data: ', data);
            var tpl = document.getElementById('myTemplate').innerHTML
            // Handlebars编译模板，返回一个可执行函数

            var template = Handlebars.compile(tpl)
            // 传入数据，得到编译后的html

            var html = template(temp_data)
            // 将编译完成的html显示到网页

            document.getElementById('test').innerHTML = html
        })
    */
    document.getElementById("yes").style.display = "none";
    $("#selectAll").on("click", function () {
        if (variable.selectAll == false) {
            variable.selectAll = true;
            for (let i = 0; i < 17; i++) {
                $("#inlineCheckbox" + i).prop({checked:true});
            }
        } else {
            variable.selectAll = false;
            for (let i = 0; i < 17; i++) {
                $("#inlineCheckbox" + i).prop({checked:false});
            }
        }

    })

    $("#submit").on("click", function () {
        $.confirm({
            title: '确认提交?',
            type: 'blue',
            buttons: {
                ok: {
                    text: "确认",
                    btnClass: 'btn-primary',
                    keys: ['enter'],
                    action: function () {
                        document.getElementById("yes").style.display = "block";
                        document.getElementById("no").style.display = "none";
                        console.log('the user clicked confirm');
                    }
                },
                cancel: {
                    text: "取消"
                }
            }
        });
    })
})()