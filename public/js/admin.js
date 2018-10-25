(function () {
    d3.csv("2.csv", function (data) {
        console.log('data: ', data);


     

        var selectAll = false;
        document.getElementById("yes").style.display = "none";
        $("#selectAll").on("click", function () {
            if (selectAll == false) {
                selectAll = true;
                for (var i = 1; i <= data.length; i++) {
                    $("#inlineCheckbox_" + i).prop({
                        checked: true
                    });
                }
                // data.forEach(elment =>{
                //     console.log('$("#inlineCheckbox_" + elment.name): ', $("#inlineCheckbox_" + elment.name));


                // })
            } else {
                selectAll = false;
                for (var i = 1; i <= data.length; i++) {
                    $("#inlineCheckbox_" + i).prop({
                        checked: false
                    });
                }
                // data.forEach(elment =>{
                //     $("#inlineCheckbox_" + elment['序号']).prop({
                //         checked: false
                //     });
                // })
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




    })
})()