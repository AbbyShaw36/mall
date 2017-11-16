(function(factory) {
	factory(window, jQuery);
})(function(window, $) {
	"use strict";

	var defaultOptions = {
		title: "提示",
	};

	/**
	* 创建弹窗对象
	* @param {object} options 
	*/
	function Dialog(options) {
		$.extend(this, defaultOptions, options);
		this.init();
	}

	// 弹窗模板
	var template = ['<div class="dialog">',
						'<div class="dialog_wrapper">',
							'<h3 class="dialog_title"></h3>',
							'<div class="dialog_content"></div>',
							'<a href="javascript: void(0);" class="dialog_close dialog_close_default"></a>',
						'</div>',
					'</div>'].join("");

	function createDialog() {
		var $dialog = $(template);
		$("body").append($dialog);
		return $dialog;
	}

	/**
	* 初始化
	*/
	Dialog.prototype.init = function() {
		this.$dialog = createDialog();
		this.open();
		this._setting();
		this._addEvent();
	};

	/**
	 * 基本设置
	 */
	Dialog.prototype._setting = function() {
		var _ = this,
			$dialog = this.$dialog,
			settings = {
				addTitle: function() {
					var title = _.title,
						$title = $dialog.find(".dialog_title");

					title ? $title.html(title) : $title.remove();
				},
				addContent: function() {
					var content = _.content,
						$content = $dialog.find(".dialog_content");

					$content.html(content);
				},
				noCloseBtn: function () {
					if (_.noCloseBtn) {
						$dialog.find(".dialog_close").remove();
					}
				},
				noShadow: function () {
					$dialog.addClass(_.noShadow ? "noShadow" : "");
				},
				draggable: function() {
					$dialog.addClass(_.draggable ? "drag" : "");
				},
				style: function() {
					var height = _.height,
						width = _.width,
						left = _.left,
						top = _.top,
						right = _.right,
						bottom = _.bottom,
						center = _.center,
						middle = _.middle,
						$title = $dialog.find(".dialog_title"),
						$wrapper = $dialog.find(".dialog_wrapper"),
						$content = $dialog.find(".dialog_content");

					if (height) {
						$wrapper.outerHeight(height);
					}

					if (width) {
						$wrapper.outerWidth(width);
					}

					if (left) {
						$wrapper.css({
							left: left
						});
					}

					if (top) {
						$wrapper.css({
							top: top
						});
					}

					if (right) {
						$wrapper.css({
							right: right
						});
					}

					if (bottom) {
						$wrapper.css({
							bottom: bottom
						});
					}

					if (center) {
						if (width) {
							$wrapper.css({
								"left": 0,
								"right": 0,
								"margin-left": "auto",
								"margin-right": "auto"
							});
						} else {
							$wrapper.css({
								"left": ($(window).width() - $wrapper.outerWidth())/2,
								"right": "auto"
							});
						}
					}

					if (middle) {
						if (height) {
							$wrapper.css({
								"top": 0,
								"bottom": 0,
								"margin-top": "auto",
								"margin-bottom": "auto"
							});
						} else {
							$wrapper.css({
								"top": ($(window).height() - $wrapper.outerHeight())/2,
								"bottom": "auto"
							})
						}
					}

					$content.height($wrapper.height() - ($title.length > 0 ? $title.outerHeight() : 0));
				}
			};

		$.each(settings, function(index, value) {
			value();
		});
	};

	/**
	 * 关闭弹窗
	 */
	Dialog.prototype.close = function() {
		if (!this.opened) {
			return;
		}

		var $dialog = this.$dialog;

		$dialog.removeClass("show");

		this.opened = false;
	};

	/**
	 * 打开弹窗
	 */
	Dialog.prototype.open = function() {
		if (this.opened) {
			return;
		}

		var $dialog = this.$dialog;

		setTimeout(function() {
			$dialog.addClass("show");
		}, 10);

		this.opened = true;
	};

	Dialog.prototype.destory = function() {
		var _ = this;

		if (this.opened) {
			this.close();
		}

		setTimeout(function() {
			_.$dialog.off().remove();
		}, 500);
	}

	/**
	 * 绑定事件
	 */
	Dialog.prototype._addEvent = function() {
		var _ = this;

		// 关闭按钮
		_.$dialog.on("click", ".dialog_close", function() {
			_.close();
		});

		// 是否自动关闭
		if (_.autoClose) {
			setTimeout(function() {
				_.close();
			}, _.time || 2000);
		}
	};

	Dialog.alert = function(text) {
		return new Dialog({
			content: text,
			center: true,
			middle: true
		});
	}

	Dialog.confirm = function(text, callback) {
		var newDialog = new Dialog({
				title: "",
				content: text,
				center: true,
				middle: true
			}),
			btns = ['<div class="dialog_btns">',
						'<button type="button" class="dialog_btn dialog_btn_0 dialog_btn_confirm">确认</button>',
						'<button type="button" class="dialog_btn dialog_btn_1 dialog_btn_cancel">取消</button>',
					'</div>'].join(""),
			$dialog = newDialog.$dialog;

			console.log(btns);
		$dialog.find(".dialog_wrapper").append($(btns));
		$dialog.on("click", ".dialog_btn_confirm", function() {
			callback(newDialog);
		});
		$dialog.on("click", ".dialog_btn_cancel", function() {
			newDialog.destory();
		});

		return newDialog;
	}

	Dialog.msg = function(text) {
		new Dialog({
			title: "",
			content: text,
			center: true,
			middle: true,
			autoClose: true,
			noCloseBtn: true
		});
	}

	window.Dialog = Dialog;
});