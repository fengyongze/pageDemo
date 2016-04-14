define(["tableClick"], function(tableClick) {
	function modal(opts) {
		if (opts) {
			this.opts = opts;
		}
		//点击调用模态框
		$(document).on("click", this.opts.dom, $.proxy(this.show, this));
		//模态框隐藏是执行的函数
		$(document).on("hidden.bs.modal", this.opts.modalName, $.proxy(this.hidden, this));
	}
	modal.prototype.show = function() {
		if (this.opts.domChild) {
			$(this.opts.domChild).toggleClass(this.opts.className);
		}
		$(this.opts.modalName).modal(this.opts.options);
		lock();
	};
	modal.prototype.hidden = function() {
		if (this.opts.domChild) {
			$(this.opts.domChild).removeClass(this.opts.className);
		}
	};

	function lock() {
		var order = tableClick.tableClick.init.order;
		var html = template("lockAndUnlockTemplate", order);
		if ($("#headerLockModal .groundList")) {
			$("#headerLockModal .groundList").html(html);
		}
		if ($("#headerUnlockModal .groundList")) {
			$("#headerUnlockModal .groundList").html(html);
		}
	}
	return {
		modal: modal,
		lock: lock
	};
});