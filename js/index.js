require.config({
    baseUrl: "js/modul",
    paths: {
        activeModal: "activeModal",
        fullscreen: "fullscreen",
        modal: "modal",
        countdown: "countdown",
        tableClick: "tableClick",
        tapTime: "tapTime"
    }
});
requirejs(["fullscreen", "modal", "countdown"], function(screen, modal, count) {
    //验证的模态框
    new modal.modal({
        //按钮的dom节点
        dom: ".verificationCanClick",
        //dom节点的子元素
        domChild: "#verification span",
        //动态改变的CLASS
        className: "headerRightClick",
        //模态框的ID名称
        modalName: "#verificationModal",
        //模态框的动作show表示显示
        options: "show"
    });
    //长锁清单调用模态框
    new modal.modal({
        dom: ".lockListCanClick",
        domChild: "#lockList span",
        className: "headerRightClick",
        modalName: "#lockListModal",
        options: "show"
    });
    new modal.modal({
        dom: "#headerLock",
        domChild: "#headerLock span",
        className: "headerRightClick",
        modalName: "#headerLockModal",
        options: "show"
    });
    new modal.modal({
        dom: "#headerUnlock",
        domChild: "#headerUnlock span",
        className: "headerRightClick",
        modalName: "#headerUnlockModal",
        options: "show"
    });
    //倒计时
    new count.countdown();
    //全屏按钮的动作
    new screen.ChanegScreen();
});
requirejs(["tapTime"], function(tapTime) {
    $(".tap span").on("click", function() {
        $(this).toggleClass("tapClick");
        $(this).siblings().removeClass("tapClick");
    });
    new tapTime.tapTime();
});
require(["zoom"], function(zoom) {
    //放大缩小的动作
    new zoom.zoom();
});
require(["tableClick"], function(tableClick) {
    new tableClick.tableClick();
});
// var value = 1;
// var position = 10;

// function getcss(dom, cssName) {
//     return parseInt($(dom).css(cssName));
// }
// var groundNumberHeight = getcss(".groundNumberDiv", "height");
// var groundNumberPadding = getcss(".groundNumberDiv", "padding-left");
// var tableBodyHeight = getcss(".tableBody", "height");
// var nbTableBoxMarginLeft = getcss(".nbTableBox", "margin-left");
// var tableMainMarginLeft = getcss(".tableMain", "margin-left");
// var tableMainMarginTop = getcss(".tableMain", "margin-top");
// $("#range").change(function() {
//     var value = ($("#range")[0].value) / 50;
//     $(".groundNumber,.vertical,.nbTable,.thead").css("-webkit-transform", "scale(" + value + ")");
//     $(".groundNumberDiv").css("height", groundNumberHeight * value + "px");
//     $(".groundNumberDiv").css("padding-left", groundNumberPadding * value + "px");
//     $(".nbTableBox").css({
//         "margin-left": nbTableBoxMarginLeft * value + "px",
//         "height": tableBodyHeight * value + "px"
//     });
//     $(".tableMain").css({
//         "margin-left": tableMainMarginLeft * value + "px",
//         "margin-top": tableMainMarginTop * value + "px"
//     });
// });
// $(".nbTableBox").on("wheel mousewheel", function(e) {
//     if (event.wheelDelta < 0) {
//         position = position + 20;
//     } else {
//         position = position - 20;
//     }
//     $(".nbTableBox").scrollLeft(position);
//     $(".groundNumberDiv").scrollLeft(position);
// });
// $(".nbTableBox").scroll(function() {
//     $(".groundNumberDiv").scrollLeft($(".nbTableBox").scrollLeft());
// });
// $(".tableBody")[0].onmousewheel = function(e) {
//     e.preventDefault();
// };
// $(document).ready(function () {
//     $(".nbTable div span").webuiPopover({
//         trigger: "hover",
//         content: "<input><button>确认</button>",
//         delay: {
//             hide: 500
//         }
//     });
// });