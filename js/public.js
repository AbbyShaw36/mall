(function() {
	$(function() {
		dropdown();
	});

	function dropdown() {
		$(document).on("click", ".dropdown", function() {
			$(this).addClass("open");
			$(".shadow").show();
		});

		$(document).on("click", ".shadow", function() {
			$(".dropdown").removeClass("open");
			$(this).hide();
		})
	}
})();