define(function() {
	function countdown(opts) {
		this.opts = $.extend({}, countdown.DEFAULT, opts);
		this.number = this.opts.secs;
		var t = setInterval($.proxy(this.count, this), 1000);
	}
	countdown.prototype.count = function() {
		this.number--;
		$(this.opts.dom).html(this.number + "s");
		if (this.opts.infinite) {
			if (this.number === 0) {
				this.number = this.opts.secs;
				this.opts.fun();
			}
		}
	};
	countdown.DEFAULT = {
		//改变html的节点
		dom: "#time",
		//是否无限重复
		infinite: true,
		//多少毫秒改变一次
		speed: 1000,
		//时间为多少秒
		secs: 60,
		//倒计时完时执行的函数
		fun: function() {
			console.log("正在使用倒计时插件");
		}
	};
	return {
		countdown: countdown
	};
});