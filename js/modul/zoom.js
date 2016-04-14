define(function() {
	function zoom() {
		this.opts = $.extend({}, zoom.DEFAULT);
		//当滑块滑动时需要做的动作
		$(this.opts.range).on("change", $.proxy(this.range, this));
		//当表格横向滑动时带动上面的表格头横向滑动
		$(this.opts.tableBox).on("scroll", $.proxy(this.scroll, this));
	}
	zoom.prototype.range = function() {
		var value = $(this.opts.range)[0].value / 50,
			tableMain = this.opts.tableMain,
			table = this.opts.table,
			tableBox = this.opts.tableBox,
			tableBody = this.opts.tableBody,
			th = this.opts.th,
			thead = this.opts.thead,
			theadDiv = this.opts.theadDiv,
			header = this.opts.header,
			getcss = zoom.getcss;
		$(table + "," + th + "," + thead + "," + header).css("-webkit-transform", "scale(" + value + ")");
		//zoom时各个div的互相调整
		$(theadDiv).css({
			"height": getcss.theadDivHeight * value + "px",
			"padding-left": getcss.theadDivPaddingLeft * value + "px"
		});
		$(tableBox).css({
			"margin-left": getcss.tableBoxMarginLeft * value + "px",
			"height": getcss.tableBoxHeight * value + 17 + "px"
		});
		$(tableMain).css({
			// "margin-left": getcss.tableMainMarginLeft * value + "px",
			"margin-top": getcss.tableMainMarginTop * value + "px"
		});
	};
	zoom.prototype.scroll = function() {
		$(this.opts.theadDiv).scrollLeft($(this.opts.tableBox).scrollLeft());
	};
	zoom.DEFAULT = {
		//包含着所有的表格的div
		tableMain: ".tableMain",
		//包含着纵轴和表格的div
		tableBody: ".tableBody",
		//包含着表格的div
		tableBox: ".nbTableBox",
		//表格div
		table: ".nbTable",
		//表格行
		th: ".vertical",
		//表头
		thead: ".groundNumber",
		//表头div
		theadDiv: ".groundNumberDiv",
		//时间/场号
		header: ".thead",
		//滑块
		range: "#range"
	};
	//获得dom的css属性
	zoom.getcss = {
		theadDivHeight: parseInt($(zoom.DEFAULT.theadDiv).css("height")),
		theadDivPaddingLeft: parseInt($(zoom.DEFAULT.theadDiv).css("padding-left")),
		tableBoxMarginLeft: parseInt($(zoom.DEFAULT.tableBox).css("margin-left")),
		tableBoxHeight: parseInt($(zoom.DEFAULT.tableBox).css("height")),
		tableBodyHeight: parseInt($(zoom.DEFAULT.tableBody).css("height")),
		tableMainMarginLeft: parseInt($(zoom.DEFAULT.tableMain).css("margin-left")),
		tableMainMarginTop: parseInt($(zoom.DEFAULT.tableMain).css("margin-top"))
	};
	return {
		zoom: zoom
	};
});