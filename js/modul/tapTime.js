define(function() {
    function Time() {
        this.opts = Time.init;
        for (var i = 0; i < 9; i++) {
            $(this.opts.dom).eq(i).html(this.getTime(i - 2).month + "-" + this.getTime(i - 2).day);
        }
        $(this.opts.dom).eq(2).html("今天");
    }
    Time.prototype.getTime = function(i) {
        var now = new Date();
        var date = new Date(now.getTime() + i * 24 * 3600 * 1000);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return {
            month: month,
            day: day
        };
    };
    Time.init = {
        dom: ".tap span"
    };
    return {
        tapTime: Time
    };
});