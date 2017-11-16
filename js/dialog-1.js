(function(win) {
	"use strict";

	if (!win.jQuery) {
		throw new Error("jQuery must be included before Dialog.");
	}

	var $ = win.jQuery, _ = {};

	win.Dialog = _;

	var template = ['<div class="dialog">',
						'<div class="dialog_wrapper">',
							'<h3 class="dialog_title"></h3>',
							'<div class="dialog_content"></div>',
							'<div class="dialog_btns">',
								// '<button class="dialog_btn dialog_btn_0">确定</button>',
								// '<button class="dialog_btn dialog_btn_1">取消</button>',
							'</div>',
							'<a href="javascript: void(0);" class="dialog_close dialog_close_default"></a>',
						'</div>',
					'</div>'].join(""),
		defaultConfigs = {
			title: "提示",
			// content: "content",
			// btns: [{
			// 	className: "dialog_btn_0",
			// 	content: "确定"
			// }],
			draggable: true
		},
		btnTemplate = '<button class="dialog_btn"></button>',
		wrapperClassName = ".dialog_wrapper",
		titleClassName = ".dialog_title",
		contentClassName = ".dialog_content",
		btnsClassName = ".dialog_btns",
		btnClassName = ".dialog_btn",
		closeBtnClassName = ".dialog_close",
		maxHeight = $(win).height()/2;

	// 修改全局配置
	_.config = function(options) {
		$.extend(defaultConfigs, options);
	};

	// 移除对话框
	_.close = function($dialog) {
		$dialog.removeClass("show");
		setTimeout(function() {
			$dialog.off().find(btnClassName).off();
			$dialog.remove();
		}, 500);
	};

	// 添加内容
	var addComponents = function($elem, text) {
		if (text) {
			$elem.html(text);
		} else {
			$elem.remove();
		}
	};

	// 添加按钮
	var addBtns = function($dialog, btns) {
		var $elem = $dialog.find(btnsClassName);

		if (!btns || btns.length === 0) {
			$elem.remove();
			return;
		}

		$.each(btns, function(index, value) {
			var $newBtn = $(btnTemplate);
			var fun = value.fun;

			$newBtn.addClass(value.className).html(value.content);
			$elem.append($newBtn);

			if (fun && typeof fun == "function") {
				$newBtn.on("click", function() {
					fun();
					value.close && _.close($dialog);
				});
			} else if (value.close) {
				$newBtn.on("click", function() {
					_.close($dialog);
				});
			}
		});
	};

	var move = function($dialog) {
		var $wrapper = $dialog.find(wrapperClassName);

		// $wrapper.
	};

	_.open = function(options) {
		var configs = $.extend({}, defaultConfigs, options),
			$dialog = $(template),
			$wrapper = $dialog.find(wrapperClassName),
			$title = $dialog.find(titleClassName),
			$content = $dialog.find(contentClassName),
			$btns = $dialog.find(btnsClassName),
			close = function() {
				_.close($dialog);
			};
		
		// 填充内容
		addComponents($title, configs.title);
		addComponents($content, configs.content);
		addBtns($dialog, configs.btns);

		if (configs.noCloseBtn) {
			$dialog.find(closeBtnClassName).remove();
		}

		$dialog.addClass(configs.noShadow ? "noShadow" : "");
		$wrapper.addClass(configs.draggable ? "drag" : "").addClass(configs.className);

		// 显示到页面
		$("body").append($dialog);
		setTimeout(function() {
			$dialog.addClass("show");
		}, 10);

		// 高度限定
		if (configs.height) {
			$content.outerHeight(configs.height - $title.outerHeight() - $btns.outerHeight() - $wrapper.outerHeight() + $wrapper.height());
		} else {
			$content.css({
				"max-height": maxHeight + "px"
			});
		}

		// 宽度限定
		if (configs.width) {
			$wrapper.outerWidth(configs.width);
		}

		// 定位
		if (configs.left) {
			$wrapper.css({
				left: configs.left
			});
		} else {
			$wrapper.css({
				left: ($(win).width() - $wrapper.outerWidth())/2
			});
		}

		if (configs.top) {
			$wrapper.css({
				top: configs.top
			});
		} else {
			$wrapper.css({
				top: ($(win).height() - $wrapper.outerHeight())/2
			});
		}

		// 绑定事件
		$dialog.on("click", closeBtnClassName, close);

		// 是否自动关闭
		if (configs.autoClose) {
			setTimeout(close, configs.time || 2000);
		}

		// 返回可操作方式
		return {
			close: close
		};
	};

	_.alert = function(content, callback) {
		var configs = {
			btns: [{
				content: "确定",
				className: "dialog_btn_0",
				close: true,
				fun: callback
			}],
			content: content
		};

		_.open(configs);
	};

	_.confirm = function(content, callback1, callback2) {
		var configs = {
			btns: [{
				content: "确定",
				className: "dialog_btn_0",
				close: true,
				fun: callback1
			},{
				content: "取消",
				className: "dialog_btn_1",
				close: true,
				fun: callback2
			}],
			content: content
		};

		_.open(configs);
	};
})(window);