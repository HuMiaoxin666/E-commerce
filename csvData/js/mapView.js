var mapView = (function () {
    
    getSuspendingData().then(function (suspedingData) {
        console.log('suspedingData: ', suspedingData);

    });
    function getSuspendingData() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "/po_infor",
                success: function (data) {
                    resolve(data);
                },
                error: function () {

                }
            });
        });
    }



   
})()