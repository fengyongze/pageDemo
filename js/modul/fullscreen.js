define(function() {
    function ChanegScreen() {
        var This = this;
        $(document).on("click", ".full", $.proxy(this.full, this));
        $(document).on("click", ".exit", $.proxy(this.exit, this));
        $(document).on("webkitfullscreenchange", function() {
            This.ChangeClass();
        });
    }
    ChanegScreen.prototype.full = function() {
        //全屏
        document.documentElement.webkitRequestFullScreen();
    };
    ChanegScreen.prototype.exit = function() {
        //退出全屏
        document.webkitCancelFullScreen();
    };
    ChanegScreen.prototype.ChangeClass = function() {
        //更改全屏按钮时改变的class
        $(".screen").toggleClass("full exit");
        $(".screen span").toggleClass("headerRightClick");
        $(".pre1").toggleClass("pre1Color pre1Change");
        $(".pre2").toggleClass("pre2Color pre2Change");
        $(".pre3").toggleClass("pre3Color pre3Change");
        $(".pre4").toggleClass("pre4Color pre4Change");
    };
    return {
        ChanegScreen: ChanegScreen
    };
});