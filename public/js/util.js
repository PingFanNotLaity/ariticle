(function(window,undefined) {
    let util = {
        date_format:function(date,format="YYYY-MM-DD HH:mm:ss") {
            return moment(date).format(format)
        }
    }
    window.util = util;
})(window)