(function(window,undefined) {
    function startNProgress() {
        NProgress.configure({
            minimum: 0.1,
            showSpinner:false
        });
        NProgress.set(0.4)
        let interval = setInterval(function() {
        NProgress.inc(); // 以小量递增
        },200)
        $(window).on('load',()=>{
        clearInterval(interval)
        NProgress.done();
        });
    };
    startNProgress();

    let util = {
        date_format:function(date,format="YYYY-MM-DD HH:mm:ss") {
            return moment(date).format(format)
        }
    }
    window.util = util;
})(window)