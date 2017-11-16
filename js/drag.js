(function(win) {
	"use strict";

	if (!win.jQuery) {
		throw new Error("jQuery must be included before drag.");
	}

	var $ = win.jQuery;

	$("body").on("mousedown", ".drag", function(event) {
		if (!$(event.target).hasClass("drag")) {
			return;
		}

		var ox = event.offsetX,
			oy = event.offsetY,
			$drag = $(this);

		$(this).on("selectstart", function() {
			return false;
		});

		$(document).on("mousemove", function(event) {
			var w = $(window).width() - $(".drag").outerWidth(),
				h = $(window).height() - $(".drag").outerHeight(),
				l = event.clientX - ox,
				t = event.clientY - oy;

			if (l < 0) {
				l = 0;
			} else if (l > w) {
				l = w;
			}

			if (t < 0) {
				t = 0;
			} else if (t > h) {
				t = h;
			}

			$(".drag").css({
				zIndex: 0
			});

			$drag.css({
				top: t,
				left: l,
				zIndex: 1,
			});
		});

		$(document).on("mouseup", function() {
			$(this).off("mousemove");
			$(".drag").off("selectstart");
		});
	});
})(window);