require.config({
    baseUrl: "js/modul",
    paths: {
        changeClass: "changeClass",
        activeModal: "activeModal",
        fullscreen: "fullscreen",
        modal: "modal"
    }
});
requirejs(["changeClass", "fullscreen", "modal"], function (change, screen, modal) {
    $(".headerRight div span").on("click", function () {
        change.clickAddClass(this, "headerRightClick");
    });
    $("#verification").on("click", function () {
        modal.show("#verificationModal");
    });
    $("#verificationModal").on("hidden.bs.modal", function () {
        $("#verification span").removeClass("headerRightClick");
    });
    $("#lockList").on("click", function () {
        modal.show("#lockListModal");
    });
    $("#lockListModal").on("hidden.bs.modal", function () {
        $("#lockList span").removeClass("headerRightClick");
    });
    $(document).on("click", ".full", function () {
        screen.full();
    });
    $(document).on("click", ".exit", function () {
        screen.exit();
    });
});
requirejs(["changeClass", "activeModal"], function (change, active) {
    $(".tap span").on("click", function () {
        change.clickAddClass(this, "tapClick");
        $(this).siblings().removeClass("tapClick");
    });
});
var value = 1;
var position = 10;
$("#range").change(function () {
    var value = ($("#range")[0].value) / 50;
    var height = $(".tableBody").height();
    $(".groundNumber,.vertical,.nbTable,.thead").css("-webkit-transform", "scale(" + value + ")");
    $(".groundNumberDiv").css("height", 20 * value + "px");
    $(".groundNumberDiv").css("padding-left", 40 * value + "px");
    $(".nbTableBox").css({
        "margin-left": 40 * value + "px",
        "height": height * value + "px"
    });
    $(".tableMain").css({
        "margin-left": 10 * value + "px",
        "margin-top": 10 * value + "px"
    });
});
$(".nbTableBox").on("wheel mousewheel", function (e) {
    if (event.wheelDelta < 0) {
        position = position + 20;
    } else {
        position = position - 20;
    }
    $(".nbTableBox").scrollLeft(position);
    $(".groundNumberDiv").scrollLeft(position);
});
$(".nbTableBox").scroll(function () {
    $(".groundNumberDiv").scrollLeft($(".nbTableBox").scrollLeft());
});
$(".tableBody")[0].onmousewheel = function (e) {
    e.preventDefault();
};
$(document).ready(function () {
    $(".divTable div span").webuiPopover({
        trigger: "hover",
        content: "<input><button>确认</button>",
        delay: {
            hide: 500
        }
    });
});
