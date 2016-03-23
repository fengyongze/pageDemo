define(["changeClass"], function (change) {
    function clcik() {
        change.clickAddClass(".screen", "full exit");
        change.clickAddClass(".pre1", "pre1Color pre1Change");
        change.clickAddClass(".pre2", "pre2Color pre2Change");
        change.clickAddClass(".pre3", "pre3Color pre3Change");
        change.clickAddClass(".pre4", "pre4Color pre4Change");
    }
    return {
        full: function () {
            document.documentElement.webkitRequestFullScreen();
            clcik();
        },
        exit: function () {
            document.webkitCancelFullScreen();
            clcik();
        }
    };
});
